import React, { PureComponent, ReactElement } from 'react';
import { Style, GeneralProps } from '../global.d';
import { createPropsGetter } from '../../utils';
import classNames from 'classnames';

function isString(str: any) {
  return typeof str === 'string';
}

interface ProgressDotFnParams {
  index: number;
  status: string;
  title: string;
  description: string;
}
type ProgressDotFn = (iconDot: ReactElement, params: ProgressDotFnParams) => ReactElement;

export interface StepProps extends GeneralProps {
  className?: string;
  prefixCls?: string;
  style?: object;
  wrapperStyle?: object;
  itemWidth?: number | string;
  active?: boolean;
  disabled?: boolean;
  status?: string;
  iconPrefix?: string;
  icon?: string | HTMLElement;
  adjustMarginRight?: number | string;
  stepNumber?: number;
  stepIndex?: number;
  description?: string;
  title: string;
  subTitle?: any;
  progressDot?: boolean | ProgressDotFn;
  tailContent?: any;
  icons?: {
    finish: (path: string) => HTMLElement;
    error: (path: string) => HTMLElement;
  };
  onClick?: () => void;
  onStepClick?: () => {};
};

export interface StepStates {

};

const defaultProps = {
  style: {} as any as Style,
  className: ''
};

type DefaultProps = Readonly<typeof defaultProps>;

const getProps = createPropsGetter(defaultProps);

class Step extends PureComponent<StepProps & DefaultProps, StepStates> {
  static defaultProps = defaultProps;

  public renderIconNode() {
    const {
      prefixCls = 'rc-steps',
      progressDot,
      stepNumber = 1,
      status = '',
      title,
      description = '',
      icon,
      iconPrefix = '',
      icons,
    } = this.props;
    let iconNode;
    const iconClassName = classNames(`${prefixCls}-icon`, `${iconPrefix}icon`, {
      [`${iconPrefix}icon-${icon}`]: icon && isString(icon),
      [`${iconPrefix}icon-check`]: !icon && status === 'finish' && (icons && !icons.finish),
      [`${iconPrefix}icon-close`]: !icon && status === 'error' && (icons && !icons.error),
    });
    const iconDot = <span className={`${prefixCls}-icon-dot`} />;
    // `progressDot` enjoy the highest priority
    if (progressDot) {
      if (typeof progressDot === 'function') {
        iconNode = (
          <span className={`${prefixCls}-icon`}>
            {progressDot(iconDot, {
              index: stepNumber - 1,
              status,
              title,
              description,
            })}
          </span>
        );
      } else {
        iconNode = <span className={`${prefixCls}-icon`}>{iconDot}</span>;
      }
    } else if (icon && !isString(icon)) {
      iconNode = <span className={`${prefixCls}-icon`}>{icon}</span>;
    } else if (icons && icons.finish && status === 'finish') {
      iconNode = <span className={`${prefixCls}-icon`}>{icons.finish}</span>;
    } else if (icons && icons.error && status === 'error') {
      iconNode = <span className={`${prefixCls}-icon`}>{icons.error}</span>;
    } else if (icon || status === 'finish' || status === 'error') {
      iconNode = <span className={iconClassName}>{stepNumber}</span>;
    } else {
      iconNode = <span className={`${prefixCls}-icon`}>{stepNumber}</span>;
    }

    return iconNode;
  }

  public render() {
    const {
      className,
      prefixCls,
      style,
      itemWidth,
      active,
      status = 'wait',
      iconPrefix = 'rc-step',
      icon,
      wrapperStyle,
      adjustMarginRight,
      stepNumber = 1,
      disabled,
      description = '',
      title,
      subTitle,
      progressDot,
      tailContent,
      icons,
      stepIndex,
      onStepClick,
      onClick = () => {},
      ...restProps
    } = this.props;
  
    const classString = classNames(`${prefixCls}-item`, `${prefixCls}-item-${status}`, className, {
      [`${prefixCls}-item-custom`]: icon,
      [`${prefixCls}-item-active`]: active,
      [`${prefixCls}-item-disabled`]: disabled === true,
    });
    const stepItemStyle = { ...style };
    if (itemWidth) {
      stepItemStyle.width = itemWidth;
    }
    if (adjustMarginRight) {
      stepItemStyle.marginRight = adjustMarginRight;
    }

    interface AccessibilityProps {
      role: string;
      tabIndex: number;
      onClick: () => void;
    }
  
    const accessibilityProps: AccessibilityProps = {role: '', tabIndex: 0, onClick: () => {}};
    if (onStepClick && !disabled) {
      accessibilityProps.role = 'button';
      accessibilityProps.tabIndex = 0;
    }

    return (
      <div {...restProps} className={classString} style={stepItemStyle}>
        <div onClick={onClick} {...accessibilityProps} className={`${prefixCls}-item-container`}>
          <div className={`${prefixCls}-item-tail`}>{tailContent}</div>
          <div className={`${prefixCls}-item-icon`}>{this.renderIconNode()}</div>
          <div className={`${prefixCls}-item-content`}>
            <div className={`${prefixCls}-item-title`}>
              {title}
              {subTitle && (
                <div title={subTitle} className={`${prefixCls}-item-subtitle`}>
                  {subTitle}
                </div>
              )}
            </div>
            {description && <div className={`${prefixCls}-item-description`}>{description}</div>}
          </div>
        </div>
      </div>
    );
  };
};

export default Step;
