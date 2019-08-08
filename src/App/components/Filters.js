/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Filter } from '../actions';

const Filters = (props) => (
  <section id="filters">
    <p><b>Filter by technology</b></p>
    {
      props.items.technologies.map((item) => (
        <label key={item} htmlFor={item} className="tech">
          <input type="checkbox" name={item} value={item} onChange={(e) => props.filter(e)} />
          {item}
        </label>
      ))
    }
  </section>
);

const mapStateToProps = (props) => ({ items: props });
const mapDispatchToProps = (dispatch) => (
  {
    filter: (e) => dispatch(Filter(e)),
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(Filters);
