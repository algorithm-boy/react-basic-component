import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { listenKeyboard, clearKeyboardListener } from 'peeler-js';
import { ListenerCallBack } from 'peeler-js/dist/listenKeyboard/index.d';
import { Style, GeneralProps } from '../global.d';
import { createPropsGetter, logger } from '../../utils';

export type autoFocusFn = (handleFocus: (isFocus: boolean) => void) => any;

export interface InputProps extends GeneralProps {
  type?: 'text' | 'password';
  id?: string;
  prefixCls?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  clipboardFree?: boolean;
  copyFree? : boolean;
  pasteFree? : boolean;
  cutFree? : boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: string) => any;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => any;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => any;
  onPaste?: (e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.ClipboardEvent<HTMLInputElement>) => any;
  onContextMenu?: (e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.ClipboardEvent<HTMLInputElement>) => any;
  onCopy?: (e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.ClipboardEvent<HTMLInputElement>) => any;
  onCut?: (e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.ClipboardEvent<HTMLInputElement>) => any;
  onRise?: ListenerCallBack;
  onFold?: ListenerCallBack;
  autoFocus?: autoFocusFn | boolean;
};

export interface InputStates {
  value?: string;
};

const defaultProps = {
  style: {} as any as Style,
  className: '',
  type: 'text',
  prefixCls: 'hfdc-input',
  maxLength: Infinity,
  clipboardFree: true,
  copyFree: true,
  pasteFree: true,
  cutFree: true,
  autoFocus: false as autoFocusFn | boolean
};

type DefaultProps = Readonly<typeof defaultProps>;

const getProps = createPropsGetter(defaultProps);

class Input extends PureComponent<InputProps & DefaultProps, InputStates> {
  static defaultProps = defaultProps;
  protected nodeRef: React.RefObject<HTMLInputElement>;

  constructor (props: InputProps & DefaultProps) {
    super(props);
    this.state = {
      value: (typeof props.value === 'undefined' ? props.defaultValue : props.value) || ''
    };

    this.nodeRef = React.createRef<HTMLInputElement>();
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClipboard = this.handleClipboard.bind(this);
    this.manualFocus = this.manualFocus.bind(this);

    if (typeof props.autoFocus === 'function') {
      props.autoFocus(this.manualFocus);
    }
  }

  static getDerivedStateFromProps(nextProps: InputProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value
      };
    }
    return null;
  }

  public componentDidMount () {
    const node = this.nodeRef.current as HTMLInputElement;
    const { onRise, onFold, autoFocus } = getProps(this.props);

    if (autoFocus && typeof autoFocus === 'boolean') {
      // auto focus when trigger componentDidMount life-circle
      this.manualFocus(autoFocus);
    }

    listenKeyboard(node, onRise, onFold);
  }

  public componentWillUnmount () {
    const node = this.nodeRef.current as HTMLInputElement;
    clearKeyboardListener(node);
  }

  private handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { onChange } = getProps(this.props);
    const currentVal = e.target.value;

    if (!('value' in this.props)) {
      this.setState({ value: currentVal });
    }

    onChange && onChange(e, currentVal);
  }

  private handleFocus (e: React.FocusEvent<HTMLInputElement>) {
    const { onFocus } = getProps(this.props);
    onFocus && onFocus(e);
  }

  public manualFocus (isFocus: boolean): void {
    const node = this.nodeRef.current;
    if (!node) return logger.logWarn('Input - cannot evoke the function because the DOM not initialize yet');
    if (!!isFocus) {
      node.focus();
    } else {
      node.blur();
    }
  }

  private handleBlur (e: React.FocusEvent<HTMLInputElement>) {
    const { onBlur } = getProps(this.props);
    onBlur && onBlur(e);
  }

  private handleKeyDown (e: React.KeyboardEvent<HTMLInputElement>): void {
    const { onPressEnter, onKeyDown } = this.props;
  
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  private handleClipboard (e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.ClipboardEvent<HTMLInputElement>): void {
    const { onPaste, onContextMenu, onCopy, onCut, clipboardFree, copyFree, pasteFree, cutFree } = this.props;

    switch (('' + e.type).toLowerCase()) {
      case 'copy':
        onCopy && onCopy(e);
        !copyFree && notFree();
        break;
      case 'paste':
        onPaste && onPaste(e);
        !pasteFree && notFree();
        break;
      case 'cut':
        onCut && onCut(e);
        !cutFree && notFree();
        break;
      case 'contextmenu':
        onContextMenu && onContextMenu(e);
        break;
    }

    !clipboardFree && notFree();

    function notFree () {
      if (e && e.preventDefault) {
        e.preventDefault();
      } else if (typeof window !== 'undefined') {
        (window as Window).event!.returnValue = false;
      }
    }
  }

  public render() {
    const {
      type,
      id,
      maxLength,
      className,
      prefixCls,
      style,
      placeholder
    } = getProps(this.props);

    const { value } = this.state;

    const classes = classnames({
      [prefixCls]: true,
      [className || '']: !!className
    });

    return (
      <input
        type={type}
        id={id}
        style={style}
        value={value}
        maxLength={maxLength}
        className={classes}
        placeholder={placeholder}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        onPaste={this.handleClipboard}
        onContextMenu={this.handleClipboard}
        onCopy={this.handleClipboard}
        onCut={this.handleClipboard}
        ref={this.nodeRef}
      />
    );
  };
};

export default Input;
