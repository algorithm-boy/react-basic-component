const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'font-variant',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
  'height'
];

export interface NodeType {
  sizingStyle: string;
  paddingSize: number;
  borderSize: number;
  boxSizing: string;
}

const computedStyleCache: { [key: string]: NodeType } = {};

export function calcStyle (node: HTMLElement, useCache?: boolean): NodeType {
  const nodeRef = (node.getAttribute('id') ||
    node.getAttribute('name')) as string;

  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }

  const style = window.getComputedStyle(node);
  const paddingSize = 
  parseFloat(style.getPropertyValue('padding-bottom')) +
  parseFloat(style.getPropertyValue('padding-top'));
  const boxSizing =
  style.getPropertyValue('box-sizing') ||
  style.getPropertyValue('-moz-box-sizing') ||
  style.getPropertyValue('-webkit-box-sizing');
  const borderSize =
  parseFloat(style.getPropertyValue('border-bottom-width')) +
  parseFloat(style.getPropertyValue('border-top-width'));
  const sizingStyle = SIZING_STYLE.map(name => `${name}:${style.getPropertyValue(name)}`).join(';');

  const nodeInfo = {
    sizingStyle,
    paddingSize,
    boxSizing,
    borderSize
  };

  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }

  return nodeInfo;
}

export default calcStyle;