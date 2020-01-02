import React, { PureComponent } from 'react';
import { Style, GeneralProps } from '../global.d';
import { createPropsGetter } from '../../utils';

export interface ProgressProps extends GeneralProps {
  progress?: number; 
  type?: string; // 类型常规，圆形
};

export interface ProgressStates {
};

const defaultProps: ProgressProps = {
  style: {} as any as Style, // 断言是any类型或者是Style类型
  className: '',
  progress: 1000,
  type: 'line'
};

// type意思是声明一个
type DefaultProps = Readonly<typeof defaultProps>; // Readonly只读属性，类似于const，值、类型不可改变
const getProps = createPropsGetter(defaultProps);

class Progress extends PureComponent<ProgressProps & DefaultProps, ProgressStates> {
  static defaultProps = defaultProps;

  public render() {
    const {
      progress,
      type,
    } = getProps(this.props);

    const rotateRight = progress as number >= 50 ? 45 : progress as number / 50 * 180 - 135;
    const rotateLeft = progress as number > 50 ? (progress as number - 50) / 50 * 180 - 135 : -135;

    return (
      <div>
        {
          type === 'line' ?
            <div
              className='progress-section'
            >
              <div
                className='progress-parent'
              >
                <div
                  className='progress-children'
                  style={{width: `${progress as number / 100 * 200}px`}}
                >
                </div>
              </div>
              <p className='process-text'
              >
                {`${progress}%`}
              </p>
              <style>
                {`
              .progress-section {
                width: 240px;
                height: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .progress-parent {
                width: 200px;
                height: 10px;
                // border: 2px solid #f5f5f5;
                background: #f5f5f5;
                border-radius: 10px;
                overflow: hidden;
              }
              .progress-children {
                width: 100px;
                height: 10px;
                background: green;
              }
              .process-text {
                font-size: 10px;
                color: green;
              }
            `}
              </style>
            </div>
            :
            null
        }
        {
          type === 'circle' ?
            <div>
              <div 
                className="circle_process"
              >
                {progress}%
                <div 
                  className="wrapper right"
                >
                  <div 
                    className="circle rightcircle"
                  >
                  </div>
                </div>
                <div 
                  className="wrapper left"
                >
                  <div 
                    className="circle leftcircle" 
                    id="leftcircle"
                  >
                  </div>
                </div>
              </div>
              <style>
                {`
                .circle_process{
                  position: relative;
                  width: 100px;
                  height : 100px;
                  line-height: 100px;
                  text-align: center;
                  color: green;
                }
                .circle_process .wrapper{
                  width: 50px;
                  height: 100px;
                  position: absolute;
                  top: 0;
                  overflow: hidden;
                }
                .circle_process .right{
                  right: 0;
                }
                .circle_process .left{
                  left: 0;
                }
                .circle_process .circle{
                  width: 80px;
                  height: 80px;
                  border: 10px solid #F5F5F5;
                  border-radius: 50%;
                  position: absolute;
                  top: 0;
                }
                .circle_process .rightcircle{
                  border-top: 10px solid green;
                  border-right: 10px solid green;
                  right: 0;
                  transform: rotate(${rotateRight}deg);
                }
                .circle_process .leftcircle{
                  border-bottom: 10px solid green;
                  border-left: 10px solid green;
                  left: 0;
                  transform: rotate(${rotateLeft}deg);
                }
             `}  
              </style>
            </div>
            :
            null
        }
      </div>
    );
  };
};

export default Progress;

// type Foo = {
//   bar: number;
//   bas: number;
// };

// type FooReadonly = Readonly<Foo>;

// const foo: Foo = { bar: 123, bas: 456 };
// const fooReadonly: FooReadonly = { bar: 123, bas: 456 };

// foo.bar = 456; // ok
// fooReadonly.bar = 456; // Error: bar 属性只读
