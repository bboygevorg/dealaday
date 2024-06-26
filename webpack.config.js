const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, options) => {
  const isDevelopment = options.mode === "development";
  const apiURL = isDevelopment
    ? "http://192.168.2.153:5000"
    : "https://dealaday-backend.vercel.app";

  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
        {
          test: /\.scss$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|ttf|eot|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "fonts/[name].[ext]",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      modules: ["node_modules", path.resolve(__dirname, "src")],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public/assets",
            to: "assets",
          },
        ],
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: options.mode,
        API_URL: apiURL,
      }),
    ],
    devServer: {
      historyApiFallback: {
        disableDotRule: true,
      },
      static: path.resolve(__dirname, "src"),
      port: 3000,
      open: true,
    },
    devtool: "source-map",
    watchOptions: {
      ignored: /node_modules/,
    },
  };
};
