import nextConfig from "eslint-config-next"
import nextTs from "eslint-config-next/typescript"

const config = [
  ...nextConfig,
  ...nextTs,
  {
    rules: {
      "no-console": "warn",
      "prefer-const": "error",
    },
  },
]

export default config