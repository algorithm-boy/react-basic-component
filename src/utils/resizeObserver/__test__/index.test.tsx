import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactResizeObserver from '../';
import { TextArea } from '../../../components';

configure({ adapter: new Adapter() });

describe('ReactResizeObserver - renders', function () {
  it('renders correctly - render', () => {
    const wrapper = render(
      <ReactResizeObserver>
        <TextArea
          placeholder='placeholder'
          defaultValue='defaultValue'
        />
      </ReactResizeObserver>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly - mount', () => {
    const wrapper = mount(
      <ReactResizeObserver>
        <TextArea
          placeholder='placeholder'
          value='value'
        />
      </ReactResizeObserver>
    );
    expect(wrapper.contains(<TextArea
      placeholder='placeholder'
      value='value'
    />)).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('ReactResizeObserver - parameters', () => {
  it('parameters check', () => {
    const wrapper = mount(<ReactResizeObserver
      disabled
    >
      <TextArea
        placeholder='placeholder'
        value='value'
      />
    </ReactResizeObserver>);

    expect(wrapper.props().disabled).toEqual(true);
  });
});
