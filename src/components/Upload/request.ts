import { isType } from 'peeler-js';

export interface Headers {
  [propName: string]: string;
}

export interface Data {
  [propName: string]: any;
}

export interface ProgressEv extends ProgressEvent {
  percent: number;
}


export interface Option {
  action: string;
  filename?: string;
  file?: File;
  data?: Data[];
  withCredentials?: boolean;
  headers?: Headers;
  onProgress?: (e: ProgressEv) => any;
  onError?: (e: ProgressEvent | Err, res?: any) => any;
  onSuccess?: (res: any) => any;
}

export interface Err extends Error{
  status: number;
  method: string;
  url: string;
}

function getError(option: Option, xhr: XMLHttpRequest): Err {
  const msg = 'cannot post ' + option.action + ' ' + xhr.status + '\'';
  const err = new Error(msg);
  const status = xhr.status;
  const method = 'post';
  const url = option.action;
  return { ...err, status, method, url };
}

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function upload (option: Option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return Promise.reject('Your Browser is out of date');
  }

  return new Promise((resolve, reject) => {
    const { onProgress, onError, onSuccess, filename, file } = option;
    const xhr = new XMLHttpRequest();
    if (xhr.upload) {
      xhr.upload.onprogress = function progress(e) {
        let percent = 0;
        if (e.total > 0) {
          percent = e.loaded / e.total * 100;
        }
        onProgress && onProgress({ ...e, percent });
      };
    }

    const formData = new FormData();

    if (option.data) {
      const data = option.data;
      const len = data.length;
      for (let i = 0; i < len; i++) {
        const item = data[i];
        const key = Object.keys(item)[0];
        const val = item[key];
        formData.append(key, val);
      }
    };

    if (filename && file) {
      formData.append(filename, file);
    }

    xhr.onerror = function error(e) {
      onError ? reject(onError(e)) : reject(e);
    };

    xhr.onload = function onload() {
      if (xhr.status !== 200) {
        const e = getError(option, xhr);
        const res = getBody(xhr);
        return onError ? reject(onError(e, res)) : reject({ e, res });
      };

      onSuccess ? resolve(onSuccess(getBody(xhr))) : resolve(getBody(xhr));
    };

    xhr.open('post', option.action, true);

    // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
    if (option.withCredentials && 'withCredentials' in xhr) {
      xhr.withCredentials = true;
    };

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    const headers = option.headers || {};
    const headerKeys = Object.keys(headers);
    const len = headerKeys.length;
    for (let i = 0; i < len; i++) {
      const key = headerKeys[i];
      if (isType('string')(headers[key]) && headers.hasOwnProperty(key)) {
        const content = headers[key];
        xhr.setRequestHeader(key, content);
      };
    };

    xhr.send(formData);
  });
};

export default upload;