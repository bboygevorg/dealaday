const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, options) => {
  const isDevelopment = options.mode === "development";

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
          use: ["style-loader", "css-loader"],
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
        filename: isDevelopment ? "[name].css" : "[name].[contenthash].css",
        chunkFilename: isDevelopment ? "[id].css" : "[id].[contenthash].css",
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
        NODE_ENV: "development",
        API_URL: "https://dealaday-backend.vercel.app",
      }),
    ],
    devServer: {
      historyApiFallback: {
        disableDotRule: true,
        // rewrites: [
        //   { from: /^\/$/, to: "/index.html" }, // Rewrite root URL
        //   { from: /./, to: "/index.html" },     // Rewrite all other URLs to index.html
        // ],
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
