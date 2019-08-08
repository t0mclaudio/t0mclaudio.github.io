import React from 'react';
import { Link } from 'react-router-dom';

import Banner from './Banner';
import Projects from './Projects';
import Filters from './Filters';

export default () => (
  <div>
    <section id="navbar">
      <Link to="/about-me" target="_blank">About Me</Link>
    </section>
    <Banner />
    <section id="body">
      <Filters />
      <Projects />
    </section>
  </div>
);
