import React, { SFC, ReactNode, useState, useEffect, useRef } from 'react';
import { GeneralProps } from '../global.d';
import pick from 'lodash/pick';
import classnames from 'classnames';

export interface SwitchProps extends GeneralProps {
  autoFocus?: boolean;
  prefixCls?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  renderChecked?: string | ReactNode;
  renderUnChecked?: string | ReactNode;
  onChange?: (checked: boolean, event?: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>) => any;
  onClick?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  onMouseUp?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
};

type DomProps = 'className' | 'style' | 'disabled';

const Switch: SFC<SwitchProps> = props => {
  const {
    autoFocus,
    prefixCls = 'hfdc-switch',
    className,
    checked: checkedProps,
    defaultChecked = false,
    disabled,
    renderChecked,
    renderUnChecked,
    onChange,
    onClick,
    onMouseUp
  } = props;
  const domProps: DomProps[] = ['style', 'disabled'];
  const pickedProps = pick(props, domProps);

  const button = useRef<HTMLButtonElement>(null);
  const [checked, setChecked] = useState<boolean>(checkedProps !== undefined ? checkedProps : defaultChecked);
  useEffect(() => {
    if (autoFocus && !disabled) {
      focus();
    }
  }, [autoFocus, disabled]);
  /* eslint-disable */
  // ignore eslint-plugin-react-hooks which will auto fill conditional variable
  useEffect(() => {
    handleChecked(undefined, defaultChecked);
  }, [checkedProps]);
  /* eslint-enable */

  const classes = classnames({
    [prefixCls]: true,
    [`${prefixCls}-checked`]: checked,
    [`${prefixCls}-disabled`]: disabled,
    [className || '']: !!className
  });

  function handleChecked(e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>, checkVal?: boolean) {
    if (disabled) return;
    if ('checked' in props) {
      if (checked === checkedProps) return;
      setChecked(checkedProps!);
      onChange && onChange(checkedProps!, e);
    } else {
      if (checked === checkVal) return;
      const val = checkVal !== undefined ? checkVal : !checked;
      setChecked(val);
      onChange && onChange(val, e);
    }
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onClick && onClick(checked, e);
    handleChecked(e);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.keyCode === 37) {
      handleChecked(e, false);
    } else if (e.keyCode === 39) {
      handleChecked(e, true);
    }
  }

  function handleMouseUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    blur();
    onMouseUp && onMouseUp(checked, e);
  }

  function focus() {
    button.current && button.current.focus();
  }

  function blur() {
    button.current && button.current.blur();
  }

  return (
    <>
      <button
        {...pickedProps}
        ref={button}
        type='button'
        role='switch'
        className={classes}
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseUp={handleMouseUp}
      >
        <span className={`${prefixCls}-inner`}>
          {checked ? renderChecked : renderUnChecked}
        </span>
      </button>
    </>
  );
};

export default Switch;
