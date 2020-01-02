# hfdc-rc-basic(虎扑前端 React 基础组件库)

## 快速使用(Quick Start)
1. 确保运行的 **node** 版本 >= `10`，推荐使用 [n](https://github.com/tj/n) 或 [nvm](https://github.com/nvm-sh/nvm) 管理你的node版本

2. 运行`npm set registry http://hnpm.hupu.io`，将npm的镜像地址设为私有仓库的地址(更为推荐的是用[*nrm*](https://github.com/Pana/nrm)进行管理)

3. 运行`yarn add @hupu/rc-basic` 或 `npm i -S @hupu/rc-basic` 将组件库下载到项目中

4. 代码中引入后，直接开撸(以 *Upload* 组件为例)
    ```javascript
    import * as React from 'react';
    import { Upload } from '@hupu/rc-basic';

    export default class CustomUpload extends React.Component {
      render () {
        return (
          <button style={{ position: 'relative' }}>
            '点我上传'
            <Upload
              action='https://upload.hupu.com/YourUploadPath'
            />
          </button>
        )
      }
    }
    ```

---

## 组件列表(Components List)
| 组件(Component) | 开发者(Developer) |
| --- | --- |
| [Button](http://gitlab.hupu.com/frontend/hfdc-react-basic/tree/release/src/components/Button/README.md) | [钟媛媛](https://gitee.com/libertas1)
| [Calendar](http://gitlab.hupu.com/frontend/hfdc-react-basic/tree/release/src/components/Calendar/README.md) | [汪子林](https://www.zhihu.com/people/murakami-95)
| [CheckBox](http://gitlab.hupu.com/frontend/hfdc-react-basic/tree/release/src/components/CheckBox/README.md) | [丛新](https://blog.csdn.net/tx6491991)
| [Drag](http://gitlab.hupu.com/frontend/hfdc-react-basic/tree/release/src/components/Drag/README.md) | [陈礼超](https://github.com/Charlieeeeee)
| [FieldForm](http://gitlab.hupu.com/frontend/hfdc-react-basic/tree/release/src/components/FieldForm/README.md) | [王鑫](https://github.com/starWangx)
| [Input](http://gitlab.hupu.com/frontend/hfdc-react-basic/tree/release/src/components/Input/README.md) | [李翰](https://github.com/BobbyLH)
| [Notification](http://gitlab.hupu.com/frontend/hfdc-react-basic/tree/release/src/components/Notification/README.md) | [陈晓刚](https://github.com/Just-focus)
| [Portal](http://gitlab.hupu.com/frontend/hfdc-react-basic/tree/release/src/components/Portal/README.md) | [李翰](https://github.com/BobbyLH)
| [Popconfirm](http://gitlab.hupu.com/frontend/hfdc-react-basic/blob/release/src/components/Popconfirm/README.md) | [高策](http://www.godrry.com)
| [Select](http://gitlab.hupu.com/frontend/hfdc-react-basic/tree/release/src/components/Select/README.md) | [王鑫](https://github.com/starWangx)
| [Step](http://gitlab.hupu.com/frontend/hfdc-react-basic/tree/release/src/components/Step/README.md) | [王睿](https://github.com/spicyboiledfish)
| [Switch](http://gitlab.hupu.com/frontend/hfdc-react-basic/tree/release/src/components/Switch/README.md) | [李翰](https://github.com/BobbyLH)
| [TextArea](http://gitlab.hupu.com/frontend/hfdc-react-basic/tree/release/src/components/TextArea/README.md) | [李翰](https://github.com/BobbyLH)
| [Tooltip](http://gitlab.hupu.com/frontend/hfdc-react-basic/blob/release/src/components/Tooltip/README.md) | [鲍同雪](https://github.com/Aluww77)
| [Upload](http://gitlab.hupu.com/frontend/hfdc-react-basic/tree/release/src/components/Upload/README.md) | [李翰](https://github.com/BobbyLH)

---

## 在线Demo演示(Online Demonstration)
[http://fed-demo.hupu.io](http://fed-demo.hupu.io)

---

## 开发规范和流程(Process and Rules of Development)
基础组件库的开发的流程和规范，点击[这里](http://gitlab.hupu.com/frontend/hfdc-react-basic/tree/release/docs/DEV.md)查看。

---

## Tips:
如果出现了关于 `styled-jsx` 的TS编译错误，比如：

<img src='http://gitlab.hupu.com/frontend/hfdc-react-basic/blob/release/docs/err-pic-styled-jsx.png' width="600px" />

安装 `@types/styled-jsx` 解决问题
```sh
yarn add -D @types/styled-jsx
```