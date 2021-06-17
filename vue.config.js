module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    host: "localhost",
    // port: 8080,
    // public: '0.0.0.0:8080',

    // disableHostCheck: true,
  },
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
  
  // publicPath: "/"
};
