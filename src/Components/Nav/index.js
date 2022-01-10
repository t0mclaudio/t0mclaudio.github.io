import React from "react";
import { Link } from "react-router-dom";
import { ROUTEPATHS } from "../../routes";
import styles from "./styles.module.scss";

function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to={ROUTEPATHS.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTEPATHS.BLOGS}>Blogs</Link>
        </li>
        <li>
          <Link to={ROUTEPATHS.WORKS}>Works</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
