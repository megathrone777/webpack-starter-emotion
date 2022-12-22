import { Configuration } from "webpack";
import EslintWebpackPlugin from "eslint-webpack-plugin";
import FileManagerPlugin from "filemanager-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

import { options } from "./options";

const production: Configuration = {
  ...options,
  devtool: false,
  mode: "production",
  optimization: {
    ...options.optimization,
    minimize: true,
  },
  plugins: [
    ...options.plugins!,
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["js/*.LICENSE.txt"],
      protectWebpackAssets: false,
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: "public/",
              destination: "build/",
            },
          ],
        },
      },
    }),
    new EslintWebpackPlugin({
      baseConfig: {
        rules: {
          "no-console": ["error", { allow: ["warn", "error"] }],
        },
      },
      exclude: "/node_modules/",
      extensions: ["tsx", "ts"],
    }),
  ],
};

export default production;
