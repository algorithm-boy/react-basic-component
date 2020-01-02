import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Popconfirm from '../index';

configure({ adapter: new Adapter() });

describe('Popconfirm', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Popconfirm>Test</Popconfirm>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
