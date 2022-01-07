import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function Works() {
  return (
    <div className={styles.works}>
      <p>
        This page is <b>Work in Progress</b>
      </p>
      <Link className={styles.link} to={"/"}>
        Back to homepage
      </Link>
    </div>
  );
}

export default Works;
