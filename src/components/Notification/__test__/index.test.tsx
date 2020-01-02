import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Notification from '../index';

configure({ adapter: new Adapter() });

describe('Notification', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Notification>Test</Notification>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
