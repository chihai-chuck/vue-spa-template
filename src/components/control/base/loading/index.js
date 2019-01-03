import Vue from "vue";
import Loading from "./loading.vue";

Loading.newInstance = (properties = {}, props = {}) => {
    const Instance = new Vue({
        data: Object.assign({}, properties, {}),
        render(h) {
            let vnode = "";
            if(this.render) {
                vnode = h(Loading, {
                    props: Object.assign({}, {
                        fix: true,
                        background: "transparent",
                        fullScreen: true
                    }, props)
                }, [this.render(h)]);
            } else {
                vnode = h(Loading, {
                    props: Object.assign({}, {
                        fix: true,
                        background: "transparent",
                        fullScreen: true
                    }, props)
                });
            }
            return h("div", {
                "class": "gl-loading-fullscreen",
                style: {
                    position: "fixed",
                    zIndex: 10000,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }
            }, [vnode]);
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const loading = Instance.$children[0];

    return {
        show() {
            document.body.style.overflow = "hidden";
            loading.visible = true;
        },
        remove(callback) {
            loading.visible = false;
            setTimeout(() => {
                loading.$parent.$destroy();
                const $fullscreen = document.getElementsByClassName("gl-loading-fullscreen");
                if($fullscreen.length) document.body.removeChild($fullscreen[0]);
                document.body.style.overflow = "";
                callback();
            }, 500);
        },
        component: loading
    };
};

let loadingInstance = null;

const getLoadingInstance = (render, props) => {
    loadingInstance = loadingInstance || Loading.newInstance({
        render
    }, props);

    return loadingInstance;
};

Loading.show = (props = {}) => {
    getLoadingInstance(props.render, props).show(props);
};

Loading.hide = props => {
    if(!loadingInstance) return false;

    getLoadingInstance({}, props).remove(() => {
        loadingInstance = null;
    });
};

export default Loading;
