import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '栈外笔记',
  titleTemplate: ':title · 栈外笔记',
  description: '记录系统、编程与人工智能，也记录技术栈之外的思考。',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#0f766e' }],
    ['meta', { name: 'author', content: '栈外笔记' }]
  ],

  themeConfig: {
    siteTitle: '栈外笔记',

    nav: [
      { text: '首页', link: '/' },
      { text: '系统', link: '/system' },
      { text: '编程', link: '/code' },
      { text: '人工智能', link: '/ai' }
    ],

    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            tokenize: (text) =>
              text.toLowerCase().match(/[\u3400-\u9fff]|[a-z0-9]+/g) ?? []
          },
          searchOptions: {
            combineWith: 'AND'
          }
        },
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文章'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到相关内容',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '向上',
              navigateDownKeyAriaLabel: '向下',
              closeText: '关闭',
              closeKeyAriaLabel: '退出'
            }
          }
        }
      }
    },

    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
        forceLocale: true
      }
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    navMenuLabel: '主导航',
    mobileMenuLabel: '打开菜单',
    extraMenuLabel: '更多选项',
    skipToContentLabel: '跳到正文',

    notFound: {
      title: '页面未找到',
      quote: '这篇笔记可能尚未写下，或者已经移动。',
      linkLabel: '返回栈外笔记首页',
      linkText: '返回首页'
    },

    footer: {
      message: '技术栈之外，仍有许多问题。',
      copyright: 'Copyright © 2026 栈外笔记'
    }
  }
})
