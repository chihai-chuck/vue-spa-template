import native from "#/application/interactive/native";

export default {
    $fun: native,
    setupWebViewJavascriptBridge(callback) {
        if(window.WebViewJavascriptBridge) return callback(WebViewJavascriptBridge);
        if(window.WVJBCallbacks) return window.WVJBCallbacks.push(callback);
        window.WVJBCallbacks = [callback];
        const WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(() => {
            document.documentElement.removeChild(WVJBIframe);
        });
    },
    nativeAction(method, data = [], callback) {
        if(window.WebViewJavascriptBridge) window.WebViewJavascriptBridge.callHandler(method, data, callback);
    },
    /* 返回首页 */
    returnHome() {
        if(vueObj.$store.getters.appRuntime) {
            if(vueObj.$store.getters.appDevice.android) {
                window.appjs.returnHome([]);
            } else if(vueObj.$store.getters.appDevice.ios) {
                GLOBAL.application.nativeAction('returnHome');
            }
        }
    },
    /* 返回上一页 */
    appToBack() {
        if(vueObj.$store.getters.appRuntime) {
            if(vueObj.$store.getters.appDevice.android) {
                window.appjs.appToBack([]);
            } else if(vueObj.$store.getters.appDevice.ios) {
                GLOBAL.application.nativeAction('appToBack');
            }
        }
    },
    /* 是否显示原生头部 */
    isShowHeadLayout(status = false) {
        if(vueObj.$store.getters.appRuntime) {
            if(vueObj.$store.getters.appDevice.android) {
                if(window.appjs && window.appjs.isShowHeadLayout) window.appjs.isShowHeadLayout([status]);
            } else if(vueObj.$store.getters.appDevice.ios) {
                if(window.isShowHeadLayout) GLOBAL.application.nativeAction('isShowHeadLayout', [status]);
            }
        }
    },
    /* 扫一扫 参数传1是扫码付款*/
    scan(type) {
        if(vueObj.$store.getters.appRuntime) {
            if(vueObj.$store.getters.appDevice.android) {
                window.appjs.scan([type]);
            } else if(vueObj.$store.getters.appDevice.ios) {
                GLOBAL.application.nativeAction('scan', [type]);
            }
        }
    },
    /* 收钱 */
    cashOutCode() {
        if(vueObj.$store.getters.appRuntime) {
            if(vueObj.$store.getters.appDevice.android) {
                window.appjs.cashOutCode([]);
            } else if(vueObj.$store.getters.appDevice.ios) {
                GLOBAL.application.nativeAction('cashOutCode');
            }
        }
    },
    /* 退出登录 */
    toLoginOut() {
        if(vueObj.$store.getters.appRuntime) {
            if(vueObj.$store.getters.appDevice.android) {
                window.appjs.toLoginOut([]);
            } else if(vueObj.$store.getters.appDevice.ios) {
                GLOBAL.application.nativeAction('toLoginOut');
            }
        }
    },
    /* 立即提现 */
    withdraw() {
        if(vueObj.$store.getters.appRuntime) {
            if(vueObj.$store.getters.appDevice.android) {
                window.appjs.withdraw([]);
            } else if(vueObj.$store.getters.appDevice.ios) {
                GLOBAL.application.nativeAction('withdraw');
            }
        }
    },
    /* 原生页面跳转 */
    toAppProView(type = 0) {
        const typeName = [
            // 交易记录
            {
                android: "capital.CashBillAct",
                ios: "TradingBillViewController"
            },
            // 到未结分润界面
            {
                android: "capital.TradeListAct",
                ios: "TradingDetailsViewController"
            }
        ][type];
        if(vueObj.$store.getters.appRuntime) {
            if(vueObj.$store.getters.appDevice.android) {
                window.appjs.toAppProView([typeName.android]);
            } else if(vueObj.$store.getters.appDevice.ios) {
                GLOBAL.application.nativeAction('toAppProView', [typeName.ios]);
            }
        }
    },
    /* 刷新上一级页面 */
    refreshPreView(name) {
        if(vueObj.$store.getters.appRuntime) {
            if(vueObj.$store.getters.appDevice.android) {
                window.appjs.refreshPreView([name]);
            } else if(vueObj.$store.getters.appDevice.ios) {
                GLOBAL.application.nativeAction('refreshPreView', [name]);
            }
        }
    },
    /* 调用原生照相机上传图片，name为自定义图片名称 */
    toAppCamera(name) {
        if(vueObj.$store.getters.appRuntime) {
            if(vueObj.$store.getters.appDevice.android) {
                window.appjs.toAppCamera([name]);
            } else if(vueObj.$store.getters.appDevice.ios) {
                GLOBAL.application.nativeAction('toAppCamera', [name]);
            }
        }
    },
    /* 调用原生保存图片的方法，imgUrl为图片路径，status传0（当天到账）,1（次日到账）。 */
    saveReceiptCodeImg(imgUrl, status) {
        if(vueObj.$store.getters.appRuntime) {
            if(vueObj.$store.getters.appDevice.android) {
                window.appjs.saveReceiptCodeImg([imgUrl, status]);
            } else if(vueObj.$store.getters.appDevice.ios) {
                GLOBAL.application.nativeAction('saveReceiptCodeImg', [imgUrl, status]);
            }
        }
    },
    /* 请求通讯录 */
    getAppContacts() {
        if(vueObj.$store.getters.appRuntime) {
            if(vueObj.$store.getters.appDevice.android) {
                window.appjs.getAppContacts([]);
            } else if(vueObj.$store.getters.appDevice.ios) {
                GLOBAL.application.nativeAction('getAppContacts');
            }
        }
    },
    /**
     * @ program app页面跳转进入
     * @ method GLOBAL.application.AppRedirect(url)
     * @ parameter
     *     url： 需要app重新打开有一个webview的地址链接（页面路由）
     *     isShowNav:是否显示app自带头部
     * @ example GLOBAL.application.appRefreshPreView("/lottery",0);
     * @ 新版本传入都以数组的形式传入
     */
    appRedirect(url, isShowNav) {
        if(vueObj.$store.getters.appRuntime) {
            if(vueObj.$store.getters.appDevice.android) {
                window.appjs.toAppRedirect([url, isShowNav ? isShowNav : 0]);
            } else if(vueObj.$store.getters.appDevice.ios) {
                GLOBAL.application.nativeAction('toAppRedirect', [url, isShowNav ? isShowNav : 0]);
            }
        }
    }
}