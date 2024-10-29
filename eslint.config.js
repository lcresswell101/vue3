import prettier from 'eslint-plugin-prettier';
import vue from 'eslint-plugin-vue';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

export default [
    {
        languageOptions: {
            globals: {
                window: 'readonly', // Define window as a readonly global
            },
        },
        // Include your other configurations here
    },
    // ESLint recommended rules for JavaScript
    js.configs.recommended,

    // TypeScript recommended rules
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsparser, // Specify TypeScript parser
            parserOptions: {
                ecmaVersion: 12,
                sourceType: 'module',
            },
            globals: {
                _: 'readonly',
                route: 'readonly',
                browser: true,
                node: true,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint, // Add TypeScript plugin here
        },
        rules: {
            ...tseslint.configs.recommended.rules, // Use the recommended rules
            '@typescript-eslint/ban-ts-comment': 'warn', // Example of a specific TypeScript rule
        },
    },

    // Vue.js recommended rules
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser, // Use vue-eslint-parser
            parserOptions: {
                parser: tsparser, // Specify the TypeScript parser for script blocks
                ecmaVersion: 12,
                sourceType: 'module',
            },
            globals: {
                _: 'readonly',
                route: 'readonly', // Add route as a global
                axios: 'readonly', // Add axios as a global
                setTimeout: 'readonly', // Add setTimeout as a global
                clearTimeout: 'readonly', // Optionally add clearTimeout
                document: 'readonly', // Optionally add clearTimeout
                window: 'readonly', // Optionally add clearTimeout
                // Add other globals as needed
                browser: true,
                node: true,
            },
        },
        plugins: {
            vue,
        },
        rules: {
            ...vue.configs['flat/recommended'].rules,
            'vue/html-indent': 'off',
            'vue/require-default-prop': 'off',
            'vue/singleline-html-element-content-newline': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/component-name-in-template-casing': ['error', 'PascalCase'],
            'vue/max-attributes-per-line': [
                'error',
                {
                    singleline: {
                        max: 1,
                    },
                    multiline: {
                        max: 1,
                    },
                },
            ],
        },
    },

    // Prettier integration
    {
        files: ['**/*.js', '**/*.vue', '**/*.ts', '**/*.tsx'],
        plugins: {
            prettier,
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    singleAttributePerLine: true,
                },
            ],
        },
    },

    // Ignoring node_modules
    {
        ignores: ['node_modules/**'],
    },
];
