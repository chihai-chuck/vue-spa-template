<!--
    @component 标题栏
    @props
        showBack (Boolean)是否显示返回按钮，默认true
        backActive (Function)点击默认返回按钮时触发的事件（会覆盖默认返回事件）
        showClose (Boolean)是否显示关闭按钮，默认false
        closeActive (Function)点击默认关闭按钮时触发的事件（会覆盖默认关闭事件）
        position (String)自定义css position，默认"fixed"
        background (String)自定义标题栏背景色，例如传入"transparent"可使标题栏背景透明（若scrollFadeBg参数为true时，background参数只有传入256色值才会生效，例：255,211,45）
        color (String)自定义标题栏文字、icon图标颜色
        fade (Array|String)滚动渐变类型，多种类型按数组传入（字符串传入不支持带参数），（所有模式有需要参入额外参数值的通过数组方式第二个值传入，例["base", ["color", "51,51,51"]]），类型可选值：base、color、slot、slotColor、background、colorGradient
            base 标题栏是否根据页面滚动位置渐现渐隐
            color 颜色是否根据页面滚动位置渐变，将由全透明向传入色值渐变
                参数：
                    (String) 渐变色值
            slot slot区域是否根据页面滚动位置渐现渐隐
            slotColor slot区域颜色是否根据页面滚动位置渐变，将由全透明向传入色值渐变
                参数：
                    (String) 渐变色值
            background 标题栏背景色是否根据页面滚动位置渐变，将由全透明向传入色值渐变
            colorGradient 颜色是否根据页面滚动位置渐变，将由color参数值向传入色值渐变
                参数：
                    {
                        start: (String)渐变开始色值
                        end: (String)渐变结束色值
                    }
        scrollObj (Object)若开启了scrollFade，则需传入该值，例如是使用scroll组件控制页面滚动，则需要传入scroll的元素DOM对象，如果需要监听document.body滚动，则直接传入字符串"body"
        icon (Array)左侧图标数组（左侧的返回图标及关闭按钮是通过showBack和showClose控制，建议最多显示两个图标）
        iconSub (Array)右侧图标数组（建议最多显示两个图标）
            -图标数组参数
                icon (String)图标class名，所有的图标都使用iconfont，可空
                caption (String)显示的文字，可空
                style (Object)对图标额外设置的css样式，可空
                active (Function)图标被点击时触发的事件，可空，会传递标准event当前事件对象
                render (Function)图标内容render函数，支持自定义图标内容（不包含图标自身）
        iconCover (Boolean)是否在icon图标后加圆形半透明黑色遮罩，默认false
        root (Boolean)内部属性，不允许传值，用于识别是否在root对象中，以供实现$Header.back()、$Header.close()功能
        mode (String)定制模式，使用定制模式时，不建议使用其他参数，很多参数将变得不可用或出现错误，目前可选值default(默认模式)、search(搜索框模式)，默认default
            -search （搜索框模式）options参数
                placeholder (String)搜索文本输入框默认提示文字
                maxlength (Stirng,Number)搜索文本输入框字数限制
                active (Function)搜索事件触发（用户按下回车或手机输入法中'搜索'相关响应按键，该事件不会传递输入的搜索内容，输入的搜索内容需要通过v-model绑定获取）
        options (Object)定制模式参数，定制模式的参数都通过options传入，参数根据不同模式区分
        value (String)文本内容绑定，不同模式均使用value传递v-model绑定的内容
    @slots
        * 标题栏组件仅有一个slot，区域布满整个标题栏，默认内容垂直水平居中，页面标题文字需使用slot传入
    @events
        scroll 开启fade功能后，页面滚动时会触发该事件
            -事件传递参数
                event (Object)滚动事件对象
                scrollTop (Number)当前滚动X轴top位置
    @global methods
        $vm.baseUI.$Header.back() 返回上一页
        $vm.baseUI.$Header.close() 返回首页
    @author Chuck.迟海
    @date 2017-12-25
    @update
        * 2017-12-29 优化scrollObj的取值和监听，防止页面初始化时一次性捕获不到scroll组件的滚动事件。by迟海
        * 2018-1-5 增加自动适应IOS状态栏间距
        * 2018-1-8 增加对IOS老版本（1.1.4）以下版本顶部20px状态栏的兼容。 by-luops
                   user界面头像被挡住，无法点击，增加透明度大于0.2以上才显示导航。 by-luops
        * 2018-1-11 增加全局调用方法，$vm.baseUI.$Header.back()、$vm.baseUI.$Header.close()  by迟海
        * 2018-1-30 新增定制模式，添加search(搜索框)模式  by迟海
        * 2018-3-15 新增scrollFadeBg参数，实现背景色的渐现效果。  by迟海
                    新增scroll事件，在开启scrollFade后，页面滚动会触发该事件。  by迟海
                    新增color参数，自定义文字、icon图标颜色。 by迟海
        * 2018-3-16 新增scrollFadeColor参数，实现开启scrollFade功能后，支持自定义文字、icon图标颜色的渐变。 by迟海
        * 2018-4-17 新增iconCover参数，用于设置icon图标是否显示黑色半透明圆形背景遮罩层。 by迟海
        * 2018-6-25 新增图标icon、iconSub的render函数。 by迟海
        * 2018-7-20 新增colorFade、slotFade、slotColorFade参数，用以控制新的滚动渐变方式。 by迟海
        * 2018-7-27 整合所有滚动渐变参数到fade，所有渐变方式及配置都通过fade参数传入。 by迟海
-->
<template>
    <div class="base-header" :class="{'pointer-none':config.opacity<.2&&!fadeMode.background}" v-if="!root">
        <p class="status-bar" :style="styleMerge({position,height:statusBar},scrollFadeOpacity)"></p>
        <p class="status-bar-distance" :style="{height:statusBar}" v-if="position==='fixed'||position==='absolute'"></p>
        <div class="header" :style="styleMerge({position,top:position==='fixed'||position==='absolute'?statusBar:'auto',color:fontColor},scrollFadeOpacity)">
            <template v-if="iconLeft.length">
                <i class="icon align-center"
                   v-for="(ic,index) in iconLeft"
                   :key="index"
                   :class="[ic.icon||'',{caption:!ic.icon},{'just-icon':!ic.caption},{'icon-cover':config.icon.cover}]"
                   :style="styleMerge({left:index*2.5+'rem'},ic.style)"
                   @click="ic.active">
                    {{ic.caption}}
                    <header-icon-expand :render="ic.render" v-if="ic.render"></header-icon-expand>
                </i>
            </template>
            <div class="content align-center">
                <div :style="slotStyles" v-if="!mode||mode==='default'">
                    <slot></slot>
                </div>
                <div class="partial" :style="{paddingLeft:showBack?'2.25rem':'0'}" v-else>
                    <div class="search-box" v-if="mode==='search'">
                        <div class="search-content">
                            <i class="align-center icon-sousuo"></i>
                            <input type="search"
                                   :placeholder="options.placeholder"
                                   :maxlength="options.maxlength"
                                   :value="value"
                                   @input="$emit('input',$event.target.value.trim())"
                                   @keypress.13="options.active">
                            <button @click="options.active">搜索</button>
                        </div>
                    </div>
                </div>
            </div>
            <template v-if="iconSub.length">
                <i class="icon align-center"
                   v-for="(ics,index) in iconSub"
                   :key="index"
                   :class="[ics.icon||'',{caption:!ics.icon},{'just-icon':!ics.caption},{'icon-cover':config.icon.cover}]"
                   :style="styleMerge({right:index*2.5+'rem'},ics.style)"
                   @click="ics.active">
                    {{ics.caption}}
                    <header-icon-expand :render="ics.render" v-if="ics.render"></header-icon-expand>
                </i>
            </template>
        </div>
        <p class="distance" v-if="position==='fixed'||position==='absolute'"></p>
    </div>
</template>

<script>
    export default {
        name: "baseHeader",
        props: {
            showBack: {
                type: Boolean,
                default: true
            },
            backActive: {
                type: Function,
                default: void 0
            },
            showClose: {
                type: Boolean,
                default: false
            },
            closeActive: {
                type: Function,
                default: void 0
            },
            address: {
                type: String,
                default: ''
            },
            position: {
                type: String,
                default: "fixed",
                validator: val => ["static", "relative", "absolute", "fixed", "center", "page", "sticky"].includes(val)
            },
            color: {
                type: String
            },
            background: {
                type: String,
                default: ""
            },
            fade: {
                type: [Array, String],
                default: ""
            },
            scrollObj: {
                type: [Object, HTMLElement, String, void 0],
                default: void 0
            },
            icon: {
                type: Array,
                default: () => []
            },
            iconSub: {
                type: Array,
                default: () => []
            },
            iconCover: {
                type: Boolean,
                default: false
            },
            root: {
                type: Boolean,
                default: false
            },
            mode: {
                type: String,
                default: "default",
                validator: val => ["default", "search"].includes(val)
            },
            options: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            value: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                config: {
                    opacity: 1,
                    color: "",
                    colorStar: "",
                    colorEnd: "",
                    background: "",
                    icon: {
                        cover: false
                    },
                    fadeModeList: [
                        "base",
                        "color",
                        "slot",
                        "slotColor",
                        "background",
                        "colorGradient"
                    ]
                }
            }
        },
        computed: {
            scrollDOM() {
                return this.scrollObj ? this.scrollObj === "body" ? document : this.scrollObj.$el || this.scrollObj : void 0
            },
            iconLeft() {
                const iconList = [];
                if(this.showBack) {
                    iconList.push({
                        icon: "icon-arrow-left",
                        active: this.backActive ? this.backActive : this.back
                    });
                }
                if(this.showClose) {
                    iconList.push({
                        caption: "关闭",
                        style: {
                            zIndex: 10,
                            left: "1.625rem",
                            width: "3em"
                        },
                        active: this.closeActive ? this.closeActive : this.close
                    });
                }
                return [
                    ...iconList,
                    ...this.icon
                ];
            },
            statusBar() {
                return `${this.$store.state.controls.header.statusBarHeight}px`;
            },
            scrollFadeOpacity() {
                return this.fadeMode.background ? {
                    background: `rgba(${this.config.background},${this.config.opacity}) !important`
                } : Object.assign({}, {
                    opacity: this.config.opacity
                }, this.config.background ? {
                    background: `${this.config.background} !important`
                } : {});
            },
            fontColor() {
                return this.fadeMode.color ? `rgba(${this.fadeMode.color},${this.config.opacity}) !important` : `rgb(${this.config.color}) !important`;
            },
            slotStyles() {
                return {
                    opacity: this.fadeMode.slot ? this.config.opacity : 1,
                    color: this.fadeMode.slotColor ? `rgba(${this.fadeMode.slotColor},${this.config.opacity})` : ""
                }
            },
            fadeMode() {
                if(typeof this.fade === "string") {
                    return this.config.fadeModeList.includes(this.fade) ? {
                        [this.fade]: {}
                    } : {};
                } else if(this.fade instanceof Array) {
                    let temp = {};
                    for(let item of this.fade) {
                        if(typeof item === "string") {
                            if(this.config.fadeModeList.includes(item)) temp[item] = {};
                        } else {
                            if(this.config.fadeModeList.includes(item[0])) temp[item[0]] = item[1];
                        }
                    }
                    return temp;
                }
                return {};
            }
        },
        watch: {
            scrollDOM(val) {
                if(val) this.setScrollFade();
            }
        },
        components: {
            headerIconExpand: {
                name: "headerIconExpand",
                functional: true,
                props: {
                    render: {
                        type: Function,
                        default: void 0
                    }
                },
                render: (h, ctx) => ctx.props.render(h, ctx.props)
            }
        },
        mounted() {
            this.config.background = this.background || this.$store.state.theme.skin.options[this.$store.state.theme.skin.index].color.main.rgb;
            this.config.color = this.color;
            this.config.icon.cover = this.iconCover;
            this.setScrollFade();
        },
        activated() {
            if(this.scrollDOM) {
                this.setScrollFade();
                this.scrollEvent();
            }
        },
        methods: {
            scrollEvent(event) {
                let scrollTop = this.scrollDOM.scrollTop;
                if(this.scrollObj === "body") scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                const scrollOpacity = scrollTop / 130;
                if(scrollOpacity >= 0 && this.config.opacity <= 1 || scrollOpacity <= 1.1 && this.config.opacity >= 0) {
                    this.config.opacity = scrollOpacity;
                    if(this.fadeMode.colorGradient && this.fadeMode.colorGradient.start) {
                        this.config.color = GLOBAL.draw.colorGradient(this.config.colorStart, this.config.colorEnd, scrollOpacity);
                        this.config.icon.cover = this.iconCover ? this.config.opacity < .2 : false;
                    }
                }
                this.$emit("scroll", event, scrollTop);
            },
            setScrollFade() {
                if(this.scrollDOM === void 0) return;
                if(this.fadeMode.colorGradient && this.fadeMode.colorGradient.start) {
                    this.config.colorStart = this.fadeMode.colorGradient.start.split(",");
                    this.config.colorEnd = this.fadeMode.colorGradient.end.split(",");
                }

                if(Object.keys(this.fadeMode).length) {
                    this.scrollEvent();
                    this.scrollDOM.addEventListener("scroll", this.scrollEvent, false);
                } else {
                    this.config.opacity = 1;
                    this.scrollDOM.removeEventListener("scroll", this.scrollEvent, false);
                }
            },
            styleMerge(obj, arr) {
                return [obj, ...[arr || []]];
            },
            back() {
                //返回按钮是否需要触发appToBack
                let shouldAppToBack = this.$store.state.controls.header.appToBackListFull.includes(this.$route.path);
                if(this.$store.getters.appRuntime) {
                    if(!shouldAppToBack) {
                        const appToBackList = this.$store.state.controls.header.appToBackList;
                        const indexOfMultiple = (str, matchArr) => {
                            for(let i of matchArr) {
                                if(str.indexOf(i) === 0) return i;
                            }
                            return false;
                        };
                        if(indexOfMultiple(this.$route.path, appToBackList)) {
                            shouldAppToBack = true;
                        }
                    }
                }
                if(this.$store.getters.appRuntime && shouldAppToBack) {
                    GLOBAL.application.returnHome();
                } else {
                    if(this.showClose) {
                        this.$router.back();
                    } else {
                        if(this.address) this.$router.replace(this.address);
                        else this.$router.back();
                    }
                }
            },
            close() {
                if(this.$store.getters.appRuntime) {
                    GLOBAL.application.appOnlyReturnHome();
                } else {
                    if(this.address) this.$router.push(this.address);
                }
            }
        }
    }
</script>

<style lang="less" src="*components/control/base/header.less" scoped/>
