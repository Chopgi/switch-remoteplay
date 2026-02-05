module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint',],
    env: {
        node: true, browser: true, // Added for browser globals like window/document
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended',],
    settings: {
        react: {
            version: 'detect', // Automatically detects your React version (18)
        },
    },
    rules: {
        // --- Indentation & Whitespace (The WebStorm Harmony Section) ---
        'indent': ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            MemberExpression: 1,
            FunctionDeclaration: {parameters: 'first'},
            FunctionExpression: {parameters: 'first'},
            CallExpression: {arguments: 'first'},
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            ignoredNodes: ['JSXElement', 'JSXElement *'] // Let the React plugin handle JSX
        }],
        'no-tabs': 'error', // Force spaces only to prevent "Mixed spaces and tabs"
        'no-mixed-spaces-and-tabs': 'error',

        // --- Punctuation & Style ---
        'comma-dangle': ['off', 'ignore'],
        'comma-spacing': ["error", {"before": false, "after": true}],
        'quotes': ['off'],
        'semi': ['error', 'never'],
        'operator-linebreak': ['off'],

        // --- Functions ---
        'space-before-function-paren': [2, {
            named: 'never', anonymous: 'always', asyncArrow: 'always'
        }],

        // --- React & TypeScript Specifics ---
        '@typescript-eslint/no-explicit-any': 'off',
        'react/react-in-jsx-scope': 'off', // Not needed for React 17+
        'react/prop-types': 'off', // Since you are using TS interfaces for props
    },
}