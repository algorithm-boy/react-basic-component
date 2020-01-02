import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Drag from '../index';

configure({ adapter: new Adapter() });

describe('Drag', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Drag>Test</Drag>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
