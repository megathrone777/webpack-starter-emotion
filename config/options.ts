import { Configuration, ProgressPlugin } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import NodePolyfillWebpackPlugin from "node-polyfill-webpack-plugin";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import { cwd } from "process";
import { resolve } from "path";

const rootDir: string = cwd();
const options: Configuration = {
  cache: true,
  context: rootDir,
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        exclude: "/node_modules/",
        include: resolve(rootDir, "src"),
        loader: "ts-loader",
        test: /\.(ts|tsx)$/,
        options: {
          transpileOnly: true,
        },
      },
      {
        loader: "file-loader",
        test: /\.(eot|svg|ttf|woff|woff2|otf|png|jpg|jpeg|gif)$/,
        type: "asset/resource",
        options: {
          name: "[name].[contenthash].[ext]",
        },
      },
    ],
  },
  output: {
    clean: true,
    chunkFilename: "js/[name].[contenthash].js",
    filename: "js/bundle.js",
    path: resolve(rootDir, "build"),
    pathinfo: false,
  },
  optimization: {
    removeAvailableModules: true,
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        defaultVendors: false,
        default: {
          minChunks: 1,
          reuseExistingChunk: true,
        },
      },
    },
    usedExports: "global",
  },
  performance: {
    hints: false,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        mode: "readonly",
      },
    }),
    new NodePolyfillWebpackPlugin(),
    new ProgressPlugin({
      activeModules: true,
    }),
  ],
  resolve: {
    cache: true,
    extensions: [".tsx", ".ts", ".js"],
    modules: ["node_modules"],
    plugins: [new TsconfigPathsWebpackPlugin()],
    symlinks: false,
  },
};

export { options };
