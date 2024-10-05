import React from 'react';
import Layout from '../components/layout';
import * as styles from '../components/index.module.css';

const IndexPage = () => {
  return (
    <Layout>
      <div className={styles.fullScreenContainer}>
        {/* Your logo and header will be here (part of the Layout component) */}
        
        {/* Main content */}
        <main className={styles.mainContent}>
          <p>
            I'm a frontend developer with <span style={{fontWeight: 900}}>8+ years</span> of professional experience. Based in Las Vegas, I am interested in websites, smart contracts, and skateboarding.
          </p>
          <p>
            Currently at <a href="https://shipnetwork.com" target="_blank" rel="noopener noreferrer">@ShipNetwork</a>, as <span style={{fontWeight: 900}}>senior web developer</span> building <a href="https://firstmile.com" target="_blank" rel="noopener noreferrer">@firstmile</a> and scaling <a href="https://www.prcl.com" target="_blank" rel="noopener noreferrer">@prclworld</a>.
          </p>
          <p>
            On my free time I like to create cool things with code at <a href="https://www.blurrdstudio.com/" target="_blank" rel="noopener noreferrer">@blurrdstudio</a> and <a href="https://www.blurrdskateboards.com/" target="_blank" rel="noopener noreferrer">@blurrdskateboards</a>.
          </p>
        </main>
      </div>
    </Layout>
  );
};

export default IndexPage;
