export default {
    /**
     * @program 临时数据缓存
     * @author Chuck.迟海
     * @date 2016-6-20
     */
    cache: {
        /**
         * @program 写入临时数据缓存
         * @method GLOBAL.functions.cache.write(dataName, dataObj, isLocalStorage)
         * @return (String) 写入的数据字符串格式 或 报错信息
         * @parameter
         *     dataName (String)该条数据的名称，用于覆盖、读取或删除数据
         *     data     需要写入的数据
         *     isLocalStorage (Boolean)指定数据需要存储的Storage，true = localStorage，false = sessionStorage，可空，默认：false
         * @example GLOBAL.functions.cache.write("ceshi", {test:"hello"});
         * @author Chuck.迟海
         * @date 2016-6-20
         */
        write(name, data, isLocalStorage) {
            if(!name) return "'name' is not found";
            if(!data) {
                this.remove(name, isLocalStorage);
                return `'${name}' cache removed`;
            }
            GLOBAL.functions.log({
                title: "cache-write",
                text: name,
                color: "#008000"
            }, typeof data === "object" ? JSON.parse(JSON.stringify(data)) : data);
            const storage = isLocalStorage ? localStorage : sessionStorage,
                writeData = typeof data === "object" ? JSON.stringify(data) : data;
            storage[name] = writeData;
            return writeData;
        },
        /**
         * @program 读取临时数据缓存
         * @method GLOBAL.functions.cache.read(dataName, isLocalStorage, isDataCheck)
         * @return (String|undefined|Object) 报错信息 | 数据不存在时返回undefined | 数据存在时返回(如果数据是json对象则返回反序列化后的json对象)
         * @parameter
         *     dataName       (String)该条数据的名称，用于读取数据
         *     isLocalStorage (Boolean)数据缓存所在Storage，true = localStorage，false = sessionStorage，可空，默认：false
         *     isDataCheck    (Boolean)正常不需要用到该参数，dataCheck方法的执行过程中会调用read方法，以该参数防止read中再打印一次console调试日志
         * @example GLOBAL.functions.cache.read("ceshi");
         * @author Chuck.迟海
         * @date 2016-6-20
         */
        read(name, isLocalStorage, isDataCheck) {
            if(!name) return "'name' is not found";
            const storage = isLocalStorage ? localStorage : sessionStorage,
                readTemp = storage[name];
            if(!readTemp) return void 0;
            let readRet = "";
            try {
                readRet = JSON.parse(readTemp);
            } catch (err) {
                readRet = readTemp;
            }
            if(!isDataCheck) {
                GLOBAL.functions.log({
                    title: "cache-read",
                    text: name,
                    color: "#008000"
                }, JSON.parse(JSON.stringify(readRet)));
            }
            return readRet;
        },
        /**
         * @program 删除临时数据缓存
         * @method GLOBAL.functions.cache.remove(dataName, isLocalStorage)
         * @return (String||undefined) 报错信息 | 数据删除成功或数据不存在都会返回undefined
         * @parameter
         *     dataName       (String)该条数据的名称，用于删除数据
         *     isLocalStorage (Boolean)数据缓存所在Storage，true = localStorage，false = sessionStorage，可空，默认：false
         * @example GLOBAL.functions.cache.remove("ceshi");
         * @author Chuck.迟海
         * @date 2016-6-20
         */
        remove(name, isLocalStorage) {
            if(!name) return "'name' is not found";
            GLOBAL.functions.log({
                title: "cache-remove",
                text: name,
                color: "#008000"
            });

            const storage = isLocalStorage ? localStorage : sessionStorage;
            return storage.removeItem(name);
        },
        /**
         * @program 检查缓存是否存在
         * @method GLOBAL.functions.cache.check(dataName, isLocalStorage).then(...)
         * @return Promise
         * @parameter
         *     dataName       (String)该条数据的名称
         *     isLocalStorage (Boolean)数据缓存所在Storage，true = localStorage，false = sessionStorage，可空，默认：false
         * @example
         *      GLOBAL.functions.cache.check("ceshi").then(res => {
         *          // 缓存存在时回调，并且返回检查缓存的数据
         *      }, () => {
         *          // 缓存不存在时的回调
         *      });
         * @author Chuck.迟海
         * @date 2016-6-20
         * @update
         *      2017-12-22 将回调改为Promise形式
         */
        check(dataName, isLocalStorage) {
            return new Promise((resolve, reject) => {
                const cacheData = this.read(dataName, isLocalStorage, true);
                if(cacheData) resolve(cacheData);
                else reject();
            });
        }
    },
    browser: { // 判断浏览器信息
        versions: (function browserVersions() {
            const userAgent = navigator.userAgent,
             iosVersion = userAgent.match(/CPU iPhone OS (\d+)[_](\d+) like/);
            return {
                qq: userAgent.match(/\sQQ/i) === " qq", // 是否QQ
                uc: userAgent.indexOf("UCBrowser") > -1, // UC浏览器
                ios: iosVersion && iosVersion[1], // ios终端
                iPad: userAgent.indexOf("iPad") > -1, // 是否iPad
                gecko: userAgent.indexOf("Gecko") > -1 && userAgent.indexOf("KHTML") < 0, // 火狐内核
                presto: userAgent.indexOf("Presto") > -1, // opera内核
                webkit: userAgent.indexOf("AppleWebKit") > -1, // 苹果、谷歌内核
                mobile: !!userAgent.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
                iPhone: userAgent.indexOf("iPhone") > -1, // 是否为iPhone或者QQHD浏览器
                webApp: userAgent.indexOf("Safari") < 0, // 是否web应用程序，没有头部与底部
                safari: !!iosVersion && userAgent.indexOf("Safari") > -1, // iOS safari 浏览器
                weChat: userAgent.indexOf("MicroMessenger") > -1, // 是否微信
                aliPay: !!userAgent.match(/Alipay/i), // 是否支付宝
                trident: userAgent.indexOf("Trident") > -1, // IE内核
                android: userAgent.indexOf("Android") > -1 || userAgent.indexOf("Linux") > -1, // android终端或者uc浏览器
                qqBrowser: userAgent.indexOf("MQQBrowser") > -1 // 手机QQ浏览器
            };
        }()),
        language: (navigator.browserLanguage || navigator.language).toLowerCase() // 当前语言
    },
    /**
     * @program 时间戳转倒计时格式化（毫秒数转格式化倒计时）
     * @method GLOBAL.functions.timestampToCountdown(timestamp, format, formatAdditional)
     * @return (String) 格式化后的倒计时文本
     * @parameter
     *     timestamp        (Number|String)时间戳（毫秒数）
     *     format           (String)格式规则，日(d)、时(h)、分(m)、秒(s)可以用1-2个占位符，毫秒(S)只可用1个占位符，例如：hh:mm:ss.S，可空，默认：hh:mm:ss
     *     formatAdditional (String)与format相同，在format中有需要格式化日(d)时，若d=0的情况，会返回通过该参数的规则格式化后的数据，可空，默认：与format相同
     * @example GLOBAL.functions.timestampToCountdown(127122881, "d天 hh:mm:ss.S", "hh:mm:ss.S")
     * @author Chuck.迟海
     * @date 2017-12-27
     */
    timestampToCountdown(timestamp, formatStr = "hh:mm:ss", formatAdditional) {
        const timestampNum = parseInt(timestamp);
        const rule = {
            "d+": Math.floor(timestampNum / 1000 / 60 / 60 / 24), // 日
            "h+": Math.floor(timestampNum / 1000 / 60 / 60 % 24), // 时
            "m+": Math.floor(timestampNum / 1000 / 60 % 60), // 分
            "s+": Math.floor(timestampNum / 1000 % 60), // 秒
            "S": Math.floor(timestampNum % 1000) // 毫秒
        };
        let formatRes = rule["d+"] > 0 ? formatStr : formatAdditional || formatStr;
        for(let analytical in rule) {
            if(new RegExp("(" + analytical + ")").test(formatRes)) {
                formatRes = formatRes.replace(RegExp.$1, RegExp.$1.length === 1 ? rule[analytical] : ("00" + rule[analytical]).substr(("" + rule[analytical]).length));
            }
        }
        return formatRes;
    },
    /**
     * @program 控制台输出调试信息
     * @method GLOBAL.functions.log(options, ...)
     * @parameter
     *     options (String|Object)调试信息标题文本 或 配置对象
     *          - 配置参数
     *              title (String)调试信息标题文本，默认：debug
     *              text (String)调试信息说明文本
     *              color (String)调试信息说明文本颜色，默认：blue
     *     ... 其余后续参数都将作为console输出信息
     * @example GLOBAL.functions.log("测试", 1111, 2222);
     *           GLOBAL.functions.log({
     *              title: "测试",
     *              text: "调试输出测试",
     *           }, 1111, 2222);
     * @author Chuck.迟海
     * @date 2018-3-30
     * @update
     *      2017-12-22 修复无法正常输出元素对象、事件对象。
     *                 自动识别第一个参数是否为参数，除原始Object对象外，可直接将第一个参数作为调试信息输出。
     */
    log(options = {}) {
        const isOption = Object.prototype.toString.call(options) === "[object Object]";
        const isText = typeof options === "string" || typeof options === "number";
        const _options = Object.assign({}, {
            title: "debug",
            text: "",
            color: "#26a2ff"
        }, isOption ?
            options :
            isText ?
                {text: options} :
                {text: "-"}
        );
        const logData = Array.prototype.slice.apply(arguments).splice(isOption||isText ? 1 : 0, arguments.length)
            .map(item => {
                if(Object.prototype.toString.call(item) === "[object Object]") {
                    try {
                        return JSON.parse(JSON.stringify(item));
                    } catch (err) {
                        return item;
                    }
                }
                return item;
            });

        if(GLOBAL.development) {
            console.log(
                `%c ${_options.title} %c ${_options.text} \n`,
                `color:#fff;padding:1px;border-radius:3px 0 0 3px;background-color:${_options.color};`,
                `border-radius:0 3px 3px 0;border:1px solid ${_options.color};color:${_options.color};`,
                ...logData
            );
        }
    },
    /**
     * @program APP功能版本判断，用于判断部分必须达到某些版本才可使用的功能是否可用
     * @method GLOBAL.functions.appVersionCheck(key)
     * @return (Boolean) true-可用，false-不可用
     * @parameter
     *     key (String)功能key，配置在/src/controllers/application/version-control.js
     * @example GLOBAL.functions.appVersionCheck("VOICE_NOTICE");
     * @author Chuck.迟海
     * @date 2018-8-14
     */
    appVersionCheck(key) {
        if(vueObj.$store.getters.appRuntime) {
            if(vueObj.$store.getters.appDevice.ios) {
                return vueObj.$store.state.native.version >= GLOBAL.appVerControl[key].ios;
            } else if(vueObj.$store.getters.appDevice.android) {
                return vueObj.$store.state.native.version >= GLOBAL.appVerControl[key].android;
            }
        }
        return false;
    }
}
