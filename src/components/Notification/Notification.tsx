import React, { PureComponent } from 'react';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Notice from './Notice';
import { GeneralProps } from '../global.d';
import { createPropsGetter } from '../../utils';

export interface NoticeProps {
  key: string;
  updateKey?: string;
  content: any;
  onClick: () => void;
}

export interface NotificationProps extends GeneralProps {
  className?: string;
  transitionName?: string;
  animation?: string;
  prefixCls?: string;
  maxCount?: number;
  closeIcon?: boolean;
};

export interface NotificationStates {
  notices: NoticeProps[];
};

type DefaultProps = typeof defaultProps;
type Props = NotificationProps & Partial<DefaultProps>;

let seed = 0;
const now: number = Date.now();
const defaultProps = {
  className: '',
  prefixCls: 'hp-notification',
  animation: 'show',
  style: {
    top: 65,
    left: '50%',
  },
  maxCount: 0
};
const getProps = createPropsGetter(defaultProps);

function getUuid() {
  return `hpNotification_${now}_${seed++}`;
}

class Notification extends PureComponent<Props, NotificationStates> {
  static defaultProps = defaultProps;
  static newInstance: (properties: any, callback: any) => void;

  state = {
    notices: [],
  };

  /**
   * add方法保证了notice不会重复加入到notices队列中
   *
   * @memberof Notification
   */
  add = (notice: NoticeProps) => {
    // key表示一个notice的id
    const key = notice.key = notice.key || getUuid();
    const { maxCount } = getProps(this.props);

    this.setState(previousState => {
      const notices = previousState.notices;
      // 要添加的notice是否已经存在
      const noticeIndex = notices.map(v => v.key).indexOf(key);
      // 使用concat()来复制notice数组
      const updatedNotices = notices.concat();
      // 如果要加的notice已经存在
      if (noticeIndex !== -1) {
        // 删除已存在的notice，加入要添加的notice
        updatedNotices.splice(noticeIndex, 1, notice);
      } else {
        // 如果设置了maxCount，且notices中的数量已达到maxCount的限制，那么移除第一个notice
        if (maxCount && notices.length >= maxCount) {
          // updateKey设置为最初移除的key，最要是为了利用已存在的组件
          notice.updateKey = updatedNotices[0].updateKey || updatedNotices[0].key;
          updatedNotices.shift();
        }
        // 加入的要添加的notice
        updatedNotices.push(notice);
      }
      return {
        notices: updatedNotices,
      };
    });
  }
  /**
   * 删除notices
   *
   * @memberof Notification
   */
  remove = (key: string) => {
    this.setState(previousState => {
      return {
        notices: previousState.notices.filter(notice => notice.key !== key),
      };
    });
  }

  render() {
    const {
      prefixCls,
      closeIcon,
      className,
      style,
      animation
    } = getProps(this.props);

    const { notices } = this.state;

    const noticeNodes = notices.map((notice: any, index: number) => {
      // 如果notice是数组最后一个，且存在updateKey。
      // 说明该notice添加进来之前，数组已经达到maxCount,并挤掉了数组的第一个noitce。
      // update 为true，是由于重用了之前被挤掉的notice的组件，需要更新重启Notice组件的定时器
      const update = Boolean(index === notices.length - 1 && notice.updateKey);
      // key相同，若组件属性有所变化，则react只更新组件对应的属性；没有变化则不更新。
      const key = notice.updateKey ? notice.updateKey : notice.key;
      // createChainedFunction目的是，让this.remove函数,notice.onClose函数能够接收相同的参数，并一同调用。
      // 即调用onClose时，会先调用this.remove,再调用notice.onClose
      const onClose = () => {
        this.remove(notice.key);
        notice.onClose && notice.onClose();
      };
      return (
        <CSSTransition
          key={index}
          timeout={300}
          classNames={animation}
        >
          <Notice
            prefixCls={prefixCls}
            {...notice}
            key={key}
            update={update}
            onClose={onClose}
            onClick={notice.onClick}
            closeIcon={closeIcon}
          >
            {notice.content}
          </Notice>
        </CSSTransition>
      );
    });
    const wrapCls = classnames(prefixCls, {
      [className]: !!className,
    });

    // 待处理
    return (
      <div className={classnames(wrapCls)} style={style}>
        <TransitionGroup>
          {noticeNodes}
        </TransitionGroup>
        <style>
          {`            
            .show-enter {
              opacity: 0;
              transform: scale(1) ;
            }
            .show-enter-active {
              opacity: 1;
              transform: scale(1) translateY(0%);
              transition: all 300ms ease-out;
            }
            .show-exit {
              opacity: 1;
              transform: scale(1) translateY(0%);
            }
            .show-exit-active {
              opacity: 0;
              transform: scale(1) translateY(50%);
              transition: all 300ms ease-out;
            }            
          `}
        </style>
      </div>
    );
  };
};

Notification.newInstance = function newNotificationInstance(properties, callback) {
  const { getContainer = null, ...props } = properties || {};
  const div = document.createElement('div');
  if (getContainer) {
    const root = getContainer();
    root.appendChild(div);
  } else {
    document.body.appendChild(div);
  }
  let called = false;
  function ref(notification: { add: (arg0: any) => void; remove: (arg0: any) => void }) {
    if (called) {
      return;
    }
    called = true;
    callback({
      notice(NoticeProps: any) {
        notification.add(NoticeProps);
      },
      removeNotice(key: any) {
        notification.remove(key);
      },
      destroy() {
        ReactDOM.unmountComponentAtNode(div);
        (div.parentNode as HTMLElement).removeChild(div);
      },
    });
  }
  ReactDOM.render(<Notification {...props} ref={ref} />, div);
};

export default Notification;
