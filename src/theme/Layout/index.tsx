import React, {  type ReactNode } from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type { WrapperProps } from '@docusaurus/types';
import useIsBrowser from '@docusaurus/useIsBrowser';

type Props = WrapperProps<typeof LayoutType>;
declare global {
  interface Window {
    difyChatbotConfig: {
      token: string;
      baseUrl: string;
    };
  }
}
const useScript = (url, selector = 'body', async = true) => {
  React.useEffect(() => {
    const element = document.querySelector(selector)
    const script = document.createElement('script')
    script.src = url
    script.async = async
    element.appendChild(script)
    return () => {
      element.removeChild(script)
    }
  }, [url])
}

export default function LayoutWrapper(props: Props): ReactNode {
  const isBrowser = useIsBrowser();
  if (isBrowser) {
    window.difyChatbotConfig = {
      token: 'kx7Cpuy557gWtKXo',
      baseUrl: 'https://dify-darwinia.vercel.app/',
    };
  }
  useScript("https://dify-darwinia.vercel.app/embed.min.js");
  // // {/* <!-- Start of testitering Zendesk Widget script --> */ }
  // useScript("https://static.zdassets.com/ekr/snippet.js?key=3d2e9764-aa77-4889-a192-edbc23f5b09c");
  // // {/* <!-- End of testitering Zendesk Widget script --> */ }
  // useScript('//fw-cdn.com/12444885/4859742.js');

  return (
    <>
      <Layout {...props} />
    </>
  );
}
