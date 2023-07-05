import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Translate, { translate } from "@docusaurus/Translate";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <video
        className={styles.masthead}
        poster="/img/masthead-poster.jpg"
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline>
        <source src="/video/masthead.webm" type="video/webm; codecs=vp9" />
        <source src="/video/masthead.mp4" type="video/mp4; codecs=hvc1" />
      </video>
      <div className="container">
        <h1 className="hero__title">
          <Translate id="homepage.hero.title">{siteConfig.title}</Translate>
        </h1>
        <p className="hero__subtitle">
          <Translate id="homepage.hero.subtitle">
            {siteConfig.tagline}
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            <Translate id="homepage.visitMyBlog" description="visit to my blog">
              Travel Blog
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
