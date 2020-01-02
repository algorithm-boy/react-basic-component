import React, { SFC, useRef, useEffect, useState } from 'react';
import { listenKeyboard, clearKeyboardListener, Logger } from 'peeler-js';
import debounce from 'lodash/debounce';
import { ListenerCallBack } from 'peeler-js/dist/listenKeyboard/index.d';
import { GeneralProps } from '../global.d';
import classnames from 'classnames';
import useSetValue from './useSetValue';
import calcTextResize from './calcTextResize';
import { ResizeObserver } from '../../utils';

const logger = new Logger({
  debug: true,
  logLevel: 'warn',
  logPrefix: 'RC Basic - TextArea'
});

export interface TextAreaProps extends GeneralProps {
  id?: string;
  className?: string;
  prefixCls?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  autoHeight?: boolean;
  draggable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>, value: string) => any;
  onFocus?: (e: React.ChangeEvent<HTMLTextAreaElement>) => any;
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => any;
  onRise?: ListenerCallBack;
  onFold?: ListenerCallBack;
};

let resize: (node: HTMLTextAreaElement, maxHeight: number, useCache?: boolean) => any = function () {
  logger.logWarn('initial component failed');
};

/**
 * todo refactor TextArea to Class Component
 */
const TextArea: SFC<TextAreaProps> = props => {
  const {
    style = {},
    className,
    id,
    prefixCls = 'hfdc-textarea',
    placeholder,
    value,
    defaultValue,
    minRows = 1,
    maxRows = 6,
    maxLength = Infinity,
    autoHeight = true,
    draggable = false,
    onChange,
    onFocus,
    onBlur,
    onRise,
    onFold
  } = props;

  const nodeRef = useRef<HTMLTextAreaElement>(null);

  const { val } = useSetValue({
    value,
    initValue: defaultValue,
    maxLength
  });

  const [ maxHeight, setMaxHeight ] = useState(0);
  const [ userDragged, setUserDragged ] = useState(false);
  const [ resizeCounter, setResizeCounter ] = useState(0);
  const [ disabledObserver, setDisabledObserver ] = useState(false);
  const resetResizeCounter = debounce(() => (setResizeCounter(0)), 75);

  useEffect(() => {
    const node = nodeRef.current as HTMLTextAreaElement;

    if (val) {
      // set init value
      node.value = val;
    };

    listenKeyboard(node, onRise, onFold);

    return function () {
      clearKeyboardListener(node);
    };
    /* eslint-disable */
    // ignore eslint-plugin-react-hooks which will auto fill conditional variable
  }, []);
    /* eslint-enable */

  useEffect(() => {
    const node = nodeRef.current as HTMLTextAreaElement;
    const { fn, maxHeight: mh } = calcTextResize(node, minRows, maxRows);
    resize = fn;
    setMaxHeight(mh);
    /* eslint-disable */
    // ignore eslint-plugin-react-hooks which will auto fill conditional variable
  }, [maxRows, minRows]);
    /* eslint-enable */

  function handleChange (e: React.ChangeEvent<HTMLTextAreaElement>) {
    const currentVal = e.target.value;
    if (currentVal.length >= maxLength) {
      /**
       * todo compat IE 6-9 for maxLength property
       */
      // e.target.value = currentVal.substr(0, maxLength);
      return;
    }

    const node = nodeRef.current as HTMLTextAreaElement;
    onChange && onChange(e, currentVal);
    !userDragged && autoHeight && resize(node, maxHeight, true);
  }

  function handleFocus (e: React.ChangeEvent<HTMLTextAreaElement>) {
    onFocus && onFocus(e);
  }

  function handleBlur (e: React.ChangeEvent<HTMLTextAreaElement>) {
    onBlur && onBlur(e);
  }

  function handleResize () {
    // determine drag by whether or not content change
    setResizeCounter(resizeCounter + 1);
    resetResizeCounter();

    if (resizeCounter > 1) {
      logger.logWarn('banned auto calc height because user dragged');
      setUserDragged(true);
      setDisabledObserver(true);
    }
  }

  const classes = classnames({
    [prefixCls]: true,
    [className || '']: !!className
  });

  return (
    <ResizeObserver
      onResize={handleResize}
      disabled={disabledObserver}
    >
      <textarea
        style={draggable ? style : {
          ...style,
          resize: 'none'
        }}
        maxLength={maxLength}
        className={classes}
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={nodeRef}
        rows={minRows}
      />
    </ResizeObserver>

  );
};

export default TextArea;
