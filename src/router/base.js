const pageTest = () => import("%/test"); // 功能调试页面

const developmentRouters = process.env.NODE_ENV === "development" ?
    [
        {
            path: "/test",
            component: pageTest
        }
    ] :
    [];

export default [
    ...developmentRouters
]
