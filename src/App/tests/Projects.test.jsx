/* eslint-disable react/prop-types */
import React from 'react';
import expect from 'expect';
import { mount, configure } from 'enzyme';
import { createStore } from 'redux';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import initialState from '../initialState';
import appReducers from '../reducers';
import Projects from '../components/Projects';

configure({ adapter: new Adapter() });

const store = createStore(appReducers, initialState);

const CustomProvider = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

describe('Test Projects Component', () => {
  it('Projects Component mounts', () => {
    const projects = mount(<CustomProvider><Projects /></CustomProvider>);
    expect(projects.find('#projects').length).toEqual(1);
  });
});
