import "@babel/polyfill";

import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./app.vue";

import vuexCheck from "./store/check";
import vueFilters from "#/vue-filters";
import vueDirectives from "#/vue-directives";

import "^config/mint-ui";
import "^config/base-ui";

import "./global";

Vue.config.performance = process.env.NODE_ENV === "development";
Vue.config.productionTip = process.env.NODE_ENV === "development";

Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue(); // 事件中心
Vue.prototype.$http = GLOBAL.network.request; // http请求
Vue.prototype.$log = window.log = function log() { // 输出调试信息
    GLOBAL.functions.log("log", ...arguments);
};
Vue.prototype.$valid = GLOBAL.validation; // 表单验证
Vue.prototype.$global = GLOBAL; // 全局功能对象，以供在vue中通过this.$http调用，便于在template中直接使用

vuexCheck(store);

router.beforeEach((to, from, next) => {
    Vue.prototype.baseUI.$Loading.hide();
    GLOBAL.functions.log({
        title: "router-before",
        text: `<from>: ${from.path}     <to>: ${to.path}`,
        color: "#ffa500"
    }, from, to);
    const routerNext = url => {
        if(url === false) {
            next(false);
        } else {
            if(from.query.ADTAG && !to.query.ADTAG) {
                next({
                    path: url || to.path,
                    query: {
                        ADTAG: from.query.ADTAG
                    }
                });
            } else {
                if(url) next(url);
                else next();
            }
        }
    };
    const saveToken = (token = to.query.accessToken) => {
        if(token && store.state.user.account.token !== token) {
            store.commit("SET_USER_ACCOUNT", {
                token
            });
            GLOBAL.functions.cache.write("tokenLogin", true);
        }
    };
    const appRedirect = () => {
        if(to.query.platform || store.getters.appRuntime) {
            if(to.query.platform) {
                store.commit("SET_APPLICATION_VERSION", to.query.ver);
                store.commit("SET_APPLICATION_DEVICE", to.query.platform);
                store.commit("SET_APPLICATION_CHANNEL", to.query.channel);
            }
            if(GLOBAL.functions.isTabBar(from.path) && !GLOBAL.functions.isTabBar(to.path)) {
                GLOBAL.application.appRedirect(location.origin + to.fullPath);
                routerNext(false);
                return;
            }
            saveToken();
        }
        routerNext();
    };

    if(to.meta.isLogin) {
        if(!store.state.user.account.token) {
            if(to.query.platform || store.getters.appRuntime) {
                GLOBAL.application.toLoginOut();
            } else {
                // 增加登录测试用在test页面
                // routerNext("/home/user");
                routerNext("/test");
            }
            Vue.prototype.mintUI.Toast("请先登录");
        } else {
            appRedirect();
        }
    } else {
        appRedirect();
    }
});

window.vueObj = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app-box");

vueFilters();
vueDirectives();