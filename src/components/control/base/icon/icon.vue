<!--
    @component 图标
    @props
        name (String)图标名称
        size (String|Number)图标大小，若传入字符串则按照带单位处理，传入数字则按照像素进行转rem，默认：1em
        color (String)图标颜色（仅在单色图标下生效）
        single (Boolean)单色模式，将不会使用svg显示图标，这时可以传入一个slot
        center (Boolean)是否将图标内容居中（这可能会导致图标与周围文本无法在同一行显示）
    @author Chuck.迟海
    @date 2018-8-24
    @update
        2018-11-30  增加single参数，以扩展让单色图标可以带slot.  by迟海
-->
<template>
    <i class="base-icon single" :class="[name,{center}]" :style="{fontSize,color}" v-if="single"></i>
    <svg class="base-icon multiple" aria-hidden="true" :style="{fontSize,color}" v-else>
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
            },
            single: {
                type: Boolean,
                default: false
            },
            center: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            fontSize() {
                if(typeof this.size === "number" || this.size.trimAll() === this.size) {
                    return this.size / 40 + "rem";
                }
                return this.size;
            }
        }
    }
</script>

<style lang="less" src="*components/control/base/icon.less" scoped/>
