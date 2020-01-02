import * as ReactDOM from 'react-dom';
import React, { SFC, useEffect } from 'react';
import { GeneralProps } from '../global.d';

export interface PortalProps extends GeneralProps {
  selector?: string;
  visible?: boolean;
  render?: () => React.ReactNode;
  onMount?: () => any;
  onUnmount?: () => any;
};

function getContainer (selector: string) {
  if (typeof window === 'undefined') { return; }
  const node = document.querySelector(selector) || document.body;
  return node;
}

const Portal: SFC<PortalProps> = props => {
  const { className, style = {}, children, selector = 'body', visible, render, onMount, onUnmount } = props;

  const container = getContainer(selector);
  const content = render ? render() : children;
  if (!container) return <>{ content }</>;

  /* eslint-disable */
  useEffect(() => {
    onMount && onMount();

    return () => onUnmount && onUnmount();
  }, [])
  /* eslint-enable */

  return ReactDOM.createPortal(
    <div
      className={className}
      style={{
        display: visible ? 'block' : 'none',
        ...style
      }}
    >
      { content }
    </div>,
    container
  );
};

export default Portal;
