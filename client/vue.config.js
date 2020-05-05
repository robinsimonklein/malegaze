const fs = require('fs')

let https = false;

if(process.env.VUE_APP_HTTPS === "true" && process.env.NODE_ENV === 'development'){
    https = {
        key: fs.readFileSync(`./cert/${process.env.KEY_PEM}`),
        cert: fs.readFileSync(`./cert/${process.env.PEM}`),
    }
}

module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    devServer: {
        disableHostCheck: true,
        https: https,
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/main.scss";`
            }
        }
    }
}
