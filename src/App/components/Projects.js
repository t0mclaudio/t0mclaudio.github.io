/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import Project from './Project';

const Projects = (props) => (
  <section id="projects">
    {
      props.data.projects.filtered.map((proj) => (
        <Project key={proj.name} proj={proj} />
      ))
    }
  </section>
);

const mapStateToProps = (props) => ({ data: props });
export default connect(mapStateToProps)(Projects);
