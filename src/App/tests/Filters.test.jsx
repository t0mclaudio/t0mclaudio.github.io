/* eslint-disable react/prop-types */
import React from 'react';
import expect from 'expect';
import { mount, configure } from 'enzyme';
import { createStore } from 'redux';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import initialState from '../initialState';
import appReducers from '../reducers';
import Filters from '../components/Filters';

configure({ adapter: new Adapter() });

const store = createStore(appReducers, initialState);

const CustomProvider = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

describe('Test Filters Component', () => {
  it('Filters Component mounts', () => {
    const filters = mount(<CustomProvider><Filters /></CustomProvider>);
    expect(filters.find('#filters').length).toEqual(1);
    expect(filters.find('.tech').length).toBeGreaterThan(0);
  });
});
