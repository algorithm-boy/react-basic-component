import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CheckBox from '../index';
import CheckBoxReadMe from '../README.md';

storiesOf('CheckBox', module)
  .addParameters({
    readme: {
      sidebar: CheckBoxReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('with text', () => {
    return <div>
      <CheckBox>Hello CheckBox</CheckBox>
      <CheckBox defaultChecked={true}>defaultChecked</CheckBox>
      <CheckBox readOnly={true} >readOnly</CheckBox>
      <CheckBox checked={true} >checked</CheckBox>
      <CheckBox className="check_box" style={{color:'red'}} >class and style</CheckBox>
      <CheckBox onChange={(e)=>{
        alert(e)
      }} >change</CheckBox>
    </div>
  });
