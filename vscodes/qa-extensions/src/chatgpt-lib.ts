import * as vscode from 'vscode';
//TODO: fix error 
import { ChatGPTAPI, ChatGPTConversation } from 'chatgpt';

class ChatGPTViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'chatgpt.chatView';

	private _view?: vscode.WebviewView;

	// This variable holds a reference to the ChatGPTAPI instance
	private _chatGPTAPI?: ChatGPTAPI;
	private _conversation?: ChatGPTConversation;

	private _response?: string;
	private _prompt?: string;
	private _fullPrompt?: string;


	public selectedInsideCodeblock = false;
	public pasteOnClick = true;
	public keepConversation = true;
	public timeoutLength = 60;
	private _sessionToken?: string;

	// In the constructor, we store the URI of the extension
	constructor(private readonly _extensionUri: vscode.Uri) {
		
	}
	
	// Set the session token and create a new API instance based on this token
	public setSessionToken(sessionToken?: string) {
		this._sessionToken = sessionToken;
		this._newAPI();
	}

	public setConversationId(conversationId?: string, parentMessageId?: string) {
		if (!conversationId || !parentMessageId) {
			this._conversation = this._chatGPTAPI?.getConversation();
		} else if (conversationId && parentMessageId) {
			this._conversation = this._chatGPTAPI?.getConversation({conversationId: conversationId, parentMessageId: parentMessageId});
		}
	}

	public getConversationId() {
		return this._conversation?.conversationId;
	}
	public getParentMessageId() {
		return this._conversation?.parentMessageId;
	}

	// This private method initializes a new ChatGPTAPI instance, using the session token if it is set
	private _newAPI() {
		if (!this._sessionToken) {
			console.warn("Session token not set");
		}else{
			this._chatGPTAPI = new ChatGPTAPI({
				sessionToken: this._sessionToken
			});
			this._conversation = this._chatGPTAPI.getConversation();
		}
	}

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		// set options for the webview
		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,
			localResourceRoots: [
				this._extensionUri
			]
		};

		// set the HTML for the webview
		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		// add an event listener for messages received by the webview
		webviewView.webview.onDidReceiveMessage(data => {
			switch (data.type) {
				case 'codeSelected':
					{
						// do nothing if the pasteOnClick option is disabled
						if (!this.pasteOnClick) {
							break;
						}

						let code = data.value;
						code = code.replace(/([^\\])(\$)([^{0-9])/g, "$1\\$$$3");

						// insert the code as a snippet into the active text editor
						vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(code));
						break;
					}
				case 'prompt':
					{
						this.search(data.value);
					}
			}
		});
	}



	public async search(prompt?:string) {
		this._prompt = prompt;
		if (!prompt) {
			prompt = '';
		};

		// Check if the ChatGPTAPI instance is defined
		if (!this._chatGPTAPI) {
			this._newAPI();
		}

		// focus gpt activity from activity bar
		if (!this._view) {
			await vscode.commands.executeCommand('chatgpt.chatView.focus');
		} else {
			this._view?.show?.(true);
		}
		
		let response = '';

		// Get the selected text of the active editor
		const selection = vscode.window.activeTextEditor?.selection;
		const selectedText = vscode.window.activeTextEditor?.document.getText(selection);
		let searchPrompt = '';

		if (selection && selectedText) {
			// If there is a selection, add the prompt and the selected text to the search prompt
			if (this.selectedInsideCodeblock) {
				searchPrompt = `${prompt}\n\`\`\`\n${selectedText}\n\`\`\``;
			} else {
				searchPrompt = `${prompt}\n${selectedText}\n`;
			}
		} else {
			// Otherwise, just use the prompt if user typed it
			searchPrompt = prompt;
		}

		this._fullPrompt = searchPrompt;


		if (!this._chatGPTAPI || !this._conversation) {
			response = '[ERROR] Please enter an API key in the extension settings';
		} else {
			// If successfully signed in
			console.log("sendMessage");
			
			// Make sure the prompt is shown
			this._view?.webview.postMessage({ type: 'setPrompt', value: this._prompt });

			if (this._view) {
				this._view.webview.postMessage({ type: 'addResponse', value: '...' });
			}

			let agent;
			if (this.keepConversation) {
				agent = this._conversation;
			} else {
				agent = this._chatGPTAPI;
			}

			try {
				// Send the search prompt to the ChatGPTAPI instance and store the response
				response = await agent.sendMessage(searchPrompt, {
					onProgress: (partialResponse) => {
						if (this._view && this._view.visible) {
							this._view.webview.postMessage({ type: 'addResponse', value: partialResponse });
						}
					},
					timeoutMs: this.timeoutLength * 1000
				});
			} catch (e) {
				console.error(e);
				response = `[ERROR] ${e}`;
			}
		}

		// Saves the response
		this._response = response;

		// Show the view and send a message to the webview with the response
		if (this._view) {
			this._view.show?.(true);
			this._view.webview.postMessage({ type: 'addResponse', value: response });
		}
	}

	private _getHtmlForWebview(webview: vscode.Webview) {

		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));
		const microlightUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'scripts', 'microlight.min.js'));
		const tailwindUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'scripts', 'showdown.min.js'));
		const showdownUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'scripts', 'tailwind.min.js'));

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<script src="${tailwindUri}"></script>
				<script src="${showdownUri}"></script>
				<script src="${microlightUri}"></script>
				<style>
				.code {
					white-space : pre;
				</style>
			</head>
			<body>
				<input class="h-10 w-full text-white bg-stone-700 p-4 text-sm" type="text" id="prompt-input" />

				<div id="response" class="pt-6 text-sm">
				</div>

				<script src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}


export default ChatGPTViewProvider