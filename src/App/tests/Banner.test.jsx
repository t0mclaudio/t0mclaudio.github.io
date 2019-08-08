import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import { create } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Banner from '../components/Banner';

configure({ adapter: new Adapter() });

describe('Banner Component', () => {
  it('Banner renders', () => {
    const banner = create(<Banner />);
    expect(banner.toJSON()).toMatchSnapshot();
  });
  it('Renders banner component', () => {
    const banner = shallow(<Banner />);
    expect(banner.find('img').length).toEqual(1);
    expect(banner.find('h2').length).toEqual(1);
    expect(banner.find('p').length).toEqual(1);
  });
});
