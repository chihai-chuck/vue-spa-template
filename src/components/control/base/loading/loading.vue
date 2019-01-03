<!--
    @component 加载框
    @props
        fix (Boolean)是否居中固定，需要父级元素的position是relative或absolute
        color (String)加载图标颜色（仅对默认样式有效，若使用slot或render自定义的，颜色需要自行额外设置）
        size (String)默认样式加载图标的大小，可用取值large、small（仅对默认样式有效）
        fullScreen (Boolean)是否全屏显示（不建议在使用中通过props主动设定该参数，若需要整页显示加载状态，可通过this.baseUI.Loading.show()调用）
        center (Boolean)内容居中
    @slots
        * 自定义加载样式（如果传入slot，默认样式将被覆盖）
    @global methods
        $vm.baseUI.Loading.show() 显示全屏整页加载状态
            - 参数
                render (Function) 通过render函数渲染自定义加载样式
        $vm.baseUI.Loading.hide() 隐藏全屏整页加载状态
    @author Chuck.迟海
    @date 2018-1-10
-->
<template>
    <transition :name="init?'initFade':'fade'">
        <div class="base-loading" :class="[{fix},{'align-center':center}]" :style="{background,display:center?'flex':'inline-block'}" v-if="modeVisible">
            <div class="custom" v-if="$slots.default">
                <slot></slot>
            </div>
            <div class="spin" :class="size" :style="{color}" v-else>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "baseLoading",
        props: {
            fix: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: "default",
                validator: val => ["default", "large", "small"].includes(val)
            },
            color: {
                type: String,
                default: "#000"
            },
            fullScreen: {
                type: Boolean,
                default: false
            },
            init: {
                type: Boolean,
                default: false
            },
            background: {
                type: String,
                default: "transparent"
            },
            center: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visible: false
            }
        },
        computed: {
            modeVisible() {
                return this.fullScreen ? this.visible : true;
            }
        }
    }
</script>

<style lang="less" src="*components/control/base/loading.less" scoped/>
