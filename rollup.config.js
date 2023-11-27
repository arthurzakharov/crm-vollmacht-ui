import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-import-css";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import image from "@rollup/plugin-image";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      image(),
      typescript(),
      peerDepsExternal(),
      resolve({
        extensions: [".png", ".css", ".ts", ".tsx"],
      }),
      commonjs(),
      // terser(),
      css({
        include: ["./src/**/*.css"],
        output: "styles.css",
        minify: true,
        alwaysOutput: true,
      }),
    ],
  },
  {
    input: "dist/cjs/types/src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
];
