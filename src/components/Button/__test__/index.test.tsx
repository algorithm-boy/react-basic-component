import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../index';

configure({ adapter: new Adapter() });

describe('Button', () => {
  const onButtonClick = jest.fn();
  const setupByMount = () => {
    const wrapper = mount(<Button onClick={onButtonClick} />);
    return {
      wrapper
    };
  };
  it('renders correctly', () => {
    const wrapper = render(
      <Button>Test</Button>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('包含一个a标签', () => {
    const wrapper = shallow(
      <Button href="http://www.baidu.com">Link</Button>
    );
    expect(wrapper.find('a').exists()).toBeTruthy()
  });
  it('点击事件',()=>{
    const { wrapper } = setupByMount();
    wrapper.find('div').at(0).simulate('click');
    expect(onButtonClick).toBeCalled()
  })
 
});
