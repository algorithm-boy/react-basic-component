import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Input from '../index';

configure({ adapter: new Adapter() });

describe('Input - renders', () => {
  it('renders correctly - render', () => {
    const wrapper = render(
      <Input
        placeholder='placeholder'
        defaultValue='defaultValue'
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly - mount', () => {
    const wrapper = mount(
      <div>
        <Input
          placeholder='placeholder'
          value='value'
        />
      </div>
    );
    expect(wrapper.contains(<Input
      placeholder='placeholder'
      value='value'
    />)).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Input - parameters', () => {
  it('parameters check', () => {
    const wrapper = mount(<Input
      type='password'
      id='rc-Input-id'
      prefixCls='rc-Input'
      placeholder='rc-Input-placeholder'
      value='rc-Input-value'
      defaultValue='rc-Input-defaultValue'
      maxLength={500}
      copyFree={false}
      cutFree={false}
      pasteFree={false}
      clipboardFree={false}
    />);

    expect(wrapper.props().type).toEqual('password');
    expect(wrapper.props().id).toEqual('rc-Input-id');
    expect(wrapper.props().prefixCls).toEqual('rc-Input');
    expect(wrapper.props().placeholder).toEqual('rc-Input-placeholder');
    expect(wrapper.props().value).toEqual('rc-Input-value');
    expect(wrapper.props().defaultValue).toEqual('rc-Input-defaultValue');
    expect(wrapper.props().maxLength).toEqual(500);
    expect(wrapper.props().copyFree).toEqual(false);
    expect(wrapper.props().cutFree).toEqual(false);
    expect(wrapper.props().pasteFree).toEqual(false);
    expect(wrapper.props().clipboardFree).toEqual(false);
  });
});

describe('Input - callbacks', () => {
  it('callback check - onChange', done => {
    const wrapper = mount(<Input
      onChange={(e, val) => {
        expect(val).toEqual('test');
        expect(e).toBeTruthy();
        done();
      }}
    />);

    wrapper.simulate('change', { target: { value: 'test' } });
  });

  it('callback check - onKeyDown', done => {
    const wrapper = mount(<Input
      onKeyDown={(e) => {
        expect(e).toBeTruthy();
        expect(e.keyCode).toBe(10);
        done();
      }}
    />);

    wrapper.simulate('keydown', { keyCode: 10 });
  });

  it('callback check - onPressEnter', done => {
    const wrapper = mount(<Input
      onPressEnter={(e) => {
        expect(e).toBeTruthy();
        expect(e.keyCode).toBe(13);
        done();
      }}
    />);

    wrapper.simulate('keydown', { keyCode: 13 });
  });
});
