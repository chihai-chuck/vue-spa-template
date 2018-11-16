<!-- 
    @component Button
    @props
        属性       说明                           类型       默认
        long      按钮长度100%                   Boolean    false
        disabled  按钮设置为禁用                  Boolean    false
        loading   设置按钮为加载中状态	         Boolean    false
        background   按钮背景颜色会覆盖type颜色        String      -
        color     按钮字体颜色                    String      #fff
        icon      icon图标                       String    -
        width     自定义按钮宽度                  String|Number  undefined
        height    自定义按钮高度                  String|Number  undefined
        center    按钮是否水平居中                 Boolean    false
    @author KYUUTA
    @date 2017-12-27
-->
<template>
    <button :type="htmlType"
            :class="classes"
            :style="styleObject"
            :disabled="disabled"
            @click="handleClick">
        <Loading size="small" :color="color" v-if="loading"></Loading>
        <i :class="icon"><em><slot></slot></em></i>
    </button>
</template>

<script>
    export default {
        name: 'baseButton',
        props: {
            htmlType: {
                type: String,
                default: 'button',
                validator: val => ['button', 'submit', 'reset'].includes(val)
            },
            type: {
                type: String,
                default: "primary",
                validator: val => ["default", "primary"].includes(val)
            },
            loading: Boolean,
            disabled: Boolean,
            background: String,
            color: {
                type: String
            },
            icon: {
                type: String
            },
            long: {
                type: Boolean,
                default: false
            },
            center: {
                type: Boolean,
                default: false
            },
            width: {
                type: [String, Number],
                default: void 0
            },
            height: {
                type: [String, Number],
                default: void 0
            }
        },
        computed: {
            classes() {
                return [
                    'base-button',
                    `type-${this.type}`,
                    {
                        long: this.long,
                        disabled: this.disabled,
                        center: this.center
                    }
                ];
            },
            styleObject() {
                const width = this.width === void 0 ? void 0
                    : this.width.toString() === parseInt(this.width).toString() ? `${this.width/40}rem` : this.width,

                    height = this.height === void 0 ? void 0
                    : this.height.toString() === parseInt(this.height).toString() ? `${this.height/40}rem` : this.height;

                return Object.assign({}, {
                    background: this.background,
                    color: this.color
                }, {
                    width,
                    height
                });
            }
        },
        methods: {
            handleClick(evt) {
                if(this.disabled || this.loading) return;
                this.$emit('click', evt);
            }
        }
    }
</script>

<style lang="less" src="*components/control/base/button.less" scoped/>