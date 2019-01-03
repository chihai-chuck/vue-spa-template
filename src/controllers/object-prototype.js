export default () => {
    /*
     * 用于判断一个字符串中是否包含一个一维字符串数组中的任意值，并返回第一个被匹配的值
     * 示例：
     * "hello world".indexOfMultiple(["hi","help"]); 返回值为false (不含任何)
     * "hello world".indexOfMultiple(["hi","hello"]); 返回值为"hello" （含有一个以hello开头的）
     * "hello world".indexOfMultiple(["hi","world"]); 返回值为"world" (含有一个world)
     */
    String.prototype.indexOfMultiple = function indexOfMultiple(matchArr) {
        const str = this.toString();
        for(let i of matchArr) {
            if(str.includes(i)) return i;
        }
        return false;
    };

    /*
     * 日期格式化
     * 年(y) 可以用 1-4 个占位符
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     * 毫秒(S)、季节(E)、星期(W) 只能用 1 个占位符
     * 例子：
     * "yyyy-MM-dd hh:mm:ss.S 星期W E" ==> "2016-06-20 08:09:04.423 星期一 夏"
     * "yyyy-M-d h:m:s.S"      ==> "2016-6-20 8:9:4.18"
     */
    Date.prototype.format = function format(formatStr) {
        const moon = this.getMonth() + 1;
        const rule = {
            "M+": moon, // 月
            "d+": this.getDate(), // 日
            "h+": this.getHours(), // 时
            "m+": this.getMinutes(), // 分
            "s+": this.getSeconds(), // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            "E": ["冬", "春", "夏", "秋"][Math.floor(moon % 12 / 3)], // 季节
            "W": ["日", "一", "二", "三", "四", "五", "六"][this.getDay()], // 星期
            "S": this.getMilliseconds() //毫秒
        };
        let formatRes = formatStr;
        if(/(y+)/.test(formatRes)) formatRes = formatRes.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); // 年
        for(let analytical in rule) {
            if(new RegExp("(" + analytical + ")").test(formatRes)) {
                formatRes = formatRes.replace(RegExp.$1, RegExp.$1.length === 1 ? rule[analytical] : ("00" + rule[analytical]).substr(("" + rule[analytical]).length));
            }
        }
        return formatRes;
    };
    String.prototype.dateFormat = function dateFormat(formatStr) {
        let dateStr = this.replace(/-/g, "/");
        const dateNum = dateStr.split("/").length - 1;
        if(dateNum < 2) dateStr += "/01";
        return new Date(dateStr).format(formatStr);
    };

    /* 获取数组最后一个元素 */
    Array.prototype.last = function last() {
        return this[this.length - 1];
    };

    /* 去除字符串中所有空格 */
    String.prototype.trimAll = function trimAll() {
        return this.replace(/\s+/g, "");
    };

    /* 取字符串最后一个字符 */
    String.prototype.last = function last() {
        return this.substr(-1);
    };

    /* 截取字符串一个匹配字符之后的所有文本。两个参数，一个字符型，需要匹配的字符，第二个布尔型参数，返回值是否包含匹配字符 */
    String.prototype.lastStr = function lastStr(char, contain) {
        return this.substr(this.lastIndexOf(char) + !contain, this.length);
    };

    /* 去除字符串中所有空格 */
    String.prototype.trimAll = function trimAll() {
        return this.replace(/\s+/g, "");
    };

    /* 字符串首字母大写 */
    String.prototype.firstUpperCase = function firstUpperCase() {
        return this[0].toUpperCase() + this.slice(1);
    };

    /* 获取元素计算后的样式 */
    HTMLElement.prototype.getStyle = function getStyle(attr) {
        return this.currentStyle ? this.currentStyle[attr] : document.defaultView.getComputedStyle(this, null)[attr];
    };

    /* 手机号格式化，隐藏中间四位 */
    String.prototype.phoneNumberHide = function phone() {
        return this.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    };

    /* 取数组最大值 */
    Array.prototype.max = function max() {
        return Math.max.apply(null, this);
    };
    /* 取数组最小值 */
    Array.prototype.min = function min() {
        return Math.min.apply(null, this);
    };

    /* 数字向上取整（基于位数取整，例如625取整后700，4560取整后5000） */
    Number.prototype.ceil = function ceil() {
        const length = this.toString().length,
            lengthNum = +`1${Array(length - 1).fill(0).join("")}`,
            floor = this - this % lengthNum;
        return floor + lengthNum;
    }
}
