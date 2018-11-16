import Vue from "vue";

export default {
    state: {
        header: {
            statusBarHeight: 0, // IOS状态栏高度
            statusBarRouter: [

            ],
            appToBackListFull: [

            ],
            appToBackList: [

            ]
        },
        scroll: {
            position: {},
            positionInclude: [

            ]
        }
    },
    mutations: {
        /* 存储Header组件状态栏高度 */
        "SET_CONTROLS_HEADER_STATUS_BAR_HEIGHT"($state, value) {
            $state.header.statusBarHeight = +(value || 0);
        },
        /* 存储Scroll滚动位置 */
        "SET_CONTROLS_SCROLL_POSITION"($state, position) {
            Vue.set($state.controls.scroll.position, $state.user.account.token + vueObj.$route.path, Object.assign({}, {
                x: 0,
                y: 0
            }, position));
        }
    },
    getters: {
        /* 获取当前用户在当前页面的Scroll组件滚动位置 */
        controlsScrollPosition($state, $getters) {
            const position = $state.scroll.position[vueObj.$store.state.user.account.token+vueObj.$route.path];

            if(Object.keys($state.scroll.position).length && position) {
                return position;
            }
            return {
                x: 0,
                y: 0
            }
        }
    }
}