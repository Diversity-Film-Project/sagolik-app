// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import nextConfig from "eslint-config-next"
import nextTs from "eslint-config-next/typescript"

const config = [...nextConfig, ...nextTs, {
  rules: {
    "no-console": "warn",
    "prefer-const": "error",
  },
}, ...storybook.configs["flat/recommended"]]

export default config