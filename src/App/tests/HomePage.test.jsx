import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HomePage from '../components/HomePage';
import Banner from '../components/Banner';
import Projects from '../components/Projects';
import Filters from '../components/Filters';

configure({ adapter: new Adapter() });

describe('Test Home Page', () => {
  it('Contains Banner & Projects Component', () => {
    const home = shallow(<HomePage />);
    expect(home.contains(<Banner />)).toBe(true);
    expect(home.contains(<Projects />)).toBe(true);
    expect(home.contains(<Filters />)).toBe(true);
  });
});
