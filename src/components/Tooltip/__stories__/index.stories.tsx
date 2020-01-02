import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip from '../index';
import TooltipReadMe from '../README.md';

storiesOf('Tooltip', module)
  .addParameters({
    readme: {
      sidebar: TooltipReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('with text', 
    () => 
    <div style={{marginLeft:100}}>
      <Tooltip title="top" placement="top" trigger="focus" style={{marginTop:20}}>
        <input defaultValue="focus me！"/>
      </Tooltip>
      <Tooltip title="top" placement="top" style={{marginTop:20}}>
        <span>Hello Tooltip-top1!</span>
        <span>Hello Tooltip-top2!</span>
      </Tooltip>
      <Tooltip title="left" placement="left" style={{marginTop:20}}>
        <span>Hello Tooltip-left3!</span>
        <span>Hello Tooltip-left4!</span>
      </Tooltip>
      <Tooltip title="right" placement="right" style={{marginTop:20}}>
        <span>Hello Tooltip-right5!</span>
        <span>Hello Tooltip-right6!</span>
      </Tooltip>
      <Tooltip title="bottom" placement="bottom" style={{marginTop:20}}>
        <div>Hello Tooltip-bottom7!</div>
        <div>Hello Tooltip-bottom8!</div>
      </Tooltip>
      <Tooltip title="top1" placement="top" style={{marginTop:20}} defaultVisible>
        <div>Hello Tooltip-top1!</div>
      </Tooltip>
      <Tooltip title="left1" placement="left" trigger="click" style={{marginTop:20}}>
        <button>click me！</button>
      </Tooltip>
      <Tooltip title="right1" placement="right" style={{marginTop:20}}>
        Hello Tooltip-right3!
      </Tooltip>
      <Tooltip title="bottom1" placement="bottom" style={{marginTop:20}}>
        <div>Hello Tooltip-bottom4!</div>
      </Tooltip>
    </div>
    
    );
