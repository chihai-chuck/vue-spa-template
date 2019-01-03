<!--
    @list可以是一个普通的字符串数组，或者对象数组，数据格式为
        // list:['tab1','tab2','tab3'...]
        // list:[{label:'tab1',val:1...},...]
    @active 位点击触发事件
        返回值 tabtype1时，返回值位传入数组的单项，
        返回值 tabtype2时，打开下拉返回传入数组的单个元素，关闭时返回false
    @selectType 1位普通选择tab页，2位下拉选项页面
    @colorType 背景颜色样式,默认为 1 为白色，第二样式为主色调样式
    @author 罗培升
    @date 2017-12-26
    @update
        2017-12-27 active事件增加返回当前下标index参数。增加splitLine参数，控制是否显示分割线。  by:迟海
        2018-1-3   将index暴露至props，以实现通过外部控制当前选中，支持.sync双向绑定。 by迟海
        2018-3-23  增加再次点击当前项时收起。  by迟海
        2018-5-18  新增支持render函数。  by迟海
 -->
<template>
    <ul class="base-menu" :class="[{'main-bg':colorType===2,line:splitLine},`type${selectType}`,{fixed}]" :style="{top:topREM}">
        <li :class="{active:idx===selectIndex}" @click="activeSelect(idx)" v-for="(i,idx) in list" :key="idx">
            <p v-if="!i.empty">{{i.label||i}}<i v-if="+selectType===2" class="icon-arrow-bottom"></i></p>
            <menu-expand :render="i.render" :column="i" :index="idx" v-if="i.render"></menu-expand>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "baseMenu",
        props: {
            index: {
                type: Number,
                default: void 0
            },
            list: {
                type: Array,
                default: () => []
            },
            colorType: {
                type: Number,
                default: 1
            },
            selectType: {
                type: [Number, String],
                default: 1
            },
            splitLine: {
                type: Boolean,
                default: true
            },
            fixed: {
                type: Boolean,
                default: false
            },
            top: {
                type: [Number, String],
                default: 0
            }
        },
        data() {
            return {
                selectIndex: +this.selectType === 1 ? this.index : void 0
            }
        },
        computed: {
            topREM() {
                if(this.top === "") {
                    return "auto";
                } else if(this.top.toString().trimAll() === this.top) {
                    return this.top / 40 + "rem";
                }
                return this.top;
            }
        },
        components: {
            menuExpand: {
                name: "menuExpand",
                functional: true,
                props: {
                    render: {
                        type: Function,
                        default: void 0
                    },
                    column: {
                        type: Object,
                        default: null
                    },
                    index: {
                        type: [Number, String],
                        default: 0
                    }
                },
                render: (h, ctx) => ctx.props.render(h, ctx.props)
            }
        },
        watch: {
            index(val) {
                if(val !== void 0) this.selectIndex = val;
            }
        },
        methods: {
            setIndex(index) {
                if(this.index === void 0) this.selectIndex = index;
                else this.$emit("update:index", index);
            },
            activeSelect(index) {
                if(+this.selectType === 1 && index !== this.index) {
                    this.setIndex(index);
                    this.$emit('active', this.list[index], index);
                }
                if(+this.selectType === 2) {
                    if(this.selectIndex === index) {
                        this.setIndex(void 0);
                        this.$emit('active', false);
                    } else {
                        this.setIndex(index);
                        this.$emit('active', this.list[index], index);
                    }
                }
            },
            closeActive() {
                this.setIndex(void 0);
            }
        }
    }
</script>

<style lang="less" src="*components/control/base/menu.less"/>
