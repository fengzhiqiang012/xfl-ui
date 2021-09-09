module.exports = {
    theme: '',
    title: 'xfl',
    description: 'xfl',

    base: '/',
    port: '8080',

    themeConfig: { // 新增代码
        search: false,
        nav: [ // 配置顶部导航栏
            {
                text: '首页1',
                link: '/'
            },
            {
                text: '组件',
                link: '/component/'
            }
        ],
        sidebar: { // 配置侧边栏部分
            '/component/': ['/component/', '/component/button.md']
        }
    },
    head: [],
    plugins: ['demo-container'], // 配置插件
    markdown: {}
}
