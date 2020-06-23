import resolve from "@rollup/plugin-node-resolve";
//import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/index.bs.js",
  output: [
    {
      file: "./dist/index.js",
      format: "iife",
      name: "starter",
      plugins: [
        //terser()
      ],
    },
  ],
  plugins: [resolve()],
};
