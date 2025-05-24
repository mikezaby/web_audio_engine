import baseConfig from "../../eslint.config.js";

export default [
  ...baseConfig,
  {
    rules: {
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/no-unsafe-call": "off",
    },
  },
];
