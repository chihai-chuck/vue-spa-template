<template>
    <div class="test-box" id="box">
        <Header>功能调试</Header>

    </div>
</template>

<script>
    export default {
        name: "pageTest",
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="less" scoped>
    .test-box {
        .gradient(#2a6bc2, #183965);
        position: relative;
        width: 100%;
        height: 100%;
    }

    p {
        width: 100%;
        height: 50px;
    }
</style>
