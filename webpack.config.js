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
      // Adding this plugin to achieve scope hoisting for modules
      new webpack.optimize.ModuleConcatenationPlugin()
    ],
  },
  parts.loadCSS(),
  parts.loadJavaScript({
    include: __dirname + "/src"
  }),
]);


const productionConfig = merge([{
    output: {
      chunkFilename: "[name].[chunkhash:4].js",
      filename: "[name].[chunkhash:4].js",
      publicPath: "/webpack-demo/",
    },
  },
  parts.extractCSS({
    use: ["css-loader", parts.autoprefix()],
  }),
  parts.attachRevision(),
  parts.minifyJavaScript(),
  parts.clean(PATHS.build),
  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[hash:4].[ext]",
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
      runtimeChunk: {
        name: "manifest",
      },
    },
  },
  {
    performance: {
      hints: "warning",
      maxEntrypointSize: 50000, // in bytes, default 250k
      maxAssetSize: 15000,
    },
  },
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      }
    },
  }),
  parts.analyzeBuild(),
  {
    resolve: {
      extensions: [".js", ".json", ".jsx"],
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