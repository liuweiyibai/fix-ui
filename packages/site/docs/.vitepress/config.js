import { defineConfig } from 'vitepress';
import DefineOptions from 'unplugin-vue-define-options/vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/fe-ui/' : '/',
  themeConfig: {
    siteTitle: 'fe-ui',
    nav: [
      { text: '指南', link: '/guide/index' },
      { text: '组件', link: '/components/button/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '基础',
          items: [
            {
              text: '安装',
              link: '/guide/install',
            },
          ],
        },
        // {
        //   text: '进阶',
        //   items: [
        //     {
        //       text: 'xx',
        //       link: '/xx',
        //     },
        //   ],
        // },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            {
              text: 'Button',
              link: '/components/button/',
            },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liuweiyibai/fe-ui' },
    ],
  },
  vite: {
    // 因为导入的是 workspace 的包
    // pnpm 还不支持在 workspace 中安装 本地同名网络包
    // 所以这里需要配置 DefineOptions 去提供一个宏函数
    plugins: [DefineOptions()],
  },
});
