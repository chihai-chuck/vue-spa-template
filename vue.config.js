/* eslint-disable */
const path = require("path");
const styleLintPlugin = require("stylelint-webpack-plugin");

const resolve = dir => path.join(__dirname, dir);

module.exports = {
    lintOnSave: "error",
    productionSourceMap: false,
    devServer: {
        port: 8080,
        proxy: {
            "/api": {
                target: "<url>",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new styleLintPlugin({
                files: [
                    // "src/**/*.vue",
                    "src/styles/**/*.less"
                ]
            })
        ]
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("^", resolve("src/assets"))
            .set("^config", resolve("src/assets/config"))
            .set("^fonts", resolve("src/assets/fonts"))
            .set("fonts", resolve("src/assets/fonts"))
            .set("^images", resolve("src/assets/images"))
            .set("images", resolve("src/assets/images"))
            .set("^plugins", resolve("src/assets/plugins"))
            .set("@", resolve("src/components"))
            .set("%", resolve("src/pages"))
            .set("+", resolve("src/request"))
            .set("#", resolve("src/controllers"))
            .set("#pages", resolve("src/controllers/pages"))
            .set("#components", resolve("src/controllers/components"))
            .set("*", resolve("src/styles"))
            .set("*pages", resolve("src/styles/pages"))
            .set("*components", resolve("src/styles/components"));

        const oneOfsMap = config.module.rule("less").oneOfs.store;
        oneOfsMap.forEach(item => {
            item.use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: [
                        resolve("src/styles/base.module.less"),
                        resolve("src/styles/color.module.less"),
                        resolve("src/styles/control.module.less")
                    ]
                })
                .end()
        })
    }
};
