export default {
    /**
     * @program 取256色值渐变（步长）
     * @method GLOBAL.draw.colorGradient(colorStart, colorEnd, progress)
     * @return (String) 计算后的256色值，例：221,221,221
     * @parameter
     *     colorStart(Array) 起始256色值，数组格式，例：[255,255,255]
     *     colorEnd(Array) 结束256色值，数组格式，例：[112,112,112]
     *     progress(Number) 进度（步长），取值0-1，例如：0.68
     * @example GLOBAL.draw.colorGradient([255,255,255], [51,51,51], .72);
     * @author Chuck.迟海
     * @date 2018-3-16
     */
    colorGradient(colorStart, colorEnd, progress){
        const colorArr = [];
        let step = progress;
        if(step < 0) step = 0;
        else if(step > 1) step = 1;

        colorStart.forEach((color, index) => {
            const sColor = +color.toString().trimAll();
            const eColor = +colorEnd[index].toString().trimAll();
            colorArr.push(Math.round(sColor + (eColor - sColor) * step));
        });

        return colorArr.join(",");
    }
}
