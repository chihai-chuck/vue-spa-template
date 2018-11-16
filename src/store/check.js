const checkMap = {
    // {storage缓存名: store mutations名}，尾部带*表示从localStorage获取，否则都是获取sessionStorage
    "applicationVersion": "SET_APPLICATION_VERSION",
    "applicationDevice": "SET_APPLICATION_DEVICE",
    "applicationChannel": "SET_APPLICATION_CHANNEL",
    "userAccount": "SET_USER_ACCOUNT*",
    "userInfo": "SET_USER_INFO*",
    "userId": "SET_USER_ID*",
    "userAddress": "SET_USER_ADDRESS*",
    "userAddressOrigin": "SET_USER_ADDRESS_ORIGIN*"
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