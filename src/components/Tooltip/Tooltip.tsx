import React, { PureComponent, ReactNode, createRef, MouseEvent } from 'react';
import { Style, GeneralProps } from '../global.d';
import { createPropsGetter } from '../../utils';
import classnames from 'classnames';

export interface TooltipProps extends GeneralProps {
  title: string | ReactNode;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean;
  defaultVisible?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  overlayClassName?: string;
  overlayStyle?: object;
  placement?: string;
  trigger?: string;
  visible?: boolean;
  prefix?: string;

  onVisibleChange?: (visible: boolean) => void;
};

export interface TooltipStates { };

const defaultProps = {
  style: {} as any as Style,
  className: '',
  arrowPointAtCenter: false,
  autoAdjustOverflow: true,
  defaultVisible: false,
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  overlayClassName: '',
  overlayStyle: {},
  placement: 'top',
  trigger: 'hover',
  // visible: false,
  prefix: 'hfdc-tooltip'
};

class EventHandlers {
  onClick? : () => void;
  onMouseDown? : (e?: MouseEvent) => void;
  onMouseOver? : (e?: MouseEvent) => void;
  onMouseLeave? : (e?: MouseEvent) => void;
  onTouchStart? : () => void;
  onFocus? : () => void;
  onBlur? : () => void;
  onContextMenu? : () => void;
  getTargetEle? : () => void;
}

type DefaultProps = Readonly<typeof defaultProps>;

const getProps = createPropsGetter(defaultProps);

class Tooltip extends PureComponent<TooltipProps & DefaultProps, TooltipStates> {
  static defaultProps = defaultProps;
  private targetRef = createRef<HTMLDivElement>();
  private tipRef = createRef<HTMLDivElement>();
  private clickTime = 0 ;
  private delayTimer?: any;
  
  state = {
    prevPopupVisible: 'visible' in this.props ? !!this.props.visible : !!this.props.defaultVisible,
    popupVisible : 'visible' in this.props ? !!this.props.visible : !!this.props.defaultVisible,
    targetHeight : 0,
    targetWidth : 0,
    tipWidth : 0
  }
  componentDidMount () {
    if (('visible' in this.props) || this.props.defaultVisible) {
      this.setState({
        targetHeight: this.targetRef.current ? this.targetRef.current.getBoundingClientRect().height : 0,
        targetWidth: this.targetRef.current ? this.targetRef.current.getBoundingClientRect().width : 0,
        tipWidth : this.tipRef.current ? this.tipRef.current.getBoundingClientRect().width : 0,
      });
    }
  }

  handleMouseOver  = () => {
    const { mouseEnterDelay } = this.props;
    this.delaySetPopupVisible(true, mouseEnterDelay);
  }
  handleMouseOut = () => {
    const { mouseLeaveDelay } = this.props;
    this.delaySetPopupVisible(false, mouseLeaveDelay);
  }
  onClick = () => {
    const { popupVisible: prevPopupVisible } = this.state;
    if (Math.abs(Date.now() - this.clickTime) < 20) {
      return;
    }else {
      this.clickTime = Date.now();
      if (prevPopupVisible) {
        this.handleMouseOut();
      } else {
        this.handleMouseOver();
      }
    }
  }
  delaySetPopupVisible = (visible: boolean,delayS: number) => {
    const delay = delayS * 1000;
    this.clearDelayTimer();
    if (delay) {
      this.delayTimer = setTimeout(() => {
        this.setPopupVisible(visible);
        this.clearDelayTimer();
      }, delay);
    }else {
      this.setPopupVisible(visible);
    }
  }
  clearDelayTimer= ()=> {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  }
  /**
   * @param popupVisible    Show or not the popup element
   */
  setPopupVisible(popupVisible: boolean) {
    const { popupVisible: prevPopupVisible } = this.state;
    const { onVisibleChange } = this.props;
    this.clearDelayTimer();
    if (prevPopupVisible !== popupVisible) {
      if (!('visible' in this.props)) {
        this.setState({
          popupVisible, prevPopupVisible,
          targetHeight: this.targetRef.current ? this.targetRef.current.getBoundingClientRect().height : 0,
          targetWidth: this.targetRef.current ? this.targetRef.current.getBoundingClientRect().width : 0,
        }, ()=> {
          this.setState({
            tipWidth : this.tipRef.current ? this.tipRef.current.getBoundingClientRect().width : 0
          });
        });
      }
      onVisibleChange && onVisibleChange(popupVisible);
    }
  }
  getTipPosition = () => {
    const { targetHeight, targetWidth, tipWidth} = this.state;
    switch (this.props.placement) {
      case 'left':
        return {
          marginTop: `-${targetHeight}px`,
          marginLeft: `-${tipWidth+20}px`
        };
      case 'right':
        return {
          marginTop: `-${targetHeight}px`,
          marginLeft: `${targetWidth+20}px`
        };
      case 'bottom':
        return {
          
        };
      default:
        return {
          marginTop: `-${targetHeight+20}px`
        };
    }
  }

  public render() {
    const { className, style, children, prefix, placement, title, trigger } = getProps(this.props);
    const { popupVisible } = this.state;

    const classes_popup = classnames({
      [prefix]: true,
      [`${prefix}-placement-${placement}`]: true,
      [`${prefix}-open`]: popupVisible,
      [`${prefix}-hidden`]: !popupVisible
    });

    const popupProps: EventHandlers = {};
    if (trigger === 'hover') {
      popupProps.onMouseOver = this.handleMouseOver;
      popupProps.onMouseLeave = this.handleMouseOut;
    }
    if (trigger === 'click') {
      popupProps.onClick = this.onClick;
    }
    if (trigger === 'focus') {
      popupProps.onFocus = this.handleMouseOver;
      popupProps.onBlur = this.handleMouseOut;
    }

    return (
      <div>
        {
          typeof children === 'string' || React.Children.count(children) > 1 ? 
            <div
              className={`hfdc-tooltip-children ${className}`}
              style={style}
              {...popupProps}
              ref={this.targetRef}
            >
              {children}
            </div>
            :
            React.Children.map(children, child => {
              return React.cloneElement(child as any, {
                ref : this.targetRef,
                ...popupProps,
                style : style,
                className : className
              });
            })
        }

        <div className={classes_popup} style={this.getTipPosition()}
        >
          <div className={`${prefix}-content`}>
            <div className={`${prefix}-arrow`}></div>
            <div className={`${prefix}-inner`}>
              <span
                {...popupProps}
                ref = {this.tipRef}
              >
                {title}
              </span>
            </div>
          </div>
        </div>

        { prefix === 'hfdc-tooltip' && <style>
          {`
            .hfdc-tooltip {

            }
            .hfdc-tooltip-children {
              width:fit-content;
              width:-webkit-fit-content;
              width:-moz-fit-content;
            }
            .hfdc-tooltip-open {
              position: absolute;
            }
            .hfdc-tooltip-hidden {
              display: none;
            }
          `}
        </style> }
      </div>
    );
  };
};

export default Tooltip;
