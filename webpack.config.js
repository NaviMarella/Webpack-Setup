const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const parts = require("./webpack.parts");

const PATHS = {
  app: path.join(__dirname, "src"),
  build: path.join(__dirname, "dist"),
};

const commonConfig = merge([{
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
      }),
    ],
  },
  parts.loadCSS(),
  parts.loadJavaScript({
    include: __dirname + "/src"
  }),
]);


const productionConfig = merge([
  parts.extractCSS({
    use: ["css-loader", parts.autoprefix()],
  }),
  parts.attachRevision(),
  parts.clean(PATHS.build),
  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[ext]",
      fallback: "file-loader",
      outputPath: "assets"
    },
  }),
  parts.generateSourceMaps({
    type: "source-map"
  }),
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "initial",
          },
        },
      },
    },
  },
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadImages()
]);


module.exports = ({
  mode
}) => {
  process.env.BABEL_ENV = mode;
  if (mode === "production") {
    return merge(commonConfig, productionConfig, {
      mode
    });
  }

  return merge(commonConfig, developmentConfig, {
    mode
  });
};