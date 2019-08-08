import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Project from '../components/Project';
import initialState from '../initialState';

configure({ adapter: new Adapter() });

describe('Project component test', () => {
  it('Renders correctly', () => {
    const proj = initialState.projects.src[0];
    const wrapper = shallow(<Project key={proj.name} proj={proj} />);
    expect(wrapper.find('.project')).toHaveLength(1);
  });
});
