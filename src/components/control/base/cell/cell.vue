<template>
    <ul class="base-cell" :class="{radius,important:childrenHasImportant}">
        <slot></slot>
    </ul>
</template>

<script>
    export default {
        name: "baseCell",
        props: {
            radius: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                childrenHasImportant: false // 子项中是否有包含important=true的
            }
        },
        created() {
            this.$nextTick(() => {
                this.$children.forEach(item => {
                    if(item.important) this.childrenHasImportant = true;
                });
            });
        }
    }
</script>

<style lang="less" src="*components/control/base/cell.less" scoped/>
