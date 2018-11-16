import Vue from 'vue'

export default () => {
    Vue.filter('rmb', money => money + '元');
    /* 最大省略数过滤器，若数值大于指定限制，则省略显示，例如 当前值:1555 限制省略最大值:10000 得出结果为 1555、 当前值:15555 限制省略最大值:10000 得出结果为10000+， 第一个参数是当前数值，第二个参数是限制最大省略值，限制最大省略值可空，默认为100000 */
    Vue.filter("numberEllipsis", (val, ellipsisNum) => {
        const ellipsisMax = parseInt(ellipsisNum) || 100000,
            valNum = parseInt(val);
        return valNum > ellipsisMax ? ellipsisMax.toString() + "+" : valNum;
    });

    // 日期格式化，调用方法参考functions/object-prototype.js
    Vue.filter("dateFormat", (val, formatStr) => {
        if(typeof val === "object") {
            return val.format(formatStr);
        } else if(typeof val === "string") {
            return val.dateFormat(formatStr);
        }
        return val;
    });
    
    Vue.filter("timestampToCountdown", (val, formatStr, formatAdditional) => GLOBAL.functions.timestampToCountdown(val, formatStr, formatAdditional));
}
