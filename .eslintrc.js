//  I prefer using a JavaScript file for the .eslintrc file (instead of a JSON file) as it supports comments that can be used to better describe rules.

module.exports = {
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            // Doc of this config https://github.com/babel/babel-eslint/releases/tag/v9.0.0
            legacyDecorators: true,
        },
    },
    // Because need to use 'legacyDecorators', we have to choose 'babel-eslint' as parser.
    // https://github.com/babel/babel-eslint/releases/tag/v9.0.0
    parser: 'babel-eslint',
    env: {
        es2020: true,
        browser: true,
        node: true,
        jest: true,
    },
    extends: [
        'eslint:recommended', // Use the recommended config for JavaScript.
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    rules: {
        'no-misleading-character-class': 'off',
        'no-unused-vars': 'off',
    },
    overrides: [
        {
            files: ['**/*.tsx'],
            parser: '@typescript-eslint/parser', // Specifies the ESLint parser
            extends: [
                'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin.
                'plugin:prettier/recommended', // // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
            ],
            parserOptions: {
                ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features.
                sourceType: 'module', // Allows for the use of imports.
                ecmaFeatures: {
                    modules: true,
                },
                project: './tsconfig.json',
            },
            plugins: ['@typescript-eslint'],
            rules: {
                // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs.
                // e.g. "@typescript-eslint/explicit-function-return-type": "off",
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/interface-name-prefix': 'off',
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
            },
        },
    ],
};
