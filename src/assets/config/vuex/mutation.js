const typeNames = {
    "SET_APPLICATION_VERSION": "存储APP版本号",
    "SET_APPLICATION_DEVICE": "存储APP设备类型",
    "SET_CONTROLS_SCROLL_POSITION": "存储Scroll滚动位置",
    "SET_CONTROLS_HEADER_STATUS_BAR_HEIGHT": "存储Header组件状态栏高度",
    "SET_USER_ACCOUNT": "存储用户账号信息",
    "SET_USER_INFO": "存储用户个人信息",
    "SET_USER_ADDRESS": "存储用户个人收货信息",
    "SET_USER_ADDRESS_ORIGIN": "存储原始的数组格式用户个人收货信息",
    "SET_USER_ADDRESS_INDEX": "设置当前使用的收货信息",
    "UPDATE_USER_INFO": "更新某一项用户个人信息",
    "SET_USER_LOGIN_NAME": "存储最后一次用户登录名"
};

const typeNamesFilter = [
    "SET_CONTROLS_SCROLL_POSITION"
];

export {
    typeNames,
    typeNamesFilter
}