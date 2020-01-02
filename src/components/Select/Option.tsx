import * as PropTypes from 'prop-types';
import React, {Component} from 'react';
import cls from 'classnames';

const noop = () => null;


export interface IOptProps {
  title: string | number;
  label: string | number;
  value: string | number;
  extra: object | string;
  className: string;
  disabled: boolean;
  opt: any;
  prefixCls: string;
  index?: number;
  optActive?: boolean;
  optCurrent?: boolean;
  props?: any;
  selected?: boolean;
  onClick: any;
  onMouseOver: any;
  popupCls?: string;
  resetCls?: string;
  selectPrefixCls?: string;
  style?: object;
}

export default class Option extends Component<Partial<IOptProps>> {
  public static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func
  };
  public static defaultProps = {
    onClick: noop,
  };


  private handleClick = (e: any) => {
    e.stopPropagation();
    this.props.onClick(this.props.index);
  };

  private handleMouseOver = () => {
    this.props.onMouseOver(this.props.index);
  };


  public render() {
    const {style:optionStyle,children, prefixCls: prefix = 'hupu-select', optActive, opt, optCurrent,className,resetCls,selectPrefixCls} = this.props;
    const classnames = selectPrefixCls?[
      className,
      resetCls,
      `${selectPrefixCls}-option`,
      {[`${selectPrefixCls}-disabled`]: opt.props.disabled},
      {[`${selectPrefixCls}-current`]: optCurrent},
      {[`${selectPrefixCls}-active`]: optActive},
    ]: [
      className,
      resetCls,
      `${prefix}-option`,
      {[`${prefix}-disabled`]: opt.props.disabled},
      {[`${prefix}-current`]: optCurrent},
      {[`${prefix}-active`]: optActive},
    ];

    return (
      <React.Fragment>
        {children && <span
          style={optionStyle}
          onClick={this.handleClick}
          onMouseOver={this.handleMouseOver}
          className={cls(classnames)}>{children}</span>
        }
      </React.Fragment>
    );
  }
}
