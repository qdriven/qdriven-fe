
PROJECT=$1

mkdir -p ${PROJECT}
cd ${PROJECT}
npm init -y
pnpm i @remix-run/node @remix-run/react @remix-run/serve isbot react react-dom
pnpm i -D @remix-run/dev
mkdir app
touch app/root.jsx
