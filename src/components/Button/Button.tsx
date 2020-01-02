import React, { PureComponent, Fragment, MouseEventHandler } from 'react';
import { Style, GeneralProps } from '../global.d';
import { createPropsGetter } from '../../utils';

export interface ButtonProps extends GeneralProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>) => any;
  disabled?: boolean;
  href?: string;
};

export interface ButtonStates {
  
};

const defaultProps = {
  style: {} as any as Style,
  className: '',
};

type DefaultProps = Readonly<typeof defaultProps>;

const getProps = createPropsGetter(defaultProps);
const opts = {};
class Button extends PureComponent<ButtonProps & DefaultProps, ButtonStates> {
  static defaultProps = defaultProps;
  constructor(props: any) {
    super(props);
  }

  private clickEvent: MouseEventHandler<HTMLDivElement | HTMLAnchorElement> = (event) => {
    const { onClick, disabled } = this.props; 
    if (disabled) {
      return;
    }
    onClick && onClick(event);
  }

  public buttonRender = () => {
    const { style, children, className, disabled } = getProps(this.props);
    
    return <Fragment>
      <div
        className={disabled ? `default disabled ${className}` : `default ${className}`}
        style={style}
        onClick={this.clickEvent}
        {...opts}
      >
        {children}
      </div>

      <style>
        {
          !className && `.default{
          width:100px;
          height:40px;
          border:1px solid #222;
          line-height:40px;
          text-align: center;
          }
          .disabled{
            color:#ccc;
            cursor:not-allowed;
          }
          
          `
        }
      </style>
    </Fragment>;
  }

  public linkRender = () => {
    const { className, style, children, href, disabled } = getProps(this.props);
    return <Fragment>
      <a
        className={disabled ? `default ${className} disabled` : `default ${className}`}
        style={style}
        href={disabled ? 'javascript:void(0)': href}
        onClick={this.clickEvent}
        {...opts}
      >
        {children}
      </a>

      <style>
        {
          !className && `.default{
            display:inline-block;
            width:100px;
            height:40px;
            line-height:40px;
            border:1px solid #222;
            text-align: center;
            text-decoration:none;
            color:#222;
          }
          .disabled{
            color:#ccc;
            cursor:not-allowed;
          }`
          
        }
      </style>
    </Fragment>;
  }

  public render() {
    const { href } = this.props;
    if (href) {
      return this.linkRender();
    }
    return this.buttonRender();

  };
};

export default Button;
