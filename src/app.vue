<template>
    <div class="app-wrapper">
        <Header ref="rootHeader" style="display:none;" root></Header>
        <keep-alive :include="$store.state.config.includedPage.join(',')">
            <router-view v-if="routerLifecycle"></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import "normalize.css";

    export default {
        name: "app",
        data() {
            return {
                routerLifecycle: true
            }
        },
        created() {
            const appLog = name => {
                GLOBAL.functions.log({
                    title: "app-event",
                    text: name,
                    color: "#a35eff"
                });
            };

            /* 重新获取用户信息（从服务器端拉取） */
            /*this.$eventHub.$on("userInfoRefresh", (callback, params = {}) => {
                appLog("userInfoRefresh");
                qryClerkInfo({}, params).then(res => {
                    this.$store.commit("SET_USER_INFO", res.data);

                    if(params.routerRefresh) {
                        this.$eventHub.$emit("currentPageRouterRefresh");
                    }
                    if(typeof callback === "function") callback(res.data);
                }, callback);
            });*/

            /* 重载router当前页面（不刷新页面，重跑一遍页面生命周期） */
            this.$eventHub.$on("currentPageRouterRefresh", () => {
                appLog("currentPageRouterRefresh");
                this.routerLifecycle = false;
                this.$nextTick(() => {
                    this.routerLifecycle = true;
                });
            });

            if(GLOBAL.functions.cache.read("tokenLogin")) {
                this.$nextTick(() => {
                    this.$eventHub.$emit("userInfoRefresh", void 0, {
                        routerRefresh: true
                    });
                    GLOBAL.functions.cache.remove("tokenLogin");
                });
            }
        }
    }
</script>

<style lang="less" src="*/default.less"/>
<style lang="less" src="*/app.less" scoped/>
<style lang="less" src="*/index.less"/>
