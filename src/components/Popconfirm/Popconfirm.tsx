import React, { PureComponent } from 'react';
import { Style, GeneralProps } from '../global.d';
import { createPropsGetter } from '../../utils';
// import './style/index.less';

export interface PopconfirmProps extends GeneralProps {
  content?: string;
  confirmTxt?: string;
  cancelTxt?: string;
  onConfirm?: Function;
  onCancel?: Function;
};

export interface PopconfirmStates {
  visible: boolean;
};

const defaultProps = {
  style: {} as any as Style,
  className: ''
};

type DefaultProps = Readonly<typeof defaultProps>;

const getProps = createPropsGetter(defaultProps);

class Popconfirm extends PureComponent<PopconfirmProps & DefaultProps, PopconfirmStates> {
  static defaultProps = defaultProps;

  public constructor (props: PopconfirmProps & DefaultProps) {
    super(props);
    this.state = {
      visible: false
    };
  }

  public handleVisible = () =>{
    this.setState({
      visible: true
    });
  }

  public handleConfirm = () =>{
    const { onConfirm } = getProps(this.props);
    onConfirm?onConfirm():'';
    
    setTimeout(() => {
      this.setState({
        visible: false
      });
    }, 0);
  }

  public handleCancel = () =>{
    const { onCancel } = getProps(this.props);
    onCancel?onCancel():'';

    setTimeout(() => {
      this.setState({
        visible: false
      });
    }, 0);
  }

  public render() {
    const { className, style, children, content, confirmTxt, cancelTxt, onConfirm, onCancel } = getProps(this.props);
    const {handleVisible,handleConfirm,handleCancel} = this;
    const {visible} = this.state;
    return (
      <div
        className={className?className:'hfdc-popconfirm'}
        style={style}
        onClick={handleVisible}
      >
        {children}
        <div className="popTip" style={{display:visible?'block':'none'}}>
          <div className="arr"></div>
          <div className="content">{content || '确定执行此操作吗'}</div>
          <div className="action">
            <button className="cancleBtn" onClick={handleCancel}>{cancelTxt || '取消'}</button>
            <button className="okBtn" onClick={handleConfirm}>{confirmTxt || '删除'}</button>
          </div>
        </div>
      </div>
    );
  };
};

export default Popconfirm;
