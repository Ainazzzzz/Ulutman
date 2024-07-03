import js from '@eslint/js';
import globals from 'globals';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
   {
      plugins: {
         'react-hooks': eslintReactHooks,
         react: eslintReact,
         'react-refresh': eslintReactRefresh,
         prettier: prettierPlugin,
      },
   },
   {
      ignores: ['node_modules', 'dist'],
   },
   js.configs.recommended,
   {
      languageOptions: {
         globals: {
            ...globals.node,
            ...globals.browser,
            ...globals.es2021,
         },
         parserOptions: eslintReact.configs.recommended.parserOptions,
      },
   },
   {
      files: ['**/*.{js,jsx}'],
      rules: {
         ...eslintConfigPrettier.rules,
         'prefer-const': 'warn',
         'react/jsx-no-target-blank': 'off',
         'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
         ],
         'no-var': 'error',
         'no-unused-vars': 'off',
         'no-console': ['error', { allow: ['warn', 'error'] }],
         'react/display-name': 'off',
         'react/prop-types': 'off',
         'react/react-in-jsx-scope': 'off',
         'prettier/prettier': [
            'error',
            {
               endOfLine: 'auto',
            },
         ],
      },
   },
];
