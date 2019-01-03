import Vue from "vue"
import VueRouter from "vue-router"

import routesBase from "./base";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    linkActiveClass: "active",
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if(!savedPosition) {
            const position = {};
            if(to.hash) position.selector = to.hash;
            if(to.matched.some(i => i.meta.scrollToTop)) {
                position.x = 0;
                position.y = 0;
            }
            return position;
        }
        return savedPosition;
    },
    routes: [
        {
            path: "/",
            redirect: "/test"
        },
        ...routesBase
    ]
});
