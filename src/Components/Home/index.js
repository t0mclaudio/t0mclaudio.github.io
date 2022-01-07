import { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getHomePageContent } from "../../api";

import styles from "./index.module.scss";
import { Link } from "react-router-dom";

function Home(props) {
  const [state, setState] = useState(null);
  useEffect(() => {
    const getContents = async () => {
      const response = await getHomePageContent();
      setState(response);
    };
    getContents();
  }, []);

  if (!state) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/blogs"}>Blogs</Link>
          </li>
          <li>
            <Link to={"/works"}>Works</Link>
          </li>
        </ul>
      </nav>
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
        <article id="career-trajectory" className={styles.careerTrajectory}>
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
      </main>
      <footer>This site is handcrafted and WIP just like me.</footer>
    </div>
  );
}

export default Home;
