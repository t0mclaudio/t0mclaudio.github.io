import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function Blogs() {
  return (
    <div className={styles.blogs}>
      <p>
        This page is <b>Work in Progress</b>
      </p>
      <Link className={styles.link} to={"/"}>
        Back to homepage
      </Link>
    </div>
  );
}

export default Blogs;
