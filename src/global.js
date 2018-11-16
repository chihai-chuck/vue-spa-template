import base from "#/base";
import functions from "#/functions";
import objectPrototype from "#/object-prototype";
import network from "#/network";
import draw from "#/draw";
import application from "#/application/interactive";
import appVerControl from "#/application/version-control";
import validation from "#/validation";

window.GLOBAL = {
    development: process.env.NODE_ENV === "development",
    debug: false,
    base,
    draw,
    network,
    functions,
    application,
    appVerControl,
    validation,
    init() {
        objectPrototype();

        GLOBAL.debug = GLOBAL.functions.cache.read("debug", true);
        if(GLOBAL.debug) {
            import("eruda").then(eruda => {
                eruda.init();
            });
        }

        // IOS11 已经修复了300毫秒延迟。所以无需再IOS11及以上版本使用fastclick，否则会造成额外的点击卡顿
        if(GLOBAL.functions.browser.versions.android || GLOBAL.functions.browser.versions.ios < 11) {
            import("fastclick").then(FastClick => {
                FastClick.attach(document.body); // 解决click 300ms延时
            });
        }

        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function requestAnimFrame(callback) {
            setTimeout(callback, 6000 / 60);
        };

        const docEl = document.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = () => {
                const clientWidth = docEl.clientWidth;
                if(!clientWidth) return;
                if(innerWidth > 640) {
                    docEl.style.fontSize = '32px';
                } else {
                    docEl.style.fontSize = clientWidth / 18 + 'px';
                }
            };
        if(!document.addEventListener) return;
        window.addEventListener(resizeEvt, recalc, false);
        document.addEventListener('DOMContentLoaded', recalc, false);

        /*if(functions.getQueryString("platform") || functions.cache.read("applicationDevice")) {
            const appVersion = +((functions.getQueryString("ver") || "").replace(/\./g, "") || functions.cache.read("applicationVersion"));
            if(functions.browser.versions.android && appVersion >= 130 || functions.browser.versions.ios && appVersion >= 119) {
                import("#/application/interactive-new").then(interactive => {
                    GLOBAL.application = interactive.default;
                    /!**
                     * @ 注册ios所有native 主动触发 js 的方法
                     * @ 在安卓webview下运行会导致webvie奔溃，不能在安卓端调用该方法
                     *!/
                    if(functions.browser.versions.ios) {
                        GLOBAL.application.setupWebViewJavascriptBridge(bridge => {
                            // 循环注册Native 要调用的js 功能。
                            Object.keys(GLOBAL.application.$fun).forEach(name => {
                                bridge.registerHandler(name, GLOBAL.application.$fun[name]);
                            });
                        });
                    }
                });
            }
        }*/
    }
};

GLOBAL.init();