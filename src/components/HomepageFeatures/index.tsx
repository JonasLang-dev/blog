import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Translate, { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({
      id: "common.portfolio",
      message: "Portfolio",
      description: "portfolio label",
    }),
    Svg: require("@site/static/img/professional-portfolio.svg").default,
    description: (
      <Translate id="homepage.features.portfolio">
        Here are some of my personal projects.
      </Translate>
    ),
  },
  {
    title: translate({
      id: "common.aboutme",
      message: "About Me",
      description: "about me label",
    }),
    Svg: require("@site/static/img/id-card.svg").default,
    description: (
      <Translate id="homepage.features.aboutme">
        I am a front-end newcomer, my hobby is playing console games, I
        graduated from CS and love it. He is also an arch Linux user.
      </Translate>
    ),
  },
  {
    title: translate({
      id: "common.social",
      message: "Social",
      description: "social label",
    }),
    Svg: require("@site/static/img/social-media.svg").default,
    description: (
      <>
        <Translate id="homepage.features.social">
          You can follow me through github, if it can help you, welcome star or
          follow.
        </Translate>{" "}
        <Link to="https://github.com/JonasLang-dev">@JonaslangDev</Link>
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
