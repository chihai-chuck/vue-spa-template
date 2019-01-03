import Header from "./header.vue";

Header.back = () => {
    vueObj.$root.$children[0].$refs.rootHeader.back();
};
Header.close = () => {
    vueObj.$root.$children[0].$refs.rootHeader.close();
};

export default Header;
