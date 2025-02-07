import React, { useState, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHistory } from '@docusaurus/router';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import {DocSearchButton, useDocSearchKeyboardEvents} from '@docsearch/react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faRobot } from '@fortawesome/free-solid-svg-icons';

const styles = {
  banner: {
    backgroundColor: 'var(--ifm-color-primary)',
    color: '#fff',
    padding: '2rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  } as const,
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    padding: '2rem 0',
  } as const,
  featureCard: {
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: 'var(--ifm-card-background-color)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  } as const,
  bottomSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: 'var(--ifm-color-emphasis-100)',
    borderRadius: '8px',
    marginTop: '3rem',
  } as const,
  mailButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'var(--ifm-color-primary)',
    color: 'white',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: 'var(--ifm-color-primary-darker)',
    },
  } as const,
  actionButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontWeight: 'bold',
    transition: 'opacity 0.2s',
    cursor: 'pointer',
  } as const,
  mainContent: {
    marginBottom: '6rem',
    paddingBottom: '2rem',
  } as const,
};

type FeatureItem = {
  title: string;
  icon: string;
  description: string;
  links: Array<{
    text: string;
    to: string;
    emoji?: string;
  }>;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'My Account',
    icon: '👤',
    description: 'Everything you need to know about your account',
    links: [
      { text: 'Getting Started', to: '/docs/introduction/getting-started', emoji: '🎢' },
      { text: 'Smart wallet VS EOA', to: '/docs/faqs/smart-wallet-faq', emoji: '💸' },
      { text: 'Why Passkey?', to: '/docs/introduction/getting-started#passkeys', emoji: '🔑' },
      { text: 'Privacy and Security', to: '/docs/introduction/privacy-security', emoji: '🔐' },
      { text: 'Brand', to: '/docs/brand', emoji: '🔐' },
    ],
  },
  {
    title: 'Trading & Funding',
    icon: '💱',
    description: 'Learn about trading and managing your funds',
    links: [
      { text: 'Add Funds to your account', to: '/docs/funding/add-funds', emoji: '💳' },
      { text: 'Assets Swap', to: '/docs/swap', emoji: '🔄' },
      { text: 'Cash out my Crypto', to: '/docs/funding/cash-out-crypto', emoji: '💰' },
    ],
  },
  {
    title: 'Earn & Services',
    icon: '📈',
    description: 'Explore our DeFi products and services',
    links: [
      { text: 'DeFi Products', to: '/docs/category/defi-premium', emoji: '🏦' },
      { text: 'Dapps Markets', to: '/docs/defi-premium/dapp-markets', emoji: '🛍️' },
    ],
  },
];

function Feature({title, icon, description, links}: FeatureItem) {
  return (
    <div style={styles.featureCard}>
      <h3>
        <span style={{marginRight: '0.5rem'}}>{icon}</span>
        {title}
      </h3>
      <p>{description}</p>
      <ul className="clean-list">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link to={link.to}>
              {link.emoji && <span style={{marginRight: '0.5rem'}}>{link.emoji}</span>}
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

let DocSearchModal = null;

function Hit({hit, children}) {
  return <Link to={hit.url}>{children}</Link>;
}

function ResultsFooter({state, onClose}) {
  return (
    <Link to={`/search?q=${state.query}`} onClick={onClose}>
      See all {state.context.nbHits} results
    </Link>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const history = useHistory();
  const { withBaseUrl } = useBaseUrlUtils();
  const [isOpen, setIsOpen] = useState(false);

  const importDocSearchModalIfNeeded = useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve();
    }

    return Promise.all([
      import('@docsearch/react/modal'),
      import('@docsearch/react/style'),
    ]).then(([{DocSearchModal: Modal}]) => {
      DocSearchModal = Modal;
    });
  }, []);

  const onOpen = useCallback(() => {
    importDocSearchModalIfNeeded().then(() => {
      setIsOpen(true);
    });
  }, [importDocSearchModalIfNeeded, setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useDocSearchKeyboardEvents({isOpen, onOpen, onClose});

  return (
   <> <header className={clsx('banner banner--primary')} style={ styles.banner}>
   <div className="container">
     <Heading as="h1" className="hero__title" style={{
       fontSize: 'clamp(2rem, 5vw, 3.5rem)',
       textAlign: 'center'
     }}>
       {siteConfig.title}
     </Heading>
     <p className="hero__subtitle" style={{
       fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
       fontWeight: '500',
       maxWidth: '800px',
       margin: '0 auto 0',
       textAlign: 'center',
       padding: '0 1rem'
     }}>
       The smart and easy way to DeFi!
     </p>
   </div>
 </header>
<div>
     <h2 className="hero__description" style={{
       maxWidth: '600px',
       margin: ' 2rem auto',
       textAlign: 'center',
       padding: '0 1rem'
     }}>
How can we help you?     </h2>
     <div style={{ 
       maxWidth: '600px',
       margin: '0 auto',
       padding: '0 1rem',
       display: 'flex',
       justifyContent: 'center'
     }}>
       <DocSearchButton
         onTouchStart={importDocSearchModalIfNeeded}
         onFocus={importDocSearchModalIfNeeded}
         onMouseOver={importDocSearchModalIfNeeded}
         onClick={onOpen}
         style={{
          width: '100%',
          height: 'clamp(40px, 6vw, 50px)',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          padding: 'clamp(0.6rem, 2vw, 0.8rem) clamp(1rem, 3vw, 1.5rem)',
          borderRadius: '8px',
          maxWidth:600,
        }}
       />
     </div></div>
 {isOpen &&
   createPortal(
     <DocSearchModal
       onClose={onClose}
       initialScrollY={window.scrollY}
       navigator={{
         navigate({suggestionUrl}) {
           history.push(suggestionUrl);
         },
       }}
       transformItems={(items) => {
         return items.map((item) => {
           const a = document.createElement('a');
           a.href = item.url;
           return {
             ...item,
             url: withBaseUrl(`${a.pathname}${a.hash}`),
           };
         });
       }}
       hitComponent={Hit}
       resultsFooterComponent={(footerProps) => (
         <ResultsFooter {...footerProps} onClose={onClose} />
       )}
       {...siteConfig.themeConfig.algolia as any} 
     />,
     document.body,
   )}
 </>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Help Center - ${siteConfig.title}`}
      description="Helixbox Help Center - Find answers to your questions">
      <HomepageHeader />
      <main style={styles.mainContent}>
        <div className="container">
          <div style={styles.features}>
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
          
          <div className="row margin-top--lg">
            <div className="col col--6">
              <p>Can't find what you are looking for?</p>
              <Link
                to="mailto:hello@helix.box"
                className="button button--primary"
                style={styles.actionButton}
              >
                <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '0.5rem' }} />
                Contact Support
              </Link>
            </div>
            <div className="col col--6">
              <p><strong>Ask our AI agent for help?</strong></p>
              <button
                onClick={() => {}}
                className="button button--secondary"
                style={styles.actionButton}
              >
                <FontAwesomeIcon icon={faRobot} style={{ marginRight: '0.5rem' }} />
                Chat with AI
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
