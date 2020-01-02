import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Popconfirm from '../index';
import PopconfirmReadMe from '../README.md';

storiesOf('Popconfirm', module)
  .addParameters({
    readme: {
      sidebar: PopconfirmReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('Basic Use', () => (
    <div className="basic-use">
      <Popconfirm
        onConfirm={()=>{console.log('确认按钮被点击')}}
        onCancel={()=>{console.log('取消按钮被点击')}}
        content="自定自定义提示语自定"
        confirmTxt="我要删除"
        cancelTxt="我要取消">
        <button>删除</button>
      </Popconfirm>
    </div>
  ))
