import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import pluginTypescript from "@typescript-eslint/eslint-plugin";
import parserTypescript from "@typescript-eslint/parser";
import { globalIgnores } from "eslint/config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: parserTypescript,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": pluginTypescript,
    },
  },

  ...compat.config({
    plugins: ["@typescript-eslint"],
    extends: [
      "eslint:recommended",
      "next/core-web-vitals",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "off",
      semi: ["error", "always"],
      "react-hooks/exhaustive-deps": "off",
    },
  }),

  globalIgnores(["node_modules/*", ".next/", "dist/", "build/", "*.log*", ".tsbuildinfo"]),
];

export default eslintConfig;
