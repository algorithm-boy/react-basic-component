import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Switch from '../index';

configure({ adapter: new Adapter() });

describe('Switch - renders', () => {
  it('renders correctly - shallow', () => {
    const wrapper = shallow(
      <Switch />
    );
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly - render', () => {
    const wrapper = render(
      <Switch
        renderChecked='checked'
        renderUnChecked='unchecked'
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly - mount', () => {
    const wrapper = mount(
      <div>
        <Switch
          renderChecked='checked'
          renderUnChecked='unchecked'
        />
      </div>
    );
    expect(wrapper.contains(<Switch
      renderChecked='checked'
      renderUnChecked='unchecked'
    />)).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Switch - parameters', () => {
  it('parameters check', () => {
    const wrapper = mount(<Switch
      renderChecked='开'
      renderUnChecked='关'
      prefixCls='rc-switch'
      autoFocus
      disabled
      defaultChecked
      checked={false}
    />);

    expect(wrapper.props().autoFocus).toEqual(true);
    expect(wrapper.props().disabled).toEqual(true);
    expect(wrapper.props().defaultChecked).toEqual(true);
    expect(wrapper.props().checked).toEqual(false);
    expect(wrapper.props().renderChecked).toEqual('开');
    expect(wrapper.props().renderUnChecked).toEqual('关');
    expect(wrapper.props().prefixCls).toEqual('rc-switch');
  });
});

describe('Switch - callbacks', () => {
  it('callback check - onClick', done => {
    const wrapper = mount(<Switch
      renderChecked='开'
      renderUnChecked='关'
      onClick={(checked, e) => {
        expect(checked).toEqual(false);
        expect(e).toBeTruthy();
        done();
      }}
    />);

    wrapper.simulate('click');
  });

  it('callback check - onClick_checked', done => {
    const wrapper = mount(<Switch
      renderChecked='开1'
      renderUnChecked='关1'
      checked={true}
      onClick={(checked, e) => {
        expect(checked).toEqual(true);
        expect(e).toBeTruthy();
        done();
      }}
    />);

    wrapper.simulate('click');
  });

  it('callback check - onChange_unchecked', done => {
    const wrapper = mount(<Switch
      renderChecked='开2'
      renderUnChecked='关2'
      onChange={(checked, e) => {
        expect(checked).toEqual(true);
        done();
      }}
    />);

    wrapper.simulate('click');
  });

  it('callback check - onChange_checked', done => {
    const wrapper = mount(<Switch
      renderChecked='开3'
      renderUnChecked='关3'
      defaultChecked
      onChange={(checked, e) => {
        expect(checked).toEqual(false);
        done();
      }}
    />);

    wrapper.simulate('click');
  });

  it('callback check - onChange_keyboard_关', done => {
    const wrapper = mount(<Switch
      renderChecked='开4'
      renderUnChecked='关4'
      defaultChecked
      onChange={(checked, e) => {
        expect(checked).toEqual(false);
        done();
      }}
    />);

    wrapper.simulate('keydown', {
      keyCode: 37
    });
  });

  it('callback check - onChange_keyboard_开', done => {
    const wrapper = mount(<Switch
      renderChecked='开5'
      renderUnChecked='关5'
      onChange={(checked, e) => {
        expect(checked).toEqual(true);
        done();
      }}
    />);

    wrapper.simulate('keydown', {
      keyCode: 39
    });
  });

  it('callback check - onMouseUp', done => {
    const wrapper = mount(<Switch
      renderChecked='开6'
      renderUnChecked='关6'
      onMouseUp={(checked, e) => {
        expect(checked).toEqual(false);
        expect(e).toBeTruthy();
        done();
      }}
    />);

    wrapper.simulate('mouseup');
  });
});