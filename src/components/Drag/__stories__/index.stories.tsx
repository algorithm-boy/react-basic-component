import React, {MouseEvent, TouchEvent} from 'react';
import { storiesOf } from '@storybook/react';
import Drag from '../index';
import DragReadMe from '../README.md';


function dragStart(e:MouseEvent|TouchEvent):void{
  console.log("start")
}
function draging(e:MouseEvent|TouchEvent):void{
  console.log("draging")
}
function dragEnd(e:MouseEvent|TouchEvent):void{
  console.log("end")
}

storiesOf('Drag', module)
  .addParameters({
    readme: {
      sidebar: DragReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('basic use', () =>(
    <Drag onDragStart={dragStart}
          onDragMoving={draging}
          onDragEnd={dragEnd}>
      <div className='dragable-box'>Drag Box</div>
      <style>{`
        .dragable-box{
          width:100px;
          height:100px;
          border:solid 1px grey;
          text-align:center;
          line-height:100px;
        }
      `}</style>
    </Drag>
  )
);
