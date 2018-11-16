export default {
    state: () => ({
        version: 0,
        device: void 0 // 0:android   1:ios
    }),
    mutations: {
        /* 存储APP版本号 */
        "SET_NATIVE_VERSION"($state, version) {
            GLOBAL.functions.cache.write("nativeVersion", +version);
            $state.version = +version;
        },
        /* 存储APP设备类型 */
        "SET_NATIVE_DEVICE"($state, device) {
            GLOBAL.functions.cache.write("nativeDevice", +device);
            $state.device = +device;
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
                android: $state.device === 0,
                ios: $state.device === 1
            }
        }
    }
}