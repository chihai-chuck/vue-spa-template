import Vue from 'vue';
import Vuex from 'vuex';

import controls from "./modules/controls";
import user from "./modules/user";
import theme from "./modules/theme";
import config from "./modules/config";
import native from "./modules/native";

import logger from "./plugins/logger";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV === "development",
    modules: {
        controls,
        user,
        theme,
        config,
        native
    },
    plugins: [
        logger
    ]
});