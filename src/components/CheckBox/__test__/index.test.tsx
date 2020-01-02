import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckBox from '../index';

configure({ adapter: new Adapter() });

describe('CheckBox', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <CheckBox>Test</CheckBox>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
