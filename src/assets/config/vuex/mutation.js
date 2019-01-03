const typeNames = {
    "NATIVE_VERSION_SET": "存储APP版本号",
    "NATIVE_DEVICE_SET": "存储APP设备类型",
    "CONTROLS_SCROLL_POSITION_SET": "存储Scroll滚动位置",
    "CONTROLS_HEADER_STATUS_BAR_HEIGHT_SET": "存储Header组件状态栏高度",
    "USER_ACCOUNT_SET": "存储用户账号信息",
    "USER_ACCOUNT_UPDATE": "更新用户账号信息",
    "USER_INFO_SET": "存储用户个人信息",
    "USER_INFO_UPDATE": "更新某一项用户个人信息",
    "USER_ADDRESS_SET": "存储用户个人收货信息",
    "USER_ADDRESS_ORIGIN_SET": "存储原始的数组格式用户个人收货信息",
    "USER_ADDRESS_INDEX_SET": "设置当前使用的收货信息",
    "USER_LOGOUT": "用户退出登录用户相关数据初始化"
};

const typeNamesFilter = [
    "CONTROLS_SCROLL_POSITION_SET"
];

export {
    typeNames,
    typeNamesFilter
}
