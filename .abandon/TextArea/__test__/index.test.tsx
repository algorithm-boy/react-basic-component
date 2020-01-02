import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextArea from '../index';

configure({ adapter: new Adapter() });

describe('TextArea - renders', () => {
  it('renders correctly - shallow', () => {
    const wrapper = shallow(
      <TextArea />
    );
    expect(wrapper.find('textarea').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly - render', () => {
    const wrapper = render(
      <TextArea
        placeholder='placeholder'
        defaultValue='defaultValue'
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly - mount', () => {
    const wrapper = mount(
      <div>
        <TextArea
          placeholder='placeholder'
          value='value'
        />
      </div>
    );
    expect(wrapper.contains(<TextArea
      placeholder='placeholder'
      value='value'
    />)).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('TextArea - parameters', () => {
  it('parameters check', () => {
    const wrapper = mount(<TextArea
      id='rc-textarea-id'
      prefixCls='rc-textarea'
      placeholder='rc-textarea-placeholder'
      value='rc-textarea-value'
      defaultValue='rc-textarea-defaultValue'
      minRows={2}
      maxRows={5}
      maxLength={500}
      autoHeight={false}
      draggable={true}
    />);

    expect(wrapper.props().id).toEqual('rc-textarea-id');
    expect(wrapper.props().prefixCls).toEqual('rc-textarea');
    expect(wrapper.props().placeholder).toEqual('rc-textarea-placeholder');
    expect(wrapper.props().value).toEqual('rc-textarea-value');
    expect(wrapper.props().defaultValue).toEqual('rc-textarea-defaultValue');
    expect(wrapper.props().minRows).toEqual(2);
    expect(wrapper.props().maxRows).toEqual(5);
    expect(wrapper.props().maxLength).toEqual(500);
    expect(wrapper.props().autoHeight).toEqual(false);
    expect(wrapper.props().draggable).toEqual(true);
  });
});

describe('TextArea - callbacks', () => {
  it('callback check - onChange', done => {
    const wrapper = mount(<TextArea
      onChange={(e, val) => {
        expect(val).toEqual('test');
        expect(e).toBeTruthy();
        done();
      }}
    />);

    wrapper.simulate('change', { target: { value: 'test' } });
  });
});
