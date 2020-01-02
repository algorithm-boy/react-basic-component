import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tooltip from '../index';

configure({ adapter: new Adapter() });

describe('Tooltip', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Tooltip title="Test">Test</Tooltip>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
