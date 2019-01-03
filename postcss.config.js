module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-pxtorem": {
            rootValue: 40,
            propList: ["*"],
            minPixelValue: 2,
            selectorBlackList: [
                "van",
                "pswp"
            ]
        }
    }
};
