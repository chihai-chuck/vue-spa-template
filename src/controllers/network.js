import axios from "axios";
import qs from "qs";

// import CryptoJS from 'crypto-js';

import api from "^config/api";

export default {
    apiURL: process.env.NODE_ENV === "development" ? {
        origin: "http://php.javaframework.cn",
        ws: "wss://caipiao.goodluckchina.net:2122",
        trendWs: "http://caipiao.goodluckchina.net:2124",
        baiduAk: 'gRSmFOB0hvyrNgCykang7lhXHYfVsLZn'
    } : {
        origin: "https://caipiao.goodluckchina.net",
        ws: "wss://caipiao.goodluckchina.net:2122",
        trendWs: "http://caipiao.goodluckchina.net:2124",
        baiduAk: 'gRSmFOB0hvyrNgCykang7lhXHYfVsLZn'
    },
    api,
    request(options) {
        return new Promise((resolve, reject) => {
            GLOBAL.network.http({
                ...options,
                success: res => resolve(res),
                error: err => reject(err)
            });
        });
    },
    requesting: [],
    requestingCtrl(action, url) {
        if(action === "add") {
            this.requesting.push(url);
        } else if(action === "del") {
            const index = this.requesting.indexOf(url);
            if(index > -1) this.requesting.splice(index, 1);
        }
    },
    http(options) {
        const _options = Object.assign({}, {
            type: "post", // 请求方式
            url: "", // 请求地址
            fullUrl: "", // 全地址，用于调试时使用，如果全地址值不为false时，请求地址将会直接使用这个地址，而不去拼接api地址
            dataType: "", // 参数提交类型，可选值formData
            data: {}, // 请求数据
            params: {}, // 请求参数
            headers: {}, // 请求头数据
            success: 0, // 请求成功，从promise resolve返回
            error: 0, // 服务器错误，从promise reject返回（服务器返回错误，不是连接错误）
            complete: 0, // 请求结束后的回调函数（无论是否成功都会被调用，不走promise，从参数中调起回调函数）
            errorDisabled: false, // 禁用请求返回错误时的默认处理方式，如果传入一个错误码数组，则返回包含该错误码数组其中之一的错误时禁用默认的错误处理方式
            successAll: false, // 返回值是否做判断，如果为true将直接把返回值全部返回给success，不根据返回code做错误判断
            loadingIcon: true, // 是否显示loading状态动画
            timeout: 10000, // 超时时间。默认10000ms
            others: {}, // 其他参数，将附带至axios
            autoReconnect: true, // 是否开启请求超时自动重新请求
            reconnect: { // （自动重新请求相关参数传递，正常接口请求时无需用到）
                status: false, // 当前请求是否属于递归重新发起的请求
                timeoutReconnectNum: 0, // 递归重新请求次数
                interceptors: 0 // 递归重新请求时会用到，用于传递第一次原始的拦截器
            }
        }, options);

        const networkLog = function networkLog(type, color) {
            GLOBAL.functions.log({
                title: `http-${_options.type}-${type}`,
                text: _options.url || _options.fullUrl,
                color
            }, ...Array.prototype.slice.apply(arguments).splice(2, arguments.length));
        };

        const offlineCatch = _options.reconnect.status ? 0 : Date.now();

        const axiosInterceptors = _options.reconnect.status ? _options.reconnect.interceptors : axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if(error && error.response) {
                switch(error.response.status) {
                    case 400:
                        error.message = '请求错误';
                        break;
                    case 401:
                        error.message = '未授权，请登录';
                        break;
                    case 403:
                        error.message = '拒绝访问';
                        break;
                    case 404:
                        error.message = `请求地址错误: ` + (_options.url || _options.fullUrl);
                        break;
                    case 408:
                        error.message = '请求超时';
                        break;
                    case 500:
                        error.message = '服务器内部错误';
                        break;
                    case 501:
                        error.message = '服务未实现';
                        break;
                    case 502:
                        error.message = '网关错误';
                        break;
                    case 503:
                        error.message = '服务不可用';
                        break;
                    case 504:
                        error.message = '网关超时';
                        break;
                    case 505:
                        error.message = 'HTTP版本不受支持';
                        break
                    // no default
                }
            }
            return Promise.reject(error);
        });

        // if(this.requesting.includes(_options.url || _options.fullUrl)) return; // 防止在请求连接还未结束时发起相同请求造成网络阻塞及服务器压力

        if(_options.loadingIcon && !_options.reconnect.status) {
            vueObj.baseUI.$Loading.show({
                background: "transparent"
            });
        }

        this.requestingCtrl("add", _options.url || _options.fullUrl);

        axios({
            method: _options.type,
            url: _options.fullUrl ? _options.fullUrl : _options.url,
            headers: _options.headers,
            data: _options.data,
            params: _options.params,
            timeout: _options.timeout,
            transformRequest: [data => {
                return qs.stringify(data);
            }],
            ...options.others
        }).then(res => {
            this.requestingCtrl("del", _options.url || _options.fullUrl);

            // if(typeof res.data === 'string') res.data = this.responseTripleDesEncode(res.data);

            const data = res.data;

            networkLog("success", "#0000ff", JSON.parse(JSON.stringify(data)));

            if(_options.loadingIcon) vueObj.baseUI.$Loading.hide();

            axios.interceptors.request.eject(axiosInterceptors);
            if(_options.successAll) {
                _options.success(data);
            } else {
                if(data.code === 1 || data.code === "00" || data.httpCode === 200) {
                    if(typeof _options.success === "function") _options.success(data);
                } else {
                    if(!_options.errorDisabled) {
                        this.responseErrorDist(data);
                    }
                    if(_options.errorDisabled instanceof Array && !_options.errorDisabled.includes(res.data.code)) {
                        this.responseErrorDist(data);
                    } else {
                        if(typeof _options.error === "function") _options.error(data);
                    }
                }
                if(_options.complete) _options.complete(data);
            }
        }).catch(err => {
            this.requestingCtrl("del", _options.url || _options.fullUrl);
            const errString = err.toString();
            if(errString.includes('timeout') && _options.autoReconnect) {
                if(_options.reconnect.timeoutReconnectNum < 3) {
                    networkLog("reconnect", "#ffa500", `接口请求${_options.timeout}ms超时，第${_options.reconnect.timeoutReconnectNum + 1}次发起重新请求`);
                    this.http(Object.assign({}, _options, {
                        reconnect: {
                            status: true,
                            timeoutReconnectNum: _options.reconnect.timeoutReconnectNum + 1,
                            interceptors: axiosInterceptors
                        }
                    }));
                } else {
                    if(Date.now() - offlineCatch < _options.timeout) {
                        networkLog("reconnect", "#ff0000", `检测到接口请求非正常超时，判断可能是网络断开状态，等待3秒后将再次重新发起请求`);
                        setTimeout(() => {
                            this.http(Object.assign({}, _options, {
                                reconnect: {
                                    status: true,
                                    interceptors: axiosInterceptors
                                }
                            }));
                        }, 3E3);
                    } else {
                        networkLog("discontinue", "#ff0000", `接口连续重新请求${_options.reconnect.timeoutReconnectNum}次超时，停止继续请求`);
                        if(_options.loadingIcon) vueObj.baseUI.$Loading.hide();
                        axios.interceptors.request.eject(axiosInterceptors);
                        vueObj.mintUI.Toast("您的网络不稳定，请检查网络设置");
                        if(_options.complete) _options.complete(err);
                    }
                }
                return;
            }
            networkLog("error", "#ff0000", errString);
            if(_options.loadingIcon) vueObj.baseUI.$Loading.hide();
            vueObj.mintUI.Toast(err.message);
            if(_options.complete) _options.complete(err);
        });
    },
    responseErrorDist(err) {
        switch(true) {
            case err.code === "-100":
                vueObj.mintUI.MessageBox.close();
                vueObj.$store.dispatch("userLogout");
                break;
            // 超时
            case err.code === 415:
                vueObj.mintUI.MessageBox("提示", err.msg);
                break;
            // 统一约定488为模态框弹窗
            case err.code === 488:
                vueObj.mintUI.MessageBox("提示", err.msg);
                break;
            default:
                vueObj.mintUI.MessageBox("提示", err.msg);
        }
    }
    // responseTripleDesEncode(data) {
    //     return JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.TripleDES.decrypt(data.trim(), CryptoJS.enc.Utf8.parse('gl_lotterygl_lotteryabcd'), {
    //         iv: CryptoJS.enc.Utf8.parse('20180117'),
    //         mode: CryptoJS.mode.CBC,
    //         padding: CryptoJS.pad.Pkcs7
    //     })));
    // }
}
