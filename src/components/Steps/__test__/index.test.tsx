import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Steps from '../index';
import Step from '../Step';

configure({ adapter: new Adapter() });

describe('Steps', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <div>
        <Steps direction="horizontal" current={1} labelPlacement="vertical" style={{background: 'white'}} className="stepStyle">
          <Step title="已完成" description="测试测试1"  status="finish" onClick={() => 1} />
          <Step title="进行中" description="测试测试"  status="during" onClick={() => 2} />
          <Step title="待运行" description="测试测试"  status="wait" onClick={() => 3} />
          <Step title="待运行" description="测试测试"  status="wait" onClick={() => 4} />
        </Steps>
    </div>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
