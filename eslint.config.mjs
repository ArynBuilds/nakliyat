import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Turkish copy uses apostrophes ("2000'den", "İstanbul'un") liberally.
      // The unescaped-entities rule is overzealous for non-English content;
      // React renders apostrophes correctly, so the warning is noise.
      "react/no-unescaped-entities": "off",
    },
  },
];

export default config;
