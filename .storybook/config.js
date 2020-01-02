import { addDecorator, configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { addReadme } from 'storybook-readme';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo);
addDecorator(addReadme);
setOptions({
  name: '虎扑前端React基础组件库',
});
const req = require.context('../src/components/', true, /\.stories\.tsx$/);
function loadStories() {
  require('../src/stories/global.stories.tsx');
  const keys = req.keys();
  keys.forEach(filename => req(filename));
};

configure(loadStories, module);
