import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Upload from '../index';

configure({ adapter: new Adapter() });

const mockFile = new File(['foo'], 'foo.png', {
  type: 'image/png'
});

describe('Upload', () => {
  it('renders correctly - shallow', () => {
    const wrapper = shallow(
      <Upload action='http://all-backend.hupu.com/admin/upload' />
    );
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly - render', () => {
    const wrapper = render(
      <button>
        上传按钮
        <Upload action='http://all-backend.hupu.com/admin/upload' />
      </button>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly - mount', () => {
    const wrapper = mount(
      <button>
        上传按钮
        <Upload
          action='http://all-backend.hupu.com/admin/upload'
        />
      </button>
    );
    expect(wrapper.contains(<Upload
      action='http://all-backend.hupu.com/admin/upload'
    />)).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it('pass disable parameter', () => {
    const wrapper = mount(<div>
      点我上传
      <Upload
        action='http://all-backend.hupu.com/admin/upload'
        disabled
      />
    </div>);

    const uploadDOM = wrapper.find('input');
    expect(uploadDOM.props().disabled).toEqual(true);
    uploadDOM.simulate('change');
  });

  it('pass id parameter', () => {
    const wrapper = mount(<div>
      点我上传
      <Upload
        id='upload'
        action='http://all-backend.hupu.com/admin/upload'
      />
    </div>);

    expect(wrapper.find('input').props().id).toEqual('upload');
  });

  it('pass className parameter', () => {
    const wrapper = mount(<div>
      点我上传
      <Upload
        className='hp-upload'
        action='http://all-backend.hupu.com/admin/upload'
      />
    </div>);

    expect(wrapper.find('input').props().className).toEqual('hfdc-upload hp-upload');
  });

  it('pass style parameter', () => {
    const style = {
      width: '300px'
    }

    const wrapper = mount(<div>
      点我上传
      <Upload
        style={style}
        action='http://all-backend.hupu.com/admin/upload'
      />
    </div>);

    expect(wrapper.find('input').props().style).toEqual(style);
  });

  it('pass multiple parameter', () => {
    const wrapper = mount(<div>
      点我上传
      <Upload
        action='http://all-backend.hupu.com/admin/upload'
        multiple
      />
    </div>);

    const uploadDOM = wrapper.find('input');
    expect(uploadDOM.props().multiple).toEqual(true);
  });

  it('beforeUpload receive params check', done => {
    const wrapper = mount(<div>
      点我上传
      <Upload
        action='http://all-backend.hupu.com/admin/upload'
        onChange={files => {
          expect(files).toBeTruthy();
        }}
        beforeUpload={(isRequesting, files, e) => {
          expect(isRequesting).toBeFalsy();
          expect(files).toHaveLength(1);
          expect(e).toBeTruthy();
          done();
          return false
        }}
      />
    </div>);

    wrapper.find('input').simulate('change', {
      target: {
        files: [mockFile]
      }
    });
  }, 10000);

  it('trigger onException - multiple', done => {
    const wrapper = mount(<div>
      点我上传
      <Upload
        action='http://all-backend.hupu.com/admin/upload'
        onException={(type) => {
          expect(type).toEqual('count');
          done();
        }}
      />
    </div>);

    const uploadDOM = wrapper.find('input');
    expect(uploadDOM.props().multiple).toEqual(false);
    uploadDOM.simulate('change', {
      target: {
        files: [mockFile, mockFile]
      }
    });
  });

  it('trigger onException - size', done => {
    const wrapper = mount(<div>
      点我上传
      <Upload
        action='http://upload.hupu.com'
        size={-1}
        onException={(type) => {
          expect(type).toEqual('size');
          done();
        }}
      />
    </div>);

    wrapper.find('input').simulate('change', {
      target: {
        files: [mockFile]
      }
    });
  });

  it('trigger onException - count', done => {
    const wrapper = mount(<div>
      点我上传
      <Upload
        action='http://all-backend.hupu.com/admin/upload'
        maxCount={1}
        onException={(type) => {
          expect(type).toEqual('count');
          done();
        }}
      />
    </div>);

    wrapper.find('input').simulate('change', {
      target: {
        files: [mockFile, mockFile]
      }
    });
  });

  it('trigger onException - accept', done => {
    const wrapper = mount(<div>
      点我上传
      <Upload
        action='http://all-backend.hupu.com/admin/upload'
        accept={'audio'}
        onException={(type) => {
          expect(type).toEqual('accept');
          done();
        }}
      />
    </div>);

    wrapper.find('input').simulate('change', {
      target: {
        files: [mockFile]
      }
    });
  });

  it('trigger onException - api', done => {
    const wrapper = mount(<div>
      点我上传
      <Upload
        action='http://upload.hupu.com'
        onException={(type) => {
          expect(type).toEqual('api');
          done();
        }}
      />
    </div>);

    wrapper.find('input').simulate('change', {
      target: {
        files: [mockFile]
      }
    });
  });

  it('trigger onException - minCount is 3, but upload 2', done => {
    const wrapper = mount(<div>
      点我上传
      <Upload
        action='http://all-backend.hupu.com/admin/upload'
        multiple
        minCount={3}
        onException={(type) => {
          expect(type).toEqual('count');
          done();
        }}
      />
    </div>);

    wrapper.find('input').simulate('change', {
      target: {
        files: [mockFile, mockFile]
      }
    });
  });
});
