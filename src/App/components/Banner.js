/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import {
  FaLinkedinIn,
  FaTwitterSquare,
  FaGithub
} from 'react-icons/fa';

export default () => (
  <section id="banner">
    <div>
      <img id="photo" alt="Tom Claudio" src="/dist/img/tom.jpeg" />
      <h2 className="m-0">Tom Claudio</h2>
      <small className="m-0">Senior Front End Engineer</small>
    </div>
    <div id="bannerContent">
      <p id="lead-text">Tom is a frontend engineer with 10+ years experience building full stack web applications.</p>
      <div id="sm-links">
        <a
          href="https://www.linkedin.com/in/tomclaudio/"
          className="sm-icon"
          role="button"
          aria-label="Go to Tom's LinkedIn page"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://twitter.com/t0mclaudio"
          className="sm-icon"
          role="button"
          aria-label="Go to Tom's Twitter Page"
        >
          <FaTwitterSquare />
        </a>
        <a
          href="https://github.com/t0mclaudio"
          className="sm-icon"
          role="button"
          aria-label="Go to Tom's Github page"
        >
          <FaGithub />
        </a>
      </div>
    </div>
  </section>
);
