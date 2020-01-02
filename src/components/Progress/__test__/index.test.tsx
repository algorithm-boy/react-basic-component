import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Progress from '../index';

configure({ adapter: new Adapter() });

describe('Progress', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Progress>Test</Progress>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
