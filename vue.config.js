module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8088/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
                logLevel: 'debug',
            }
        }
    },
    // chainWebpack: (config) => {
    //     // console.log(config);
    // }
};
