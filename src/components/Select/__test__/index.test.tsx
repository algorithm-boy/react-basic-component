import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from '../index';
import Option from "../Option";

configure({ adapter: new Adapter() });

describe('Select', () => {
  it('renders correctly', () => {
    // @ts-ignore
    const wrapper = render(
      <Select
        placeholder="please select"
        showSearch
        resetOption
        onChange={(value: any, option: any) => {
          console.log('onchange', value, option)
        }}
        defaultValue={'lucy'}
        onFocus={() => console.log('focus')}
        onBlur={() => console.log('blur')}
      >
        <Option value="jack" key={1}>
          jack
        </Option>
        <Option value="lucy" key={2}>
          lucy
        </Option>
        <Option value="disabled" key={4} disabled>
          disabled
        </Option>
        <Option value="yiminghe" key={3}>
          yiminghe
        </Option>
      </Select>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
