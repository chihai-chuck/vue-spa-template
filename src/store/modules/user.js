import Vue from "vue";

export default {
    state: () => ({
        account: {},
        info: {},
        address: { //【用户地址数据】
            index: "", // 当前默认地址ID
            list: {}, // 用户地址列表，格式 {地址ID:{地址数据}, ...}
            origin: [], // 未经格式化的原始用户地址数组，仅用于列表展示时根据接口返回的顺序排序
            load: false // 是否获取过用户地址数据（防止用户地址为空时发起重复请求）
        }
    }),
    actions: {
        /* 用户登录 */
        userLogin({commit}, data = {}) {
            if(data.account) commit("USER_ACCOUNT_SET", data.account);
            if(data.info) commit("USER_INFO_SET", data.info);
        },
        /* 用户退出 */
        userLogout({commit}, data = {}) {
            commit("USER_ACCOUNT_SET", {});
            commit("USER_INFO_SET", {});
            commit("USER_ADDRESS_SET", {});
            commit("USER_ADDRESS_ORIGIN_SET", []);
            commit("USER_ADDRESS_INDEX_SET", "");
            commit("USER_LOGOUT");
        }
    },
    mutations: {
        /* 存储用户账号信息 */
        "USER_ACCOUNT_SET"($state, account = {}) {
            GLOBAL.functions.cache.write("userAccount", account, true);
            Vue.set($state, "account", account);
        },
        "USER_ACCOUNT_UPDATE"($state, data) {
            Vue.set($state, "account", Object.assign($state.account, data));
            GLOBAL.functions.cache.write("userAccount", $state.account, true);
        },
        /* 存储用户个人信息 */
        "USER_INFO_SET"($state, info = {}) {
            GLOBAL.functions.cache.write("userInfo", info, true);
            Vue.set($state, "info", info);
        },
        /* 更新某一项用户个人信息（确保在用户个人信息存在时进行该操作） */
        "USER_INFO_UPDATE"($state, data) {
            Vue.set($state.info, data.key, data.value);
            GLOBAL.functions.cache.write("userInfo", $state.info);
        },
        /* 用户退出登录数据初始化 */
        "USER_LOGOUT"($state) {
            $state.address.load = false;
        },
        /* 存储用户个人收货信息 */
        "USER_ADDRESS_SET"($state, address = {}) {
            GLOBAL.functions.cache.write("userAddress", address, true);
            for(let i of Object.keys(address)) {
                $state.address.index = i;
                if(+address[i].is_default === 1) break;
            }
            Vue.set($state.address, "list", address);
            $state.address.load = true;
        },
        /* 存储原始的数组格式用户个人收货信息 */
        "USER_ADDRESS_ORIGIN_SET"($state, address = []) {
            GLOBAL.functions.cache.write("userAddressOrigin", address, true);
            Vue.set($state.address, "origin", address);
        },
        /* 设置当前使用的收货信息 */
        "USER_ADDRESS_INDEX_SET"($state, id) {
            $state.address.index = id;
        }
    },
    getters: {
        /* 获取用户当前登录状态 */
        userLoginState($state, $getters) {
            return !!$state.account.token;
        },
        /* 自动获取用户信息（在有token且无用户信息时） */
        userInfo($state, $getters) {
            if(!Object.keys($state.info).length) {
                if(!$getters.userLoginState) return {};
                return this._vm.$eventHub.$emit("userInfoRefresh", res => res);
            }
            return $state.info;
        },
        /* 自动获取用户收货地址（只会加载一次） */
        userAddress($state, $getters) {
            if(!$state.address.load) {
                if(!$getters.userLoginState) return {};
                return vueObj.$eventHub.$emit("userAddressRefresh", res => res);
            }
        },
        /* 收货地址总条数 */
        userAddressTotal($state, $getters) {
            return Object.keys($state.address.list).length;
        }
    }
}
