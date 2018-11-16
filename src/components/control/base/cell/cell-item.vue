<!--
    @component 列表栏
    @props
        nextIcon  (Boolean)是否显示右边icon，默认false
        next (String|Object)在点击时触发路由跳转，并且会默认显示nextIcon
        icon (String)列表图标
        iconColor (String)列表图标颜色
        title (String)列表标题
        color (String)列表标题文字颜色
        textColor (String)列表文本内容文字颜色
        spacing (Boolean)是否在底部增加20px的margin间距
        notSplitLine (Boolean)是否显示分割线
        background (String)列表自定义背景
        styles (Object)额外设置的css样式
    @slot
        列表文本内容
        custom 自定义列表内容
    @author Chuck.迟海
    @date 2018-8-25
-->
<template>
    <li @click="active"
        class="align-v-center"
        :class="{spacing,'not-line':notSplitLine,arrow:next||nextIcon}"
        :style="styleMerge({background},styles)">
        <div class="wrapper">
            <Icon class="icon" :name="icon" :color="iconColor" v-if="icon"></Icon>
            <span class="title" :style="{color}" v-if="title">{{title}}</span>
        </div>
        <slot name="custom"></slot>
        <p class="text" :style="{color:textColor}" v-if="$slots.default"><slot></slot></p>
    </li>
</template>

<script>
    export default {
        name: "baseCellItem",
        props: {
            nextIcon: {
                type: Boolean,
                default: false
            },
            next: {
                type: [String, Object]
            },
            icon: {
                type: String,
                default: ""
            },
            iconColor: {
                type: String,
                default: ""
            },
            title: {
                type: String,
                default: ""
            },
            color: {
                type: String,
                default: ""
            },
            textColor: {
                type: String,
                default: ""
            },
            spacing: {
                type: Boolean,
                default: false
            },
            notSplitLine: {
                type: Boolean,
                default: false
            },
            background: {
                type: String,
                default: ""
            },
            styles: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        methods: {
            styleMerge(obj, arr) {
                return [obj, ...[arr || []]];
            },
            active() {
                if(this.next) this.$router.push(this.next);
                else this.$emit("click");
            }
        }
    }
</script>

<style lang="less" src="*components/control/base/cell-item.less"/>