<!--
    @component 复选框
    @props
        value (Boolean)复选框选中状态
        radio (Boolean)单选状态，将由外部调整value控制选中状态
    @slots
        * 复选框组件仅有一个slot，区域位于复选框图标右侧
    @author Chuck.迟海
    @date 2018-8-27
-->
<template>
    <i
        class="base-checkbox"
        :class="value?'icon-checked-circular checked':'icon-check-circular'"
        @click="change">
        <slot></slot>
    </i>
</template>

<script>
    export default {
        name: "baseCheckbox",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            radio: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            change() {
                this.$emit("change", !this.value);
                if(!this.radio) this.$emit("input", !this.value);
            }
        }
    }
</script>

<style lang="less" src="*components/control/base/checkbox.less" scoped/>
