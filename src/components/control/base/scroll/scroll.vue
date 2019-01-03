<template>
    <div class="base-scroll"
         :class="[{touch:touching},{'touch-scrolling': !disScrolling}]"
         @touchstart="touchStart"
         @touchmove="touchMove"
         @touchend="touchEnd"
         @scroll="onScroll">
        <section class="inner" :style="{top:(top-offsetPullRefreshHeight)+'px'}">
            <header class="align-center pull-refresh">
                <slot name="pull-refresh">
                    <span class="tip-text"><i :class="[{'icon-line-arrow-bottom':state===0||state===1},{top:state===1}]"></i>{{["下拉更新","松开更新","更新中......"][state]}}</span>
                </slot>
            </header>
            <slot></slot>
            <footer class="align-center load-more" v-show="!scrollFooterHidden">
                <slot name="load-more">
                    <span :class="{'no-more':pageEnd}">{{pageEnd?'沒有更多数据':'加载中......'}}</span>
                </slot>
            </footer>
        </section>
    </div>
</template>

<script>
    export default {
        name: "baseScroll",
        props: {
            enableInfinite: {
                type: Boolean,
                default: true
            },
            enableRefresh: {
                type: Boolean,
                default: true
            },
            onRefresh: {
                type: Function,
                default: void 0
            },
            onInfinite: {
                type: Function,
                default: void 0
            },
            pageEnd: {
                type: Boolean,
                default: false
            },
            scrollFooterHidden: {
                type: Boolean,
                default: false
            },
            disScrolling: {
                type: Boolean,
                default: false
            },
            refreshScrollBack: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                top: 0,
                state: 0,
                startY: 0,
                touchScroll: false,
                touching: false,
                infiniteLoading: false,
                offsetPullRefreshHeight: 43,
                refreshScrollHeight: 0
            }
        },
        mounted() {
            this.offsetPullRefreshHeight = parseFloat(this.$el.querySelector(".pull-refresh").getStyle("height"));
        },
        activated() {
            const position = this.$store.getters.controlsScrollPosition;
            if(position.x !== 0 || position.y !== 0) {
                this.$el.scrollLeft = position.x;
                this.$el.scrollTop = position.y;
                this.$store.commit("CONTROLS_SCROLL_POSITION_SET", {});
            }

            this.offsetPullRefreshHeight = parseFloat(this.$el.querySelector(".pull-refresh").getStyle("height"));
        },
        methods: {
            touchStart(e) {
                this.startY = e.targetTouches[0].pageY;
                this.startScroll = this.$el.scrollTop || 0;
                this.touching = true;
                this.touchScroll = true;
            },
            touchMove(e) {
                if(!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) return;
                const diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
                if(diff > 0) e.preventDefault();
                this.top = (Math.pow(diff, 0.8)||0) + (this.state === 2 ? this.offsetPullRefreshHeight : 0);
                if(this.state === 2) return; // in refreshing
                if(this.top >= this.offsetPullRefreshHeight) this.state = 1;
                else this.state = 0;
            },
            touchEnd() {
                if(!this.enableRefresh) return;
                this.touching = false;
                this.setScrollTop();
                if(this.state === 2) { // in refreshing
                    this.state = 2;
                    this.top = this.offsetPullRefreshHeight;
                    return;
                }
                if(this.top >= this.offsetPullRefreshHeight) { // do refresh
                    this.refresh();
                } else { // cancel refresh
                    this.state = 0;
                    this.top = 0;
                }
            },
            refresh() {
                this.state = 2;
                this.top = this.offsetPullRefreshHeight;
                if(this.refreshScrollBack) this.refreshScrollHeight = this.$el.scrollHeight;
                this.onRefresh(this.refreshDone);
            },
            refreshDone() {
                this.top = 0;
                setTimeout(() => {
                    this.state = 0;
                    if(this.refreshScrollBack) this.$el.scrollTop = this.$el.scrollHeight - this.refreshScrollHeight;
                }, 300)
            },
            infinite() {
                this.infiniteLoading = true;
                this.onInfinite(this.infiniteDone, this.touchScroll);
                this.touchScroll = false;
            },
            infiniteDone() {
                this.infiniteLoading = false;
            },
            onScroll() {
                if(!this.enableInfinite || !this.onInfinite || this.infiniteLoading) return;
                this.setScrollTop();
                const ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0;
                const bottom = this.$el.querySelector('.inner').clientHeight - this.$el.clientHeight - this.$el.scrollTop - ptrHeight;
                if(bottom < this.$el.querySelector('.load-more').clientHeight && !this.pageEnd) this.infinite();
                this.$emit('scrolling', this.$el)
            },
            setScrollTop() {
                if(this.$store.state.config.includedPage.includes(this.$parent.$options.name) || this.$store.state.controls.scroll.positionInclude.includes(this.$parent.$options.name)) {
                    this.$store.commit("CONTROLS_SCROLL_POSITION_SET", {
                        x: this.$el.scrollLeft,
                        y: this.$el.scrollTop
                    });
                }
            },
            toScrollTop() {
                this.$el.scrollTop = 0;
            }
        }
    }
</script>

<style lang="less" src="*components/control/base/scroll.less" scoped/>
