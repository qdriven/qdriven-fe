module.exports = {
    root: true,
    extends: [
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "project": "./tsconfig.json"
    },
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        "@typescript-eslint/consistent-type-imports": [
            "error",
            {
                "prefer": "type-imports",
                "fixStyle": "inline-type-imports"
            }
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                "argsIgnorePattern": "^_"
            }
        ]
    },
    ignorePatterns: [
        "*.config.js"
    ]
};
