import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Portal from '../index';

configure({ adapter: new Adapter() });

describe('Portal', () => {
  it('renders correctly - shallow', () => {
    const wrapper = shallow(<Portal visible><span>Text</span></Portal>);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly - mount', () => {
    const wrapper = mount(<Portal visible><span>Text</span></Portal>);
    expect(wrapper.contains(<Portal visible><span>Text</span></Portal>)).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it('pass visible parameter', () => {
    const wrapper = mount(<Portal visible><span>Text</span></Portal>);

    expect(wrapper.props().visible).toEqual(true);
  });

  it('pass selector parameter', () => {
    const wrapper = mount(<Portal visible selector='#div'><span>Text</span></Portal>);

    expect(wrapper.props().selector).toEqual('#div');
  });

  it('pass render parameter', () => {
    const wrapper = mount(<Portal visible render={() => <b>TextB</b>}><span>Text</span></Portal>);

    expect(wrapper.props().render).toBeTruthy();
    expect(wrapper.find('b').exists()).toBe(true);
    expect(wrapper.find('span').exists()).toBe(false);
  });

  it('pass onMount and onUnmount parameter', () => {
    const wrapper = mount(<Portal
        visible 
        onMount={() => console.info('onMount')}
        onUnmount={() => console.info('onUnmount')}
      ><span>Text</span></Portal>
    );

    expect(wrapper.props().onMount).toBeTruthy();
    expect(wrapper.props().onUnmount).toBeTruthy();
  });
});
