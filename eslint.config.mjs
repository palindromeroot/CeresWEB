import { FlatCompat } from "@eslint/eslintrc";
import nextPkg from '@next/eslint-plugin-next';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import PluginImport from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import reactPkg from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import { dirname } from "path";
import { fileURLToPath } from "url";

const nextPlugin = nextPkg.default || nextPkg;
const nextConfigs = nextPkg.configs;

const reactPlugin = reactPkg.default || reactPkg;
const reactConfigs = reactPkg.configs;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Глобальные игнорирования (применяются ко всем конфигурациям)
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**', 
      'out/**',
      'coverage/**',
      '**/*.d.ts',
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.ts',
    ]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
        files: ['src/**/*.{js,jsx,ts,tsx}'],

        plugins: {
            // Группируем плагины по категориям
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin,
            '@next/next': nextPlugin,
            '@typescript-eslint': typescriptEslint,
            'simple-import-sort': simpleImportSort,
            'sort-keys-fix': sortKeysFix,
            import: PluginImport,
            jsdoc: jsdoc,
            prettier: eslintPluginPrettier,
        },
        
        settings: {
            react: {
                version: 'detect', // автоматически определяет версию из package.json
            },
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2022,
            sourceType: 'module',
            parserOptions: {
                project: './tsconfig.json',
            },
        },

        rules: {
            // ===============================
            // Spread Recommended Rules
            // ===============================
            ...reactConfigs.recommended.rules,
            ...nextConfigs.recommended.rules,

            // ===============================
            // React & Next.js Custom Overrides
            // ===============================
            'react/react-in-jsx-scope': 'off', // не нужно для React 17+
            'react/jsx-uses-react': 'off', // не нужно для React 17+
            'react/jsx-key': 'error', // обязателен ключ в списках JSX
            'react/prop-types': 'off', // отключаем проверку PropTypes (чтобы не было ошибок с React.FC и т.п.)
            'react/jsx-curly-spacing': ['error', { when: 'always', children: true }],
            'react/jsx-tag-spacing': ['error', { closingSlash: 'never', beforeSelfClosing: 'always' }],
            'react/jsx-fragments': ['error', 'syntax'],

            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            '@next/next/no-img-element': 'warn',
            '@next/next/no-html-link-for-pages': 'off',

            // ===============================
            // TypeScript
            // ===============================
            'no-unused-vars': 'off', // отключаем базовое правило в пользу @typescript-eslint
            '@typescript-eslint/ban-ts-comment': 'error',
            '@typescript-eslint/default-param-last': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/explicit-function-return-type': ['warn', { allowTypedFunctionExpressions: true }],
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@typescript-eslint/no-floating-promises': ['warn', { ignoreVoid: false }],
            '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
            '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
            '@typescript-eslint/explicit-module-boundary-types': 'off',

            // ===============================
            // Импорты
            // ===============================
            'import/no-extraneous-dependencies': [
                'error',
                {
                  devDependencies: [
                    // тесты
                    '**/*.test.{ts,tsx,js,jsx}',
                    '**/*.spec.{ts,tsx,js,jsx}',
                    'test/**/*.{ts,tsx,js,jsx}',
                    '**/__tests__/**/*.{ts,tsx,js,jsx}',
                    // скрипты
                    'scripts/**/*.{ts,tsx,js,jsx}',
                    // конфиги
                    '**/*.config.{mjs,js,cjs,ts}',
                  ],
                  optionalDependencies: false,
                  peerDependencies: false,
                },
              ],
            'import/no-unresolved': 'off',
            'import/prefer-default-export': 'off',
            'import/no-cycle': ['warn', { maxDepth: 1 }],
            'simple-import-sort/imports': 'error',

            // ===============================
            // Общие правила код-стайла
            // ===============================
            'class-methods-use-this': 'warn',
            'array-callback-return': 'error',
            'brace-style': ['error', '1tbs', { allowSingleLine: true }],
            camelcase: 'warn',
            'dot-notation': 'error',
            'eol-last': ['error', 'always'],
            eqeqeq: 'error',
            indent: 'off',
            'max-depth': ['error', 5],
            'operator-linebreak': ['error', 'after'],
            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: '*',
                    next: ['const', 'let', 'var', 'block-like', 'class', 'import'],
                },
                {
                    blankLine: 'always',
                    prev: ['const', 'let', 'var', 'block-like', 'class', 'import'],
                    next: '*',
                },
                { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
                { blankLine: 'any', prev: ['import'], next: ['import'] },
                { blankLine: 'never', prev: 'case', next: ['case'] },
                { blankLine: 'always', prev: 'block-like', next: ['case'] },
                { blankLine: 'never', prev: 'break', next: ['case'] },
            ],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
            'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
            'object-curly-newline': ['error', { multiline: true, consistent: true }],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-newline': ['error', 'consistent'],
            'array-element-newline': ['error', 'consistent'],

            // ===============================
            // JSDoc
            // ===============================
            'jsdoc/require-jsdoc': [
                'warn',
                {
                    publicOnly: true,
                    enableFixer: false,
                    require: {
                        "FunctionDeclaration": true,
                        "MethodDefinition": true,
                        "ClassDeclaration": true,
                        "ArrowFunctionExpression": true,
                        "FunctionExpression": true
                    },
                },
            ],
            'jsdoc/require-description': ['warn'],

            // ===============================
            // Prettier
            // ===============================
            'prettier/prettier': 'error',
            ...prettierConfig.rules,
        },
    },
];

export default eslintConfig;
