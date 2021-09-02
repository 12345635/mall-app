const px2rem = require("postcss-px2rem");

module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    px2rem({
                        remUnit: 37.5
                    }),
                ]
            }
        }
    },
    configureWebpack: require("./webpack.config"),
    publicPath: process.env.NODE_ENV == "production" ? "../dist/" : "/"
}