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
    padding: '4rem 0',
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
      { text: 'Getting Started', to: '/docs/Introduction/getting-started', emoji: '🎢' },
      { text: 'Smart wallet or EOA', to: '/docs/smart-wallet', emoji: '💸' },
      { text: 'Why Passkey?', to: '/docs/passkey', emoji: '🔑' },
      { text: 'Privacy and Security', to: '/docs/privacy-security', emoji: '🔐' },
    ],
  },
  {
    title: 'Trading & Funding',
    icon: '💱',
    description: 'Learn about trading and managing your funds',
    links: [
      { text: 'Add Funds to your account', to: '/docs/add-funds' },
      { text: 'Assets Swap', to: '/docs/assets-swap' },
      { text: 'Cash out my Crypto', to: '/docs/cash-out' },
    ],
  },
  {
    title: 'Earn & Services',
    icon: '📈',
    description: 'Explore our DeFi products and services',
    links: [
      { text: 'DeFi Primary Product', to: '/docs/defi-products' },
      { text: 'Dapps Markets', to: '/docs/dapps-markets' },
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
    <header className={clsx('banner banner--primary', styles.banner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p>How can we help you?</p>
        <DocSearchButton
          onTouchStart={importDocSearchModalIfNeeded}
          onFocus={importDocSearchModalIfNeeded}
          onMouseOver={importDocSearchModalIfNeeded}
          onClick={onOpen}
        />
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
      </div>
    </header>
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
                to="mailto:support@helix.box"
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