import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { InView } from "react-intersection-observer";
import { getHomePageContent } from "../api";
// import Nav from "../Components/Nav";
import { FaBullseye } from "react-icons/fa";
import classNames from "classnames";

import styles from "./index.module.scss";

function Home({ state }) {
  if (!state) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <section>
        <header className={styles.header}>
          <picture>
            <source
              srcset={state.media[0].fields.file.url}
              media="(min-width: 800px)"
            />
            <img
              src={state.media[0].fields.file.url}
              alt={state.media[0].fields.file.title}
              className={styles.image}
            />
          </picture>
          <section>
            <h3>Frontend Engineer</h3>
            <div className={styles.techStack}>
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
                alt="javascript"
                width="40"
                height="40"
              />
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
                alt="typescript"
                width="40"
                height="40"
              />
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"
                alt="html5"
                width="40"
                height="40"
              />
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg"
                alt="css3"
                width="40"
                height="40"
              />
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg"
                alt="react"
                width="40"
                height="40"
              />
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg"
                alt="express"
                width="40"
                height="40"
              />
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg"
                alt="nodejs"
                width="40"
                height="40"
              />
            </div>
          </section>
        </header>
      </section>
      <main>
        <section className={styles.banner}>
          <div>{documentToReactComponents(state.greeting)}</div>
        </section>
        <article id="about" className={styles.about}>
          <h2>About me</h2>
          <section>{documentToReactComponents(state.longDescription)}</section>
        </article>
        <h2 style={{ textAlign: "center" }}>My career trajectory</h2>
        <InView>
          {({ inView, ref }) => (
            <article
              id="career-trajectory"
              ref={ref}
              className={`${styles.timeline} ${
                inView ? styles.careerTrajectoryInView : ""
              }`}
            >
              {[...state.careerTrajectory].reverse().map((item, index) => {
                return (
                  <section
                    className={classNames(
                      styles.container,
                      index % 2 ? styles.right : styles.left
                    )}
                    key={index}
                  >
                    <div className={styles.content}>
                      <h3>{item.title}</h3>
                      {/* <p>{item.description}</p> */}
                      <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </section>
                );
              })}
            </article>
          )}
        </InView>
      </main>
      <footer>
        <InView>
          {({ inView, ref }) => (
            <p ref={ref} className={`${inView ? styles.show : ""}`}>
              This site is handcrafted and WIP just like me.
            </p>
          )}
        </InView>
      </footer>
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      state: await getHomePageContent(),
    },
  };
}

export default Home;
