import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import type * as Preset from "@docusaurus/preset-classic";
const config: Config = {
  title: "Helixbox Labs Documents",
  tagline: "Helixbox Docs",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.helixbox.ai",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Helixbox", // Usually your GitHub org/user name.
  projectName: "Helixbox-docs", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/',
            from: '/docs/',
          },
          
        ],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'labs',
        path: 'labs',
        routeBasePath: 'labs',
        sidebarPath: './sidebars.ts',
      },
    ],
    
  ],
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: false,
        //  {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   // editUrl: "https://github.com/helixbox/docs/tree/main",
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
        theme: {
          customCss: ["./src/css/custom.css"],
        },
      } satisfies Preset.Options,
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig: {
  
    // Replace with your project's social card
    navbar: {
      title: "",
      logo: {
        alt: "Helix Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'sidebarDocs',
          position: 'left',
          label: 'Docs',
          activeBaseRegex: 'docs/(next|v8)',
          to: '/docs/index',
        },
        {
          type: 'docSidebar',
          sidebarId: 'sidebarDocs',
          docsPluginId:"labs",
          position: 'left',
          label: 'Labs',
          // activeBaseRegex: 'labs/(next|v8)',
          // to: '/labs',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          label: "GitHub",
          position: 'right',
          href: "https://github.com/helixbox",
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
    
      style: "dark",
      links: [
       { title: " ",
        items: [
          { 
            html:`<a href="https://helixbox.ai" alt="Helixbox"><img src="/img/logo.png" alt="Helixbox" height="22" />
            </a>`, // title: "App",
            // items: [
            //   {
            //     label: "Helixbox",
            //     to: "https://helixbox.ai",
            //   },
            // ],
          },
          {
            html:  `<p style="margin: 0px; width: 320px; color:var(--ifm-color-content-secondary);">The smart and easy way to DeFi!</p>
<p style="margin: 0px; width: 320px; color:var(--ifm-color-content-secondary);">An instant multichain ecosystem for secure asset management.</p>`
          }
       ]},
       {
        title: "Apps",
        items: [
          {
            label: "Helixbox",
            to: "https://helixbox.ai/",
          },
          {
            label: "Bridge",
            to: "https://bridge.helixbox.ai/",
          },
          {
            label: "XToken BaaS",
            to: "https://xtoken.helixbox.ai/",
          },
        ],
      },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              icon: "fab fa-discord",
              href: "https://discord.gg/6XyyNGugdE",
            },
            {
              label: "Twitter",
              icon: "fab fa-twitter",
              href: "https://twitter.com/helixboxlabs",
            },
            {
              label: "Email",
              icon:"fab fa-envelope",
              href: "mailto:hello@helixbox.ai",
            },
          
          ],
        },
        {
          title: "Legal",
          items: [
            {
              label: "Privacy Policy",
              to: "https://helixbox.ai/docs/Privacy_Policy.html",
            },
            {
              label: "Terms of Use",
              to: "https://helixbox.ai/docs/Terms_of_Use.html",
            },
            {
              label: "Cookies Policy",
              to: "https://helixbox.ai/docs/Cookies_Policy.html",
            },
            {
              label: "3rd Party Services",
              to: "https://helixbox.ai/docs/3rd_Party_Services.html",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Helixbox`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    // Search
    algolia: {
      appId: "7XWR9R3HW7",
      apiKey: "67f3045c29776f57ec82bc65447ebcb7",
      indexName: "helixbox",
    },
  } satisfies Preset.ThemeConfig,
  scripts: [
    {
      src: 'js/ai.js',
      async: false,
    },
    {
      src: 'https://dify.helixbox.ai/embed.min.js',
      async: true,
      id:"50BF6mXsnaB2kVMY"
    },
  ],
};

export default config;
