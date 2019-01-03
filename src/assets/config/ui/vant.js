import Vue from "vue";
import {
    Dialog,
    Toast,
    Picker,
    DatetimePicker,
    Swipe,
    SwipeItem,
    Lazyload,
    Steps,
    Step,
    Radio,
    RadioGroup
} from "vant";
import CityPicker from "@/control/vant/city-picker";

const components = {
    Dialog,
    Toast,
    Picker,
    DatetimePicker,
    Swipe,
    SwipeItem,
    Lazyload,
    Steps,
    Step,
    Radio,
    RadioGroup
};

Object.keys(components).forEach(key => {
    Vue.use(components[key]);
});
Vue.component("CityPicker", CityPicker);

Dialog.setDefaultOptions({
    title: "提示",
    zIndex: 6000
});
Toast.setDefaultOptions({
    zIndex: 6100
});
Toast.allowMultiple();