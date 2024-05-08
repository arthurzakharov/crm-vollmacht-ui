import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-import-css";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import alias from "@rollup/plugin-alias";
import image from "@rollup/plugin-image";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";
import path from "node:path";

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
      del({ targets: "dist/*" }),
      alias({
        entries: [
          {
            find: "@assets",
            replacement: path.resolve(__dirname, "./src/assets"),
          },
          {
            find: "@components",
            replacement: path.resolve(__dirname, "./src/components"),
          },
          {
            find: "@hooks",
            replacement: path.resolve(__dirname, "./src/hooks"),
          },
          {
            find: "@icons",
            replacement: path.resolve(__dirname, "./src/icons"),
          },
          {
            find: "@layouts",
            replacement: path.resolve(__dirname, "./src/layouts"),
          },
          {
            find: "@stories",
            replacement: path.resolve(__dirname, "./src/stories"),
          },
          {
            find: "@utils",
            replacement: path.resolve(__dirname, "./src/utils"),
          },
          {
            find: "@types",
            replacement: path.resolve(__dirname, "./src/types.ts"),
          },
        ],
      }),
      image(),
      typescript(),
      peerDepsExternal(),
      resolve({
        extensions: [".png", ".css", ".ts", ".tsx"],
        exclude: ["src/stories/**"],
      }),
      commonjs(),
      terser(),
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
    plugins: [del({ targets: ["dist/cjs/types/src/stories"] }), dts.default()],
    external: [/\.css$/],
  },
];
