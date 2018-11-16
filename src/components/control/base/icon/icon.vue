<!--
    @component 图标
    @props
        name (String)图标名称
        size (String|Number)图标大小，若传入字符串则按照带单位处理，传入数字则按照像素进行转rem，默认：1em
        color (String)图标颜色（仅在单色图标下生效）
    @author Chuck.迟海
    @date 2018-8-24
-->
<template>
    <svg class="base-icon" aria-hidden="true" :style="{fontSize:iconSize,color}">
        <use :xlink:href="`#${name}`"></use>
    </svg>
</template>

<script>
    export default {
        name: "baseIcon",
        props: {
            name: {
                type: String,
                require: true
            },
            size: {
                type: [String, Number],
                default: "1em"
            },
            color: {
                type: String
            }
        },
        computed: {
            iconSize() {
                if(typeof this.size === "number" || this.size.trimAll() === this.size) {
                    return this.size / 40 + "rem";
                } 
                return this.size;
            }
        }
    }
</script>

<style lang="less" src="*components/control/base/icon.less" scoped/>
