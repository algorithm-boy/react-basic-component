import React, { PureComponent, cloneElement, Children } from 'react';
import { Style, GeneralProps } from '../global.d';
import { createPropsGetter } from '../../utils';
import { findDOMNode } from 'react-dom';
import debounce from 'lodash/debounce';
import Step from './Step';
import classNames from 'classnames';

export interface StepsProps extends GeneralProps {
  type?: string;
  prefixCls?: string;
  className?: string;
  iconPrefix?: string;
  direction?: string;
  progressDot?: string;
  labelPlacement?: string;
  children?: any;
  status?: string;
  size?: string;
  style?: object;
  initial?: number;
  current: number;
  icons?: {
    finish: (path: string) => HTMLElement;
    error: (path: string) => HTMLElement;
  };
  onChange?: (next: string) => {};
};

export interface StepsStates {
  lastStepOffsetWidth: number;
  flexSupported: boolean;
};

const defaultProps = {
  style: {} as any as Style,
  className: ''
};

type DefaultProps = Readonly<typeof defaultProps>;

const getProps = createPropsGetter(defaultProps);

class Steps extends PureComponent<StepsProps & DefaultProps, StepsStates> {
  static Step = Step;
  static defaultProps = defaultProps;

  static calcTimeout: number;
  constructor(props: StepsProps & DefaultProps) {
    super(props);
    this.state = {
      flexSupported: true,
      lastStepOffsetWidth: 0,
    };
    this.calcStepOffsetWidth = debounce(this.calcStepOffsetWidth, 150);
  }

  componentDidMount() {
    this.calcStepOffsetWidth();
    if (!this.isFlexSupported()) {
      this.setState({
        flexSupported: false,
      });
    }
  }

  componentDidUpdate() {
    this.calcStepOffsetWidth();
  }

  componentWillUnmount() {
    if (Steps.calcTimeout) {
      clearTimeout(Steps.calcTimeout);
    }
  }

  public isFlexSupported = () => {
    if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
      const { documentElement } = window.document;
      return (
        'flex' in documentElement.style ||
        'webkitFlex' in documentElement.style ||
        'Flex' in documentElement.style ||
        'msFlex' in documentElement.style
      );
    }
    return false;
  }

  onStepClick = (next: any) => {
    const { onChange, current } = this.props;
    if (onChange && current !== next) {
      onChange(next);
    }
  };

  calcStepOffsetWidth = () => {
    if (this.isFlexSupported()) {
      return;
    }
    const { lastStepOffsetWidth } = this.state;
    // Just for IE9

    const domNode: Element | null | Text = findDOMNode(this);
    if (domNode && (domNode as Element).children.length > 0) {
      if (Steps.calcTimeout) {
        clearTimeout(Steps.calcTimeout);
      }
      Steps.calcTimeout = setTimeout(() => {
        // +1 for fit edge bug of digit width, like 35.4px
        const offsetWidth = (domNode.lastChild && (domNode.lastChild as any).offsetWidth || 0) + 1;
        // Reduce shake bug
        if (
          lastStepOffsetWidth === offsetWidth ||
          Math.abs(lastStepOffsetWidth - offsetWidth) <= 3
        ) {
          return;
        }
        this.setState({ lastStepOffsetWidth: offsetWidth });
      });
    }
  };

  public render() {
    const {
      prefixCls = 'rc-steps',
      style = {},
      className,
      children,
      direction,
      type,
      labelPlacement = 'horizontal',
      iconPrefix,
      status,
      size,
      current,
      progressDot,
      initial = 0,
      icons,
      onChange,
      ...restProps
    } = this.props;
    const isNav = type === 'navigation';
    const { lastStepOffsetWidth, flexSupported } = this.state;
    const filteredChildren = React.Children.toArray(children).filter(c => !!c);
    const lastIndex = filteredChildren.length - 1;
    const adjustedlabelPlacement = progressDot ? 'vertical' : labelPlacement;
    const classString = classNames(prefixCls, `${prefixCls}-${direction}`, className, {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-label-${adjustedlabelPlacement}`]: direction === 'horizontal',
      [`${prefixCls}-dot`]: !!progressDot,
      [`${prefixCls}-navigation`]: isNav,
      [`${prefixCls}-flex-not-supported`]: !flexSupported,
    });

    return (
      <div className={classString} style={style} {...restProps}>
        {Children.map(filteredChildren, (child, index) => {
          if (!child) {
            return null;
          }
          const stepNumber = initial + index;
          const childProps = {
            stepNumber: `${stepNumber + 1}`,
            stepIndex: stepNumber,
            prefixCls,
            iconPrefix,
            wrapperStyle: style,
            progressDot,
            icons,
            onStepClick: onChange && this.onStepClick,
            ...child.props,
          };
          if (!flexSupported && direction !== 'vertical') {
            if (isNav) {
              childProps.itemWidth = `${100 / (lastIndex + 1)}%`;
              childProps.adjustMarginRight = 0;
            } else if (index !== lastIndex) {
              childProps.itemWidth = `${100 / lastIndex}%`;
              childProps.adjustMarginRight = -Math.round(lastStepOffsetWidth / lastIndex + 1);
            }
          }
          // fix tail color
          if (status === 'error' && index === current - 1) {
            childProps.className = `${prefixCls}-next-error`;
          }
          if (!child.props.status) {
            if (stepNumber === current) {
              childProps.status = status;
            } else if (stepNumber < current) {
              childProps.status = 'finish';
            } else {
              childProps.status = 'wait';
            }
          }
          childProps.active = stepNumber === current;
          return cloneElement(child, childProps);
        })}
      </div>
    );
  };
};

export default Steps;
