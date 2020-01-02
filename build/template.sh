#! /bin/bash

input1=$1
input2=$(echo ${2} | tr "[a-z]" "[A-Z]")
name="[HFDC-RC-BASIC]"

if [ "$input2" == "SFC" -o "$input2" == "F" -o "$input2" == "FC" ]; then
  echo -e "\033[34m${name}: 进行中 —— SFC组件...\033[0m"
  isSFC=true
else
  echo -e "\033[36m${name}: 进行中 —— SC组件...\033[0m"
  isSFC=false
fi
initial=$(echo ${input1:0:1} | tr "[a-z]" "[A-Z]")

componentName=$(echo ${input1/${input1:0:1}/${initial}})

if [ -a src/components/${componentName} ]; then
  echo -e "\033[31m${name}: 失败 —— 无法创建已存在的${componentName}组件\033[0m"
  exit 0
fi

mkdir src/components/${componentName}
mkdir src/components/${componentName}/__test__
mkdir src/components/${componentName}/__stories__


# generate componentName.tsx
if test "$isSFC" = true; then
echo "import React, { SFC } from 'react';
import { GeneralProps } from '../global.d';

export interface ${componentName}Props extends GeneralProps {};

const ${componentName}: SFC<${componentName}Props> = props => {
  const { className, style = {}, children } = props;

  return (
    <div
      className={className}
      style={style}
    >
      {children}
    </div>
  );
};

export default ${componentName};" > src/components/${componentName}/${componentName}.tsx
else
echo "import React, { PureComponent } from 'react';
import { Style, GeneralProps } from '../global.d';
import { createPropsGetter } from '../../utils';

export interface ${componentName}Props extends GeneralProps {};

export interface ${componentName}States {};

const defaultProps = {
  style: {} as any as Style,
  className: ''
};

type DefaultProps = Readonly<typeof defaultProps>;

const getProps = createPropsGetter(defaultProps);

class ${componentName} extends PureComponent<${componentName}Props & DefaultProps, ${componentName}States> {
  static defaultProps = defaultProps;

  public render() {
    const { className, style, children } = getProps(this.props);

    return (
      <div
        className={className}
        style={style}
      >
        {children}
      </div>
    );
  };
};

export default ${componentName};" > src/components/${componentName}/${componentName}.tsx
fi


# generate index.ts
echo "import ${componentName} from './${componentName}';

export { ${componentName}Props } from './${componentName}';
export default ${componentName};" > src/components/${componentName}/index.ts


# generate index.test.tsx
echo "import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ${componentName} from '../index';

configure({ adapter: new Adapter() });

describe('${componentName}', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <${componentName}>Test</${componentName}>
    );
    expect(wrapper).toMatchSnapshot();
  });
});" > src/components/${componentName}/__test__/index.test.tsx

# generate index.stories.tsx
echo "import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ${componentName} from '../index';
import ${componentName}ReadMe from '../README.md';

storiesOf('${componentName}', module)
  .addParameters({
    readme: {
      sidebar: ${componentName}ReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('with text', () => <${componentName}>Hello ${componentName}</${componentName}>);" > src/components/${componentName}/__stories__/index.stories.tsx

# generate README.md
echo "# ${componentName}

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| className(optional) | ${componentName}的类名 (The class property for ${componentName}) | string | - |
| style(optional) | ${componentName}的行内样式 (The inline style for ${componentName}) | object | {} |

## Example

\`\`\`javascript
<${componentName}
  className={'hfdc-${componentName}'}
  style={{
    width: '360px'
  }}
/>
\`\`\`
" > src/components/${componentName}/README.md


# src/components/index.ts
txt_import="import ${componentName} from './${componentName}';"
txt_export="export { default as ${componentName}, ${componentName}Props } from './${componentName}';"
content_import=$(grep import src/components/index.ts)
content_export_d_old=$(grep "export default" src/components/index.ts)
if [ -n "$content_export_d_old" ]; then
  content_export_d_len=`expr ${#content_export_d_old} - 3`
  content_export_d_new="${content_export_d_old:0:content_export_d_len}, ${componentName} };"
else
  content_export_d_new="export default { ${componentName} };"
fi
content_export=$(grep "export {" src/components/index.ts)
content_all="${content_import}
${txt_import}

${content_export_d_new}

${content_export}
${txt_export}"
echo "${content_all}" > src/components/index.ts

# finish echo
echo -e "\033[32m \n${name}: 成功 —— ${componentName}组件, 目录在src/components/${componentName}\n \033[0m"