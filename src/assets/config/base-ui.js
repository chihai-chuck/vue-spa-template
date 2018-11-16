import Vue from "vue";

import Loading from "@/control/base/loading";
import Scroll from "@/control/base/scroll";
import Popup from "@/control/base/popup";
import Header from "@/control/base/header";
import Menu from "@/control/base/menu";
import Icon from "@/control/base/icon";
import Cell from "@/control/base/cell";
import CellItem from "@/control/base/cell/cell-item";
import Checkbox from "@/control/base/checkbox";
import Button from "@/control/base/button";

const components = {
    Loading,
    Scroll,
    Popup,
    Header,
    Menu,
    Icon,
    Cell,
    CellItem,
    Checkbox,
    Button
};

Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
    Vue.component(`base-${key.toLowerCase()}`, components[key]); // 用于支持render函数中的组件名称，render函数中使用需要以base-组件名
});

Vue.prototype.baseUI = {
    $Header: Header,
    $Loading: Loading
};
