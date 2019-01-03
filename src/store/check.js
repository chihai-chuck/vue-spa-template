const checkMap = {
    /* {storage缓存名: store mutations名}，尾部带*表示从localStorage获取，否则都是获取sessionStorage */
    "nativeVersion": "NATIVE_VERSION_SET",
    "nativeDevice": "NATIVE_DEVICE_SET",
    "nativeChannel": "NATIVE_CHANNEL_SET",
    "userAccount": "USER_ACCOUNT_SET*",
    "userInfo": "USER_INFO_SET*",
    "userAddress": "USER_ADDRESS_SET*",
    "userAddressOrigin": "USER_ADDRESS_ORIGIN_SET*"
};

export default store => {
    return new Promise((resolve, reject) => {
        for(let key of Object.keys(checkMap)) {
            const data = GLOBAL.functions.cache.read(key, checkMap[key].last() === "*");
            if(data !== void 0) {
                if(key.substr(0, 8) === "settings") {
                    store.commit("SETTINGS_UPDATE", data);
                } else {
                    store.commit(checkMap[key].replace("*", ""), data);
                }
            }
        }
        resolve();
    });
}
