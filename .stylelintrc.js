module.exports = {
    /*
     *processors: [
     * "@mapbox/stylelint-processor-arbitrary-tags"
     *],
     */
    extends: [
        "stylelint-config-standard"
    ],
    rules: {
        "color-no-invalid-hex": [true, {
            message: "使用的16进制色值有误，可使用3、6位或带有透明通道的8位16进制色值。"
        }],
        "indentation": [4, {
            message: "需使用4个空格缩进。"
        }],
        "declaration-empty-line-before": ["never", {
            message: "声明之间不需要有空行。"
        }],
        "selector-pseudo-element-colon-notation": ["double", {
            message: "伪对象选择符需要用两个冒号，而伪类选择符只需用一个冒号，例如a:before{}是错误的，应当使用a::before{}，因为before是伪对象选择符，而a:first-child{}则是正确的，因为first-child是伪类选择符。"
        }],
        "selector-list-comma-newline-after": ["always-multi-line", {
            message: "多个选择器使用相同声明时，应当尽量每行只有一条选择器，分割选择器的逗号写在当前行的末尾"
        }],
        "rule-empty-line-before": null,
        "no-missing-end-of-source-newline": null,
        "no-descending-specificity": null,
        "number-leading-zero": null,
        "unit-case": null,
        "at-rule-empty-line-before": null,
        "comment-empty-line-before": null,
        "declaration-block-semicolon-newline-after": null,
        "no-empty-source": null
    }
};
