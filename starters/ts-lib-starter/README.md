# README

Typescript lib template based on:

- vite
- vitetest

## commands

- [x] npm commands

```shell
    npm run format
    npm run lint
    npm run test:coverage
    npm run build
```

- [x] pnpm commands

```shell
pnpm install
pnpm run format
pnpm run test
pnpm run test:coverage
pnpm run build

```

## update dependencies

```shell
ncu -u
```

## Changeset

```sh
npx changelogen@latest --bump
npx changelogen@latest --release
```

## changelog

```sh
npm install -g conventional-changelog-cli
conventional-changelog -p angular -i CHANGELOG.md -s
```
