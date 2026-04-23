import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
//import react from "eslint-plugin-react";
//import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.jest,
        //...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
  js.configs.recommended,
  eslintConfigPrettier,
  //{
  //  files: ["**/*.{js,jsx}"],
  //  plugins: {
  //    react,
  //    "react-hooks": reactHooks,
  //  },
  //  languageOptions: {
  //    parserOptions: {
  //      ecmaFeatures: {
  //        jsx: true,
  //      },
  //    },
  //  },
  //  rules: {
  //    ...react.configs.recommended.rules,
  //    ...reactHooks.configs.recommended.rules,
  //  },
  //  settings: {
  //    react: {
  //      version: "detect",
  //    },
  //  },
  //},
])
