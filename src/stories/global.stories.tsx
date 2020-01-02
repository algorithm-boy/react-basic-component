import React from 'react';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import Component from '../components/index';
import ReadMe from '../../README.md';

storiesOf('HFDC-REACT-BASIC', module)
  .addParameters({
    readme: {
      sidebar: ReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
    options: {
      panelPosition: 'right'
    }
  })
  .add('to Storybook', () => {
  const keys = Object.keys(Component)
  keys.sort()
  return (
    <div className='wrapper'>
      <h2 className='title'>虎扑前端React基础组件库</h2>
      <nav className='nav'>
        <h3 className='nav-title'>组件列表</h3>
        <ul className='list'>
          {keys.map((v, k) => (
            <li key={k} className='item' onClick={linkTo(v) as (event: any) => void}>{`${v} 组件`}</li>
          ))}
        </ul>
      </nav>
      <style>{`
          .wrapper {
            width: 100%;
            height: 100%;
            margin: 0 auto;
            padding-top: 40px;
            background: #FFFFFF;
          }
          .title {
            width: 100%;
            text-align: center;
            margin: 0 auto;
            line-height: 37px;
            font-family: PingFangSC-Medium;
            font-size: 26px;
            color: #333333;
          }
          .nav{
            overflow: scroll;
            margin-left: 40px;
          }
          .nav-title{
            font-size: 20px;
            font-weight: 600;
          }
          .list{

          }
          .item{
            cursor: pointer;
            margin: 10px 0;
            font-size: 18px;
          }
          .item:hover{
            color: red;
          }
      `}</style>
    </div>
  )
});
