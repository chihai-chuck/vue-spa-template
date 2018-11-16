import Vue from "vue";

import {
    Picker,
    MessageBox,
    Toast,
    Indicator,
    Swipe,
    SwipeItem,
    Checklist
} from "mint-ui";

Vue.component(Picker.name, Picker);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Checklist.name, Checklist);

MessageBox.setDefaults({
    closeOnClickModal: false,
    zIndex: 6000
});

Vue.prototype.mintUI = {
    Indicator,
    Toast,
    MessageBox
};
