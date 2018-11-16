<!--
    @component 弹出窗遮罩
    @props
        visible (Boolean)是否显示，默认false
        center (Boolean)内容区域水平垂直居中，自适应宽高，默认false
        zIndex (String|Number)遮罩层的元素层级，默认4999
        padding (String|Number)遮罩内边距，与css padding取值方式相同，默认0
        disTransition (Boolean)禁用过渡动画，默认false
        background (String)遮罩层背景，默认rgba(0,0,0,.55)
        transition (String)自定义transition动画名称
        flex (String)popup外层是否启用display:flex（仅在非center有效，传参使用align样式）
        msgbox (Boolean)带标题头的底部弹出窗
    @slots
        * 弹出窗遮罩组件仅有一个slot，区域为弹出窗口，默认透明背景色。
    @events
        maskTrigger 点击遮罩时触发该事件
            -事件传递参数
                event (Object)touchstart事件对象
    @author Chuck.迟海
    @date 2018-6-22
-->
<template>
    <transition :name="disTransition?'':transition">
        <div class="base-popup" :style="{zIndex}" v-show="visible">
            <div class="bg" :style="{background}"></div>
            <div ref="popupContent" class="content" :class="flex" :style="{padding:center?0:paddingREM}">
                <div class="box" :style="{padding:paddingREM}" v-if="center"><slot></slot></div>
                <div class="popup-fade-in-up msgbox" v-else-if="msgbox">
                    <p class="msgbox-title">
                        <slot name="title"></slot>
                        <i class="icon-close" @click="$emit('update:visible',false)"></i>
                    </p>
                    <slot></slot>
                </div>
                <slot v-else></slot>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "basePopup",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            center: {
                type: Boolean,
                default: false
            },
            zIndex: {
                type: [String, Number],
                default: 4999
            },
            padding: {
                type: [String, Number],
                default: ""
            },
            disTransition: {
                type: Boolean,
                default: false
            },
            background: {
                type: String,
                default: "rgba(0,0,0,.55)"
            },
            transition: {
                type: String,
                default: "fade"
            },
            flex: {
                type: String,
                default: ""
            },
            msgbox: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            paddingREM() {
                if(this.padding === "") {
                    return 0;
                } else if(this.padding.trimAll() === this.padding) {
                    return this.padding / 40 + "rem";
                }

                let padding = "";
                this.padding.split(" ").forEach(item => {
                    padding += " " + (item / 40 + "rem");
                });
                return padding.slice(1);
            }
        },
        watch: {
            visible(val) {
                const eventDisabled = e => {
                    e.stopPropagation();
                    if(e.target === this.$el || e.target === this.$refs.popupContent) {
                        this.$emit("maskTrigger", e);
                    }
                };

                if(val) {
                    document.body.style.overflow = "hidden";
                    this.$el.addEventListener("touchstart", eventDisabled);
                } else {
                    document.body.style.overflow = "";
                    this.$el.removeEventListener("touchstart", eventDisabled);
                }
            }
        }
    }
</script>

<style lang="less" src="*components/control/base/popup.less"/>