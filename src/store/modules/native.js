export default {
    state: () => ({
        version: void 0, // 转换数字格式版本号：例如：155
        versionOrigin: "", // 原始格式版本号，例如：1.5.5
        device: void 0, // 设备类型 3:android   2:ios
        channel: 0
    }),
    mutations: {
        /* 存储APP版本号 */
        "NATIVE_VERSION_SET"($state, version) {
            GLOBAL.functions.cache.write("nativeVersion", version);
            $state.versionOrigin = version;
            $state.version = +version.replace(/\./g, "");
        },
        /* 存储APP设备类型 */
        "NATIVE_DEVICE_SET"($state, device) {
            GLOBAL.functions.cache.write("nativeDevice", +device);
            $state.device = +device;
        },
        /* 存储APP Channel */
        "NATIVE_CHANNEL_SET"($state, channel) {
            GLOBAL.functions.cache.write("nativeChannel", +channel);
            $state.channel = +channel;
        }
    },
    getters: {
        /* 检测当前是否在原生APP环境 */
        appRuntime($state, $getters) {
            return $state.device !== void 0;
        },
        /* 检测当前原生APP设备 */
        appDevice($state, $getters) {
            return {
                android: $state.device === 3,
                ios: $state.device === 2
            }
        }
    }
}
