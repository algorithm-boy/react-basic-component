import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Notification from '../index';
import NotificationReadMe from '../README.md';

let notification: any = null;
Notification.newInstance({}, (n: any) => notification = n);
var prefixCls = 'hp-toast';

function simpleFn() {
  notification.notice({
    prefixCls: prefixCls,
    duration: 3,
    content: <span>simple show</span>,
    onClose() {
      console.log('simple close');
    },
  });
}

storiesOf('Notification', module)
  .addParameters({
    readme: {
      sidebar: NotificationReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('with text', () => <button onClick={simpleFn}>simple show</button>);
