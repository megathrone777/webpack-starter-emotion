import EslintWebpackPlugin from "eslint-webpack-plugin";
import { Configuration, WatchIgnorePlugin } from "webpack";
import { cwd } from "process";
import { resolve } from "path";
import "webpack-dev-server";

import { options } from "./options";

const publicDir: string = resolve(cwd(), "public");
const development: Configuration = {
  ...options,
  devtool: "eval-cheap-module-source-map",
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    host: "local-ip",
    open: true,
    liveReload: false,
    port: 1337,
    static: {
      directory: publicDir,
      serveIndex: true,
      watch: {
        ignored: /node_modules/,
      },
    },
  },
  mode: "development",
  optimization: {
    ...options.optimization,
    minimize: false,
  },
  plugins: [
    ...options.plugins!,
    new EslintWebpackPlugin({
      baseConfig: {
        rules: {
          "no-console": "off",
        },
      },
      exclude: "/node_modules/",
      extensions: ["tsx", "ts"],
    }),
    new WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.[cm]ts$/],
    }),
  ],
  watchOptions: {
    poll: true,
  },
};

export default development;
