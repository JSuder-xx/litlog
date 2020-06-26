import resolve from "@rollup/plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "./src/index.bs.js",
  output: [
    {
      file: "./dist/index.js",
      format: "iife",
      name: "starter",
      plugins: [uglify()],
    },
  ],
  plugins: [resolve()],
};
