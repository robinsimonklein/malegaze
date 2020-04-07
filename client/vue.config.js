const fs = require('fs')

let https = false;

if(process.env.VUE_APP_HTTPS === "true" && process.env.NODE_ENV === 'development'){
    https = {
        key: fs.readFileSync('./cert/robin.local+3-key.pem'),
        cert: fs.readFileSync('./cert/robin.local+3.pem'),
    }
}

module.exports = {
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
