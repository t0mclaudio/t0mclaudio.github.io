import { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { InView } from "react-intersection-observer";
import { getHomePageContent } from "../../api";
import Nav from "../Nav";

import styles from "./index.module.scss";

function Home(props) {
  const [state, setState] = useState(null);

  const getContents = async () => {
    const response = await getHomePageContent();
    setState(response);
  };

  useEffect(() => {
    getContents();
  }, []);

  if (!state) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Nav />
      <header>
        {/* Optimised later for performance */}
        <div>
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
          <blockquote>{documentToReactComponents(state.greeting)}</blockquote>
        </div>
      </header>
      <main>
        <article id="about" className={styles.about}>
          <h2>About me</h2>
          <section>{documentToReactComponents(state.longDescription)}</section>
        </article>
        <InView>
          {({ inView, ref }) => (
            <article
              id="career-trajectory"
              ref={ref}
              className={`${styles.careerTrajectory} ${
                inView ? styles.careerTrajectoryInView : ""
              }`}
            >
              <h2>My career trajectory</h2>
              {[...state.careerTrajectory].reverse().map((item, index) => {
                return (
                  <section key={index}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
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

export default Home;
