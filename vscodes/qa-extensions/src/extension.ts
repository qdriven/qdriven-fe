import * as vscode from 'vscode'
import { ChatGPTAPI, ChatGPTConversation } from 'chatgpt';
import ChatGPTViewProvider from './chatgpt-lib'

export async function activate(context:vscode.ExtensionContext) {
  //configuration from vscode
  const config = vscode.workspace.getConfiguration('chatgpt');
  const sessionToken = config.get('sessionToken') as string|undefined;
  const provider = new ChatGPTViewProvider(context.extensionUri);
  provider.setSessionToken(sessionToken);
  provider.selectedInsideCodeblock = config.get('selectedInsideCodeblock') || false;
  provider.pasteOnClick = config.get('pasteOnClick') || false;
  provider.keepConversation = config.get('keepConversation') || false;
  provider.timeoutLength = config.get('timeoutLength') || 60;

  context.subscriptions.push(
      vscode.window.registerWebviewViewProvider(ChatGPTViewProvider.viewType, provider,  {
          webviewOptions: { retainContextWhenHidden: true }
      })
  );
  
  const commandHandler = (command:string) => {
    const config = vscode.workspace.getConfiguration('chatgpt');
    const prompt = config.get(command) as string;
    provider.search(prompt);
};
const commandAsk = vscode.commands.registerCommand('chatgpt.ask', () => {
    vscode.window.showInputBox({ prompt: 'What do you want to do?' }).then((value) => {
        provider.search(value);
    });
});
const commandConversationId = vscode.commands.registerCommand('chatgpt.conversationId', () => {
    vscode.window.showInputBox({ 
        prompt: 'Set Conversation ID or delete it to reset the conversation',
        placeHolder: 'conversationId (leave empty to reset)',
        value: provider.getConversationId()
    }).then((conversationId) => {
        if (!conversationId) {
            provider.setConversationId();
        } else {
            vscode.window.showInputBox({ 
                prompt: 'Set Parent Message ID',
                placeHolder: 'messageId (leave empty to reset)',
                value: provider.getParentMessageId()
            }).then((messageId) => {
                provider.setConversationId(conversationId, messageId);
            });
        }
    });
});
const commandExplain = vscode.commands.registerCommand('chatgpt.explain', () => {	
    commandHandler('promptPrefix.explain');
});
const commandRefactor = vscode.commands.registerCommand('chatgpt.refactor', () => {
    commandHandler('promptPrefix.refactor');
});
const commandOptimize = vscode.commands.registerCommand('chatgpt.optimize', () => {
    commandHandler('promptPrefix.optimize');
});
const commandProblems = vscode.commands.registerCommand('chatgpt.findProblems', () => {
    commandHandler('promptPrefix.findProblems');
});

let commandResetConversation = vscode.commands.registerCommand('chatgpt.resetConversation', () => {
    provider.setConversationId();
});


context.subscriptions.push(commandAsk, commandConversationId, commandExplain, commandRefactor, commandOptimize, commandProblems, commandResetConversation);



// Change the extension's session token when configuration is changed
vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
    if (event.affectsConfiguration('chatgpt.sessionToken')) {
        // Get the extension's configuration
        const config = vscode.workspace.getConfiguration('chatgpt');
        const sessionToken = config.get('sessionToken') as string|undefined;
        // add the new token to the provider
        provider.setSessionToken(sessionToken);

    } else if (event.affectsConfiguration('chatgpt.selectedInsideCodeblock')) {
        const config = vscode.workspace.getConfiguration('chatgpt');
        provider.selectedInsideCodeblock = config.get('selectedInsideCodeblock') || false;

    } else if (event.affectsConfiguration('chatgpt.pasteOnClick')) {
        const config = vscode.workspace.getConfiguration('chatgpt');
        provider.pasteOnClick = config.get('pasteOnClick') || false;

    } else if (event.affectsConfiguration('chatgpt.keepConversation')) {
        const config = vscode.workspace.getConfiguration('chatgpt');
        provider.keepConversation = config.get('keepConversation') || false;

    }else if (event.affectsConfiguration('chatgpt.timeoutLength')) {
        const config = vscode.workspace.getConfiguration('chatgpt');
        provider.timeoutLength = config.get('timeoutLength') || 60;
    }
});
}

export function deactivate() {}
