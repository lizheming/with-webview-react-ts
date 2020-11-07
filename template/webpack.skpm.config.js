module.exports = function (config, entry) {
  config.node = entry.isPluginCommand ? false : {
    setImmediate: false
  };
  
  config.resolve.extensions = config.resolve.extensions.concat(['.ts', '.tsx']);
  config.module.rules = config.module.rules.concat([
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    },
    {
      test: /\.(html)$/,
      use: [{
          loader: "@skpm/extract-loader",
        },
        {
          loader: "html-loader",
          options: {
            attrs: [
              'img:src',
              'link:href'
            ],
            interpolate: true,
          },
        },
      ]
    },
    {
      test: /\.(css)$/,
      use: [{
          loader: "@skpm/extract-loader",
        },
        {
          loader: "css-loader",
        },
      ]
    }
  ]);
}
