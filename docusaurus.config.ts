import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Helixbox",
  tagline: "Helixbox Docs",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.helix.box",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "helixbox", // Usually your GitHub org/user name.
  projectName: "helixbox-docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/helixbox/docs/tree/main",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    navbar: {
      title: "",
      logo: {
        alt: "Helix Logo",
        src: "img/logo.svg",
      },
      items: [],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "App",
          items: [
            {
              label: "Helixbox",
              to: "https://helix.box",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/6XyyNGugdE",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/helixboxlabs",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/helixbox",
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
};

export default config;
