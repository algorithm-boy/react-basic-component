import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Progress from '../index';
import ProgressReadMe from '../README.md';
import './index.less';

storiesOf('Progress', module)
  .addParameters({
    readme: {
      sidebar: ProgressReadMe,
      highlightSidebar: true,
      codeTheme: 'github',
    },
  })
  .add('line progress', () => <div className='progress'><Progress progress={90} type='line'></Progress></div>)
  .add('circle progress', () => <div className='progress'><Progress progress={90} type='circle'></Progress></div>);