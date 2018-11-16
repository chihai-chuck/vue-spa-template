import Vue from "vue";

export default () => {
    Vue.directive("image", (el, binding, vNode) => {
        if(!el.classList.contains("directive-image")) {
            el.classList.add("directive-image");
            const $image = document.createElement("div");
            $image.classList.add("directive-image-item");
            $image.style.backgroundImage = `url(${binding.value})`;
            el.appendChild($image);
        } else {
            el.querySelector(".directive-image-item").style.backgroundImage = `url(${binding.value})`;
        }
    });

    Vue.directive("dis-space", (el, binding, vNode) => {
        if(!el.classList.contains("directive-dis-space")) {
            el.onkeydown = function disSpaceKeyDown(event) {
                if(!this.value.trim() && event.keyCode === 32) return false;
            };
            /*el.onpaste = function disSpacePaste() {
                setTimeout(() => {
                    this.value = this.value.trim();
                });
            };*/
            el.classList.add("directive-dis-space");
        }
    });
}