/* 数据校验， 返回true验证通过、返回false验证不通过 */
/* 可通过this.$valid快捷调用，例this.$valid.nickname() */

export default {
    /* 用户昵称验证 规则：4-20个字符，可由中英文、数字、“-”、“_”组成 */
    nickname(str) {
        return !!str.toString().match(/^[_\-a-zA-Z0-9\u4e00-\u9fa5]{4,20}$/);
    },

    /* 人名验证 规则：必须是汉字或英文字母 */
    name(str) {
        return !str.toString().match(/[^a-zA-Z\u4e00-\u9fa5]/g);
    },

    /* 中国人名验证 规则：必须是2-6个汉字 */
    nameChinese(str) {
        return /^[\u4e00-\u9fa5]{2,6}$/.test(str);
    },

    /* 中国手机号验证 规则：必须是11位数字且符合运营商号段 */
    telChina(str) {
        return !!str.toString().match(/^[1]([3][0-9]|[4][5-9]|[5][0-9]|66|70|71|[7][3-8]|[8][0-9]|98|99)[0-9]{8}$/);
    },

    /* 密码验证 规则：必须是6-20位的大小写英文字母或数字 */
    password(str) {
        return !!str.toString().match(/^[a-zA-Z0-9]{6,20}$/);
    },

    /* 手机短信验证码验证 规则：6位纯数字 */
    captchaSMS(str) {
        return !!str.toString().match(/^[0-9]{6}$/);
    },

    /* 中国身份证验证 规则：验证是否正确的15或18位中国公民身份证 */
    idNumberChina(str) {
        let valid = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
        if(valid) {
            if(str.length === 18) {
                const idCardWeight = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2), // 前17位加权因子
                    idCardCheckDigit = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); // 除以11后，可能产生的11位余数、校验码
                let idCardWeightSum = 0; // 用来保存前17位各自乘以加权因子后的总和

                for(let i = 0; i < 17; i++) idCardWeightSum += str.substring(i, i + 1) * idCardWeight[i];

                let isX = isNaN(str.slice(-1)); //末位是否是X
                const idCardMod = idCardWeightSum % 11; //计算出校验码所在数组的位置
                const idCardLast = isX ? 'X' : parseInt(str.slice(-1)); // 获取最后一位身份证号码

                if(idCardMod === 2) valid = idCardLast.toUpperCase() === "X"; // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                else valid = idCardCheckDigit[idCardMod] === idCardLast; // 用计算出的校验码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
            }
        }
        return valid;
    },

    /* 银行卡号验证 规则：Luhn算法 */
    bankNumberLuhn(str) {
        const numFirst = str.substr(0, str.length - 1); // 前15或18位
        let numFirstDescArr = new Array(), // 前15或18位倒序存进数组
            arrOddLess = new Array(), // 奇数位*2的积<9
            arrOddLessSum = 0, // 奇数位*2<9的数组之和
            arrOddGreater = new Array(), // 奇数位*2的积>9
            arrOddGreaterSingle = new Array(), // 奇数位*2>9的分割之后的数组个位数
            arrOddGreaterSingleSum = 0, //奇数位*2>9的分割之后的数组个位数之和
            arrOddGreaterTens = new Array(), // 奇数位*2>9的分割之后的数组十位数
            arrOddGreaterTensSum = 0, // 奇数位*2>9的分割之后的数组十位数之和
            arrEven = new Array(), // 偶数位数组
            arrEvenSum = 0, // 偶数位数组之和
            sumTotal = 0, // 总和
            luhn = 0; // Luhn值

        for(let i = numFirst.length - 1; i > -1; i--) numFirstDescArr.push(numFirst.substr(i, 1));

        for(let j = 0; j < numFirstDescArr.length; j++) {
            if((j + 1) % 2 === 1) { // 奇数位
                if(numFirstDescArr[j] * 2 < 9) arrOddLess.push(parseInt(numFirstDescArr[j] * 2));
                else arrOddGreater.push(parseInt(numFirstDescArr[j] * 2));
            } else { // 偶数位
                arrEven.push(parseInt(numFirstDescArr[j]));
            }
        }

        for(let h = 0; h < arrOddGreater.length; h++) {
            arrOddGreaterSingle.push(parseInt(arrOddGreater[h] % 10));
            arrOddGreaterTens.push(parseInt(arrOddGreater[h] / 10));
        }

        for(let x = 0; x < arrOddLess.length; x++) arrOddLessSum += arrOddLess[x];

        for(let y = 0; y < arrEven.length; y++) arrEvenSum += arrEven[y];

        for(let e = 0; e < arrOddGreaterSingle.length; e++) {
            arrOddGreaterSingleSum += arrOddGreaterSingle[e];
            arrOddGreaterTensSum += arrOddGreaterTens[e];
        }

        sumTotal = arrOddLessSum + arrEvenSum + arrOddGreaterSingleSum + arrOddGreaterTensSum;
        luhn = 10 - (sumTotal % 10 === 0 ? 10 : sumTotal % 10);

        return parseInt(str.last()) === luhn;
    }
}
