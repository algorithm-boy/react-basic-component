import throttle from 'lodash/throttle';
import calcStyle from './calcStyle';

export { default as calcStyle } from './calcStyle';

const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;

let hiddenTextarea: HTMLTextAreaElement;
export const calcTextResize = (node: HTMLTextAreaElement, minRows: number, maxRows: number) => {
  const { paddingSize, boxSizing, borderSize } = calcStyle(node);
  const scrollHeight = node.scrollHeight;
  const minimumHeight = scrollHeight - paddingSize;
  const singleRowHeight = minimumHeight / minRows;

  let maxHeight = singleRowHeight * maxRows;
  if (boxSizing === 'border-box') {
    maxHeight = maxHeight + paddingSize + borderSize;
  };

  function handleResize (innerNode: HTMLTextAreaElement, innerMaxHeight: number, useCache?: boolean) {
    if (innerNode) {
      const { paddingSize, boxSizing, borderSize, sizingStyle } = calcStyle(innerNode, useCache);
      if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
      }

      hiddenTextarea.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`);
      hiddenTextarea.value = innerNode.value || innerNode.placeholder || '';
      let height = hiddenTextarea.scrollHeight < minimumHeight ? minimumHeight : hiddenTextarea.scrollHeight;

      innerNode.style.height = 'auto';
      if (boxSizing === 'border-box') {
        height += borderSize;
      } else if (boxSizing === 'content-box') {
        height -= paddingSize;
      }
      innerNode.style.height = Math.min(height, innerMaxHeight) + 'px';
    }
  };

  return {
    fn: throttle(handleResize, 100),
    maxHeight
  };
};

export default calcTextResize;