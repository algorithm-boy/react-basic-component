import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../index';
import ButtonReadMe from '../README.md';


const clickEvent = (param?:any) => {
    alert(param)
}

storiesOf('Button', module)
  .addParameters({
    readme: {
      sidebar: ButtonReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('Onclick',() => <Button className="icon" onClick={()=>clickEvent(1)}>Onclick</Button>)
  .add('Disable', () => <Button disabled onClick={()=>clickEvent(1)}>disable</Button>)
  .add('Link', () => <Button href={ `http://wwww.baidu.com`}>link</Button>);
