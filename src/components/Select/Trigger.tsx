import * as PropTypes from 'prop-types';
import React, {Component,} from 'react';
import {IOptProps} from './Option';
import {createPropsGetter} from '../../utils';
import cls from 'classnames';

export interface PopupProps {
  optionList: Array<IOptProps> | any;
  placeholder: string;
  prefixCls?: string;
  multiple?: boolean;

  triggerCls?: string;
  triggerSpanCls?: string;
  triggerStyle?: object;
  triggerSpanStyle?: object;
  onDelete: (deleteIndex: number, optionList: Array<IOptProps>, option: any) => void;
}

const defaultProps = {
  prefix: '',
  optionList: [],
  placeholder: '',
};

const getProps = createPropsGetter(defaultProps);

export interface PopupState {
}

export default class Trigger extends Component<PopupProps, PopupState> {
  public static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
  public static defaultProps = defaultProps;

  handleClick = (i: number, optionList: any, opt: any) => (e: any) => {
    e.stopPropagation();
    getProps(this.props).onDelete(i, optionList, opt);
  };

  public render() {
    const {
      prefixCls: prefix,
      optionList,
      placeholder,
      multiple,
      triggerCls,
      triggerSpanCls
    } = getProps(this.props);


    const className = triggerCls ? [
      triggerCls,
    ] : [
      `${prefix}-wrapper`
    ];


    return (
      <React.Fragment>
        <div className={cls(className)} style={this.props.triggerStyle}>
          {
            optionList.length === 0 ?
              <span className={`${prefix}-placeholder `}>
                {placeholder}
              </span> :
              optionList.map((opt: any, i: number) =>
                (
                  <span
                    className={cls(triggerSpanCls ? {
                      [`${triggerSpanCls}`]: true,
                      [`${prefix}-tag`]: multiple,
                      [`${prefix}-text`]: true
                    } : {
                      [`${prefix}-tag`]: multiple,
                      [`${prefix}-text`]: true
                    })}
                    style={this.props.triggerSpanStyle}
                    key={opt.key}
                  >
                    {opt.props.value || opt.props.children}
                    {
                      multiple &&
                      <i className={`${prefix}-select-delete`}
                        onClick={this.handleClick(i, optionList, opt)}/>
                    }
                  </span>
                ))
          }
        </div>
      </React.Fragment>
    );
  }
}
