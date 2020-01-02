# Upload (上传组件)

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| action(**required**) | 上传文件的URL或一个回调函数 (Uploading URL or Callback) | string \| (file) => Promise | - |
| className(optional) | Upload的类名（The class property for Upload) | string | '' |
| style(optional) | Upload的行内样式 (The inline style for Upload) | object | {} |
| id(optional) | The input id(input的id) | string | - |
| prefixCls(optional) | 类名前缀 (The prefix of class) | boolean | 'hfdc-upload' |
| name(optional) | 上传文件的文件名 (The name of uploading file(s)) | string \| array | - |
| accept(optional) | 上传文件的类型, 预设值有**all、image、audio、video** (File type that can be accepted) | string | '' |
| size(optional) | 上传文件的最大值，单位MB (The max size of uploading file, unit is MB) | number | Infinity |
| multiple(optional) | 是否允许多文件上传 (Whether allow multiple files upload) | boolean | false |
| minCount(optional) | 上传文件的最小个数, 默认为1 (Minimum number of uploaded files) | number | 1 |
| maxCount(optional) | 上传文件的最大个数, `mutiple`为`false`时，不生效 (Maximum number of uploaded files, it didn't work when `multiple` is `false`) | number | Infinity |
| uploadModel(optional) | 上传模式，默认并发多个上传请求，可选`concatenation`为串行上传 (Uploading Model, default is concurrent) | concurrent \| concatenation | concurrent |
| concatenation(optional) | 上传模式为`concatenation`串行上传时，串行的个数 (Number of series when Upload Model is `concatenation`) | number | 1 |
| disabled(optional) | 禁用上传 (disable uploading) | boolean | false |
| withCredentials(optional) | 请求时是否带上cookie (ajax upload with cookie sent) | boolean | false |
| beforeUpload(optional) | 开始上传之前的回调函数，返回`false`会终止上传 (A callback function will be called when before uploading step. The uploading will be stop when the function return `false`) | (isRequesting: boolean, files: ChangeData, e?: ChangeEvent) => boolean; | - |
| onChange(optional) | 上传状态改变的回调函数 (A callback function will be called when uploading state had been changed) | (files: ChangeData, e: ChangeEvent) => any | - |
| onProgress(optional) | 上传进度的回调函数 (A callback function will be called when uploading) | (e: ProgressEv) => any | - |
| onSuccess(optional) | 上传成功的回调函数 (A callback function will be called when have been uploaded) | (res: any) => any | - |
| onFinish(optional) | 所有文件均执行上传操作后的回调函数 (A callback function will be called when all files has been completed upload procedures) | () => any | - |
| onException(optional) | 上传过程中出现错误的回调函数，type可能是`size、count、accept、api`分别代表不匹配设定的size、maxCount、accept，或者是上传的api报错 (A callback function will be called when the uploading process occur any error) | (type: ErrType, e?: ErrorEvent \| Err \| ProgressEvent) => any | - |

---

## Types
```typescript
export interface ProgressEv extends ProgressEvent {
  percent: number;
}
export interface Err extends Error{
  status: number;
  method: string;
  url: string;
}
interface ChangeFile {
  label: string;
  file: File;
}
type ChangeData = ChangeFile[];
type ActionFn = (files: ChangeData) => Promise<any>;
type Preset = 'all' | 'image' | 'audio' | 'video';
type ErrType = 'size' | 'count' | 'accept' | 'api';
type UploadModel = 'concurrent' | 'concatenation';
type DomProps = 'id' | 'style' | 'multiple' | 'disabled';
```

---

## Example

```javascript
<button style={{ position: 'relative' }}>
  Upload
  <Upload action='http://hupu.com' />
</button>
```

