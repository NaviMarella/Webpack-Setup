const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");

exports.devServer = ({
  host,
  port
} = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: true,
    overlay: true,
  },
});

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()],
  },
});

exports.loadCSS = ({
  include,
  exclude
} = {}) => ({
  module: {
    rules: [{
      test: /\.css$/,
      include,
      exclude,

      use: ["style-loader", "css-loader", "sass-loader"],
    }, ],
  },
});


exports.extractCSS = ({
  include,
  exclude,
  use = []
}) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].css",
  });

  return {
    module: {
      rules: [{
        test: /\.css$/,
        include,
        exclude,

        use: [
          MiniCssExtractPlugin.loader,
        ].concat(use),
      }, ],
    },
    plugins: [plugin],
  };
};
exports.loadImages = ({
  include,
  exclude,
  options
} = {}) => ({
  module: {
    rules: [{
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options,
        },
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
    ],
  },
});

exports.loadJavaScript = ({
  include,
  exclude
} = {}) => ({
  module: {
    rules: [{
      test: /\.js$/,
      include,
      exclude,
      use: "babel-loader",
    }, ],
  },
});

exports.generateSourceMaps = ({
  type
}) => ({
  devtool: type,
});

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])],
});

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});