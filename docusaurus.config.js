// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const oceanicNext = require('prism-react-renderer/themes/oceanicNext')
const duotoneLight = require('prism-react-renderer/themes/duotoneLight')
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '数字生活 DigitalLife',
  tagline: '这里是陈晨的知识库，欢迎访问~',
  url: 'https://wiki.404Lab.top',
  baseUrl: '/',
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: '404Lab', // Usually your GitHub org/user name.
  projectName: "Chen's Wiki", // Usually your repo name.
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn'],
  },
  scripts:[
     {
      src: process.env.track_url,
      'data-website-id':process.env.track_id,
      async: true,
    }
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-K06FBEHD1R',
          anonymizeIP: true,
        },
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/HiChen404/MyWikiSite/tree/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        pages: {
          path: 'src/pages',
          routeBasePath: '/home',

          // ... configuration object here
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: 'L4NYMVDYG7',

        // Public API key: it is safe to commit it
        apiKey: '2dc197c65a9a3bc16515f64933bb50b5',

        indexName: 'wiki-404lab-top',

        // Optional: see doc section below
        // contextualSearch: true,
      },

      navbar: {
        title: '404Lab Wiki',
        logo: {
          alt: 'My Site Logo',
          src: 'img/favicon.ico',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'right',
            label: '📗Wiki',
          },
          { to: '/blog', label: '👨🏻‍💻Blog', position: 'right' },
          { to: '/home', label: '🏡Home', position: 'right' },

          {
            href: 'https://404Lab.top',
            label: 'More',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Wiki',
                to: '/',
              },
            ],
          },
          {
            title: 'Contact',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Wechat Channel',
                href: 'https://mp.weixin.qq.com/s/ytNsiyIjCb-URVLY90uSMw',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Telegram Channel',
                href: 'https://t.me/EnjoyDigitalLife',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Chen's Project, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: oceanicNext,
        // theme: duotoneLight,
        // darkTheme: oceanicNext,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      announcementBar: {
        id: 'support_us',
        content:
          '🚀 如果你觉得还不错, 就给一个 ⭐️ Start 吧 ~ <a target="_blank" rel="noopener noreferrer" href="https://github.com/HiChen404/MyWikiSite/tree/master/">Click here</a> ',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: false,
      },
      metadata: [
        {
          name: '这是一个共享的知识库(Wiki Database)，内容涉及软件分享，学习笔记(JavaScript,Vue,Python,Go,Flutter,React)，搞机技巧，互联网冲浪技巧等内容',
          content: 'Wiki Database,JavaScript,Vue,Python,Go,Flutter,React,破解,技巧,搞机,知识库,Github,黑客,iOS,iPhone',
        },
      ],
    }),
}

module.exports = config
