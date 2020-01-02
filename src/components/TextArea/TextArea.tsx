import React, { PureComponent } from 'react';
import { Style, GeneralProps } from '../global.d';
import { createPropsGetter } from '../../utils';
import { listenKeyboard, clearKeyboardListener } from 'peeler-js';
import debounce from 'lodash/debounce';
import { ListenerCallBack } from 'peeler-js/dist/listenKeyboard/index.d';
import classnames from 'classnames';
import calcTextResize from './calcTextResize';
import { ResizeObserver, logger } from '../../utils';

export type autoFocusFn = (handleFocus: (isFocus: boolean) => void) => any;

export interface TextAreaProps extends GeneralProps {
  id?: string;
  prefixCls?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  autoHeight?: boolean;
  draggable?: boolean;
  clipboardFree?: boolean;
  copyFree? : boolean;
  pasteFree? : boolean;
  cutFree? : boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>, value: string) => any;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => any;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => any;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => any;
  onPressEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => any;
  onPaste?: (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent> | React.ClipboardEvent<HTMLTextAreaElement>) => any;
  onContextMenu?: (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent> | React.ClipboardEvent<HTMLTextAreaElement>) => any;
  onCopy?: (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent> | React.ClipboardEvent<HTMLTextAreaElement>) => any;
  onCut?: (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent> | React.ClipboardEvent<HTMLTextAreaElement>) => any;
  onRise?: ListenerCallBack;
  onFold?: ListenerCallBack;
  autoFocus?: autoFocusFn | boolean;
};

export interface TextAreaStates {
  value?: string;
  disabledObserver: boolean;
};

const defaultProps = {
  style: {} as any as Style,
  className: '',
  prefixCls: 'hfdc-textarea',
  minRows: 1,
  maxRows: 6,
  maxLength: Infinity,
  autoHeight: true,
  draggable: false,
  clipboardFree: true,
  copyFree: true,
  pasteFree: true,
  cutFree: true,
  autoFocus: false as autoFocusFn | boolean
};

type DefaultProps = Readonly<typeof defaultProps>;

const getProps = createPropsGetter(defaultProps);

class TextArea extends PureComponent<TextAreaProps & DefaultProps, TextAreaStates> {
  static defaultProps = defaultProps;
  private userDragged: boolean;
  private resizeCounter: number;
  private resetResizeCounter: (() => 0);
  private maxHeight: number;
  private resize: (node: HTMLTextAreaElement, maxHeight: number, useCache?: boolean) => any;
  protected nodeRef: React.RefObject<HTMLTextAreaElement>;

  static getDerivedStateFromProps(nextProps: TextAreaProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value
      };
    }
    return null;
  }

  public constructor (props: TextAreaProps & DefaultProps) {
    super(props);

    this.state = {
      value: (typeof props.value === 'undefined' ? props.defaultValue : props.value) || '',
      disabledObserver: false
    };

    this.userDragged = false;
    this.resizeCounter = 0;
    this.resetResizeCounter = debounce(() => (this.resizeCounter = 0), 100);
    this.maxHeight = 0;
    this.resize = function () {
      logger.logWarn('TextArea - initial component failed');
    };
    this.nodeRef = React.createRef<HTMLTextAreaElement>();

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleComposition = this.handleComposition.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClipboard = this.handleClipboard.bind(this);
    this.manualFocus = this.manualFocus.bind(this);

    if (typeof props.autoFocus === 'function') {
      props.autoFocus(this.manualFocus);
    }
  }

  public componentDidMount () {
    const node = this.nodeRef.current as HTMLTextAreaElement;
    const { onRise, onFold, minRows, maxRows, autoFocus } = getProps(this.props);

    if (autoFocus && typeof autoFocus === 'boolean') {
      // auto focus when trigger componentDidMount life-circle
      this.manualFocus(autoFocus);
    }

    const { fn, maxHeight: mh } = calcTextResize(node, minRows, maxRows);
    this.resize = fn;
    this.maxHeight = mh;
    listenKeyboard(node, onRise, onFold);
  }

  public componentDidUpdate (prevProps: TextAreaProps) {
    const { maxRows, minRows } = getProps(this.props);
    if (prevProps.maxRows !== maxRows || prevProps.minRows !== minRows) {
      const node = this.nodeRef.current as HTMLTextAreaElement;
      const { fn, maxHeight: mh } = calcTextResize(node, minRows, maxRows);
      this.resize = fn;
      this.maxHeight = mh;
    }
  }

  public componentWillUnmount () {
    const node = this.nodeRef.current as HTMLTextAreaElement;
    clearKeyboardListener(node);
  }

  private handleChange (e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { maxLength, autoHeight, onChange } = getProps(this.props);
    const currentVal = e.target.value;

    if (!('value' in this.props)) {
      this.setState({ value: currentVal });
    }

    onChange && onChange(e, currentVal);

    if (currentVal.length > maxLength || this.userDragged || !autoHeight) return;
    const node = this.nodeRef.current as HTMLTextAreaElement;
    this.resize(node, this.maxHeight, false);
  }

  private handleFocus (e: React.FocusEvent<HTMLTextAreaElement>) {
    const { onFocus } = getProps(this.props);
    onFocus && onFocus(e);
  }

  public manualFocus (isFocus: boolean): void {
    const node = this.nodeRef.current;
    if (!node) return logger.logWarn('TextArea - cannot evoke the function because the DOM not initialize yet');
    if (!!isFocus) {
      node.focus();
    } else {
      node.blur();
    }
  }

  private handleBlur (e: React.FocusEvent<HTMLTextAreaElement>) {
    const { onBlur } = getProps(this.props);
    onBlur && onBlur(e);
  }

  private handleResize () {
    // determine drag by whether or not content change
    this.resizeCounter++;
    this.resetResizeCounter();

    if (this.resizeCounter > 1) {
      logger.logWarn('TextArea - banned auto calc height because user dragged');
      this.userDragged = true;
      this.setState({
        disabledObserver: true
      });
    }
  }

  private handleComposition (e: React.CompositionEvent<HTMLTextAreaElement>) {
    const { autoHeight } = getProps(this.props);
    if (autoHeight && !this.userDragged && e.type === 'compositionend') {
      const node = this.nodeRef.current as HTMLTextAreaElement;
      this.resize(node, this.maxHeight, false);
    }
  }

  private handleKeyDown (e: React.KeyboardEvent<HTMLTextAreaElement>): void {
    const { onPressEnter, onKeyDown } = this.props;
  
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  private handleClipboard (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent> | React.ClipboardEvent<HTMLTextAreaElement>): void {
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
      className,
      style,
      id,
      prefixCls,
      placeholder,
      minRows,
      maxLength,
      draggable
    } = getProps(this.props);

    const { value, disabledObserver } = this.state;

    const classes = classnames({
      [prefixCls]: true,
      [className || '']: !!className
    });

    return (
      <ResizeObserver
        onResize={this.handleResize}
        disabled={disabledObserver}
      >
        <textarea
          style={draggable ? style : {
            ...style,
            resize: 'none'
          }}
          value={value}
          maxLength={maxLength}
          className={classes}
          id={id}
          placeholder={placeholder}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          onPaste={this.handleClipboard}
          onContextMenu={this.handleClipboard}
          onCopy={this.handleClipboard}
          onCut={this.handleClipboard}
          onCompositionEnd={this.handleComposition}
          ref={this.nodeRef}
          rows={minRows}
        />
      </ResizeObserver>
    );
  };
};

export default TextArea;
