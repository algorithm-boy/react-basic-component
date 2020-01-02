import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Steps, { Step } from '../index';
import StepsReadMe from '../README.md';
import './index.less';
import './iconfont.less';

storiesOf('Steps', module)
  .addParameters({
    readme: {
      sidebar: StepsReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('with text', () => 
  <Steps current={1} direction='horizontal'>
      <Step title="已完成" />
      <Step title="进行中" />
      <Step title="待运行" />
      <Step title="待运行" />
  </Steps>
);
