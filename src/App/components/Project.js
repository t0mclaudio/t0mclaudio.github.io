/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

export default (props) => (
  <div className="project card">
    <div className="card-img-container">
      <img src={`/dist/icons/${props.proj.img}`} alt="" />
    </div>
    <div className="card-content">
      <h4><b>{props.proj.name}</b></h4>
      <p className="short">{props.proj.short}</p>
      <p className="tech"><small>{props.proj.technologies.join()}</small></p>
    </div>
  </div>
);
