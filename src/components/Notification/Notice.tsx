import React, { Component, MouseEvent, MouseEventHandler } from 'react';
import classnames from 'classnames';
import { GeneralProps } from '../global.d';
import { createPropsGetter } from '../../utils';

export interface NoticeProps extends GeneralProps {
  duration?: number; // 时长
  update?: boolean; //是否更新
  prefixCls?: string; // class 前缀
  closable?: boolean; // 是否可关闭
  className?: string; // class
  closeIcon: boolean; // close icon
  style?: {           // style
    [propName: string]: string;
  };
  onClose?: () => void; // 关闭触发
  onClick?: () => void;  // 点击触发
};

export interface Timeout {
  hasRef(): boolean;
  ref(): this;
  refresh(): this;
  unref(): this;
}

export interface NoticeStates {

};

type DefaultProps = typeof defaultProps;
type Props = NoticeProps & Partial<DefaultProps>;

const defaultProps = {
  prefixCls: 'hp',
  duration: 1.5,
  style: {
    'right': '50%',
  },
  onClose: () => { },
};

const getProps = createPropsGetter(defaultProps);

class Notice extends Component<Props, NoticeStates> {
  static defaultProps = defaultProps;

  public closeTimer = 0;

  componentDidMount() {
    this.startCloseTimer();
  }

  componentDidUpdate(prevProps: NoticeProps) {
    if (this.props.duration !== prevProps.duration || this.props.update) {
      this.restartCloseTimer();
    }
  }

  componentWillUnmount() {
    // 组件卸载了，清除定时器
    this.clearCloseTimer();
  }

  /**
   * 点击X关闭操作
   *
   * @memberof Notice
   */
  close: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (event): void => {
    if (event) {
      event.stopPropagation();;
    }
    this.clearCloseTimer();
    const { onClose } = getProps(this.props);
    onClose();
  }

  /**
   * 启动关闭组件的定时器
   * @duration 默认为1.5秒。duration不能设置为0和null, undefined
   * 
   * @memberof Notice
   */
  startCloseTimer = () => {
    const { duration } = getProps(this.props);
    if (duration) {
      this.closeTimer = window.setTimeout(() => {
        (this.close as any)();
      }, duration * 1000);
    }
  }

  /**
   * 清除定时器，并将this.closeTimer设置为null
   * 
   * @memberof Notice
   */
  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = 0;
    }
  }

  /**
   * 重启关闭组件的定时器。重启前，先清除定时器
   *
   * @memberof Notice
   */
  restartCloseTimer() {
    this.clearCloseTimer();
    this.startCloseTimer();
  }

  render() {
    const {
      prefixCls,
      closable,
      className,
      style,
      onClick,
      children,
      closeIcon
    } = getProps(this.props);
    const componentClass = `${prefixCls}-notice`;
    const wrapCls = classnames(componentClass, className, {
      [`${componentClass}-closable`]: closable
    });
    return (
      <div
        className={wrapCls}
        style={style}
        onMouseEnter={this.clearCloseTimer}
        onMouseLeave={this.startCloseTimer}
        onClick={onClick}
      >
        <div className={`${componentClass}-content`}>{children}</div>
        {closable ?
          <a
            onClick={this.close}
            className={`${componentClass}-close`}>
            {closeIcon || <span className={`${componentClass}-close-x`} />}
          </a> : null
        }
      </div>
    );
  }
}

export default Notice;