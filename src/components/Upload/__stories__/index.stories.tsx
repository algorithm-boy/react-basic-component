import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Upload from '../index';
import UploadReadMe from '../README.md';
import './index.less';

storiesOf('Upload', module)
  .addParameters({
    readme: {
      sidebar: UploadReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('Basic Use', () => <button  className='hfdc-demo-upload-btn' >Upload<Upload action='http://hupu.com' /></button>)
  .add('Upload IMG - Mutiple', () => (
    <>
      <div className='hfdc-demo-upload'>
        <i className='hfdc-demo-upload-cross'/>
        <Upload
          action='http://all-backend.hupu.com/admin/upload'
          accept='image'
          minCount={2}
          multiple
          onChange={files => console.info('trigger onChange', files)}
        />
      </div>
      <p className='hfdc-demo-upload-article'>音频上传，条件：多条上传，但最小个数必须大于等于2</p>
    </>
  ))
  .add('Upload Audio - Single', () => (
    <>
      <div className='hfdc-demo-upload'>
        <i className='hfdc-demo-upload-cross'/>
        <Upload
          action='http://all-backend.hupu.com/admin/upload'
          accept='audio'
        />
      </div>
      <p className='hfdc-demo-upload-article'>音频上传，条件：单条上传</p>
    </>
  ))
  .add('Upload Audio - Concatenation - 2', () => (
    <>
      <div className='hfdc-demo-upload'>
        <i className='hfdc-demo-upload-cross'/>
        <Upload
          action='http://all-backend.hupu.com/admin/upload'
          accept='all'
          uploadModel='concatenation'
          concatenation={2}
          multiple
        />
      </div>
      <p className='hfdc-demo-upload-article'>上传，条件：串行上传，且每次上传2条</p>
    </>
  ))
  .add('Upload IMG - Double - Size<=2MB', () => (
    <>
      <div className='hfdc-demo-upload'>
        <i className='hfdc-demo-upload-cross'/>
        <Upload
          action='http://all-backend.hupu.com/admin/upload'
          name='image'
          accept='image'
          size={2}
          maxCount={2}
          multiple
          onChange={files => console.info('trigger onChange', files)}
          beforeUpload={(isRequesting, files, e) => {
            console.info('isRequesting: ', isRequesting)
            console.info('files: ', files)
            console.info('e: ', e)
            return true
          }}
        />
      </div>
      <p className='hfdc-demo-upload-article'>图片上传，条件：小于等于2MB、总数小于等于2</p>
    </>
  )).add('Upload IMG - minCount > maxCount - Error', () => (
    <>
      <div className='hfdc-demo-upload'>
        <i className='hfdc-demo-upload-cross'/>
        <Upload
          action='http://all-backend.hupu.com/admin/upload'
          accept='image'
          minCount={3}
          maxCount={2}
          multiple
          onChange={files => console.info('trigger onChange', files)}
          beforeUpload={(isRequesting, files, e) => {
            console.info('isRequesting: ', isRequesting)
            console.info('files: ', files)
            console.info('e: ', e)
            return false
          }}
        />
      </div>
      <p className='hfdc-demo-upload-article'>图片上传，最小个数超过最大个数，不符合逻辑，报错</p>
    </>
  ));
