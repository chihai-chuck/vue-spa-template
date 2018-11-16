export default {
    /* 接收通讯录 */
    toH5Contacts(arr) {
        vueObj.$eventHub.$emit("getContactsCallback", arr[0]);
    },
    /* 接收压缩后图片用于回显 */
    getCameraResult(arr) {
        vueObj.$eventHub.$emit("getCameraCallback", arr[0]);
    }
}