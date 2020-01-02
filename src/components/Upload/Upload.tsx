import React, { PureComponent, ChangeEvent } from 'react';
import { Style, GeneralProps } from '../global.d';
import pick from 'lodash/pick';
import { getTs, getUA, isType } from 'peeler-js';
import classnames from 'classnames';
import request, { ProgressEv, Err } from './request';
import { createPropsGetter, logger } from '../../utils';

const preset_accept = {
  all: '',
  image: 'image/*',
  audio: 'audio/*',
  video: 'video/*'
};

enum upload_model {
  concurrent,
  concatenation
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

export interface UploadProps extends GeneralProps {
  action: string | ActionFn;
  accept?: Preset | string;
  prefixCls?: string;
  id?: string;
  name?: string;
  size?: number;
  multiple?: boolean;
  minCount?: number;
  maxCount?: number;
  withCredentials?: boolean;
  disabled?: boolean;
  uploadModel?: UploadModel;
  concatenation?: number;
  beforeUpload?: (isRequesting: boolean, files: ChangeData, e?: ChangeEvent) => boolean | void;
  onChange?: (files: ChangeData, e: ChangeEvent) => any;
  onProgress?: (e: ProgressEv) => any;
  onSuccess?: (res: any) => any;
  onFinish?: () => any;
  onException?: (type: ErrType, e?: ErrorEvent | Err | ProgressEvent) => any;
};

export interface UploadStates {
  isMounted: boolean;
  isIE: boolean;
};

const defaultProps = {
  style: {} as any as Style,
  className: '',
  accept: preset_accept.all as Preset | string,
  prefixCls: 'hfdc-upload',
  size: Infinity,
  multiple: false,
  minCount: 0,
  maxCount: Infinity,
  withCredentials: false,
  disabled: false,
  uploadModel: 'concurrent' as UploadModel,
  concatenation: 1
};

type DefaultProps = Readonly<typeof defaultProps>;

const getProps = createPropsGetter(defaultProps);

class Upload extends PureComponent<UploadProps & Partial<DefaultProps>, UploadStates> {
  static defaultProps = defaultProps;

  private file: React.RefObject<HTMLInputElement>;
  private fileData: ChangeData;
  private isRequesting: boolean;

  public constructor(props: UploadProps) {
    super(props);
    this.state = {
      isMounted: false, // can't use upload until the component mounted
      isIE: false
    };

    this.fileData = [];
    this.isRequesting = false;
    this.file = React.createRef();
    this.handleChange = this.handleChange.bind(this);

    // logic principle checking
    const { minCount, maxCount } = props;
    if (minCount && maxCount && minCount > maxCount) {
      logger.logErr(`Upload - minCount(${minCount}) could not bigger than maxCount(${maxCount})`);
      throw new Error(`minCount(${minCount}) could not bigger than maxCount(${maxCount})`);
    }
  }

  public componentDidMount() {
    const { isIE, isEdge } = getUA(navigator.userAgent);
    this.setState({
      isMounted: true,
      isIE: isIE || isEdge
    });
  }

  public componentWillUnmount() {
    this._clearInput(); // clear upload object
  }

  /**
   * get file size restrict
   * @returns {number}
   */
  private getSize(): number {
    const { size } = getProps(this.props);

    return size * (1024 * 1024);
  }

  /**
   * get acceptable upload file type
   * @returns {string}
   */
  private getAccept(): string {
    const { accept } = getProps(this.props);

    return preset_accept[accept as Preset] || accept;
  }

  /**
   * get upload model
   * @returns {UploadModel}
   */
  private getModel(): 0 | 1 {
    const { uploadModel } = getProps(this.props);

    return upload_model[uploadModel] || upload_model.concurrent;
  }

  private _clearInput() {
    this.file.current && (this.file.current.value = '');
  }

  private _handleAccept(type: string) {
    const accept = this.getAccept();
    if (!accept || accept === 'all' || accept === '*') return true;

    const acceptArr = accept.toLowerCase().split(',');
    const acceptFilter = /\//g;
    const file_type_up = type.toLowerCase().split('/')[0];
    const file_type_sub = type.toLowerCase().split('/')[1];
    const len = acceptArr.length;

    for (var k = 0; k < len; k++) {
      let accept_type_up, accept_type_sub;
      if (acceptFilter.test(acceptArr[k])) {
        accept_type_up = acceptArr[k].split('/')[0];
        accept_type_sub = acceptArr[k].split('/')[1];
      } else {
        accept_type_up = acceptArr[k].split('.')[0];
        accept_type_sub = acceptArr[k].split('.')[1];
      };

      if (accept_type_up === file_type_up) {
        // upper type must be equal
        if (accept_type_sub === '*') {
          // some kind of type accept *
          break;
        } else {
          const regExp = new RegExp(accept_type_sub, 'g');
          if (accept_type_sub === file_type_sub || regExp.test(file_type_sub)) {
            break;
          };
        }
      }
    };

    if (k === acceptArr.length) return false;

    return true;
  }

  private async _handleRequest(e?: ChangeEvent): Promise<void> {
    'use strict';
    const { action, beforeUpload, onProgress, onSuccess, onException, onFinish, name, withCredentials } = getProps(this.props);

    const handleApiErr = (error: ProgressEvent | Err) => {
      this.isRequesting = false;
      logger.logErr(`Upload - The Upload Request occur error - ${JSON.stringify(error).substr(0, 200)}……`);
      onException && onException('api', error);
    };

    const handleApiSuc = (res: any) => {
      this.isRequesting = false;
      onSuccess && onSuccess(res);
    };

    if (!action) {
      logger.logErr('Upload - Please pass correct action');
      return;
    }

    const beforeRes = beforeUpload && beforeUpload(this.isRequesting, this.fileData, e);
    if (beforeRes === false) return;

    const model = this.getModel();
    if (model === 1) {
      // concatenation upload
      let { concatenation } = getProps(this.props);
      if (concatenation < 1) {
        concatenation = 1;
        logger.logWarn('Upload - concatenation must >= 1');
      };

      const uploadData = this.fileData.slice(0, concatenation);
      const len = uploadData.length;
      if (len > 0) {
        this.isRequesting = true; // begin upload and can't continue call upload api before completed this mission
        const { label, file } = uploadData[0];
        const filename = name || file.name || label;

        try {
          if (isType('function')(action)) {
            await action(uploadData)
              .catch(err => handleApiErr(err));
          } else if (isType('string')(action)) {
            if (len > 1) {
              const data = [];
              for (let i = 0; i < len; i++) {
                const item = uploadData[i];
                const { label, file } = item;
                const filename = name || file.name || label;
                data.push({ [filename]: file });
              }
  
              await request({
                action,
                withCredentials,
                data,
                onProgress
              })
                .then(res => handleApiSuc(res))
                .catch(err => handleApiErr(err));
            } else {
              await request({
                action,
                withCredentials,
                file,
                filename,
                onProgress
              })
                .then(res => handleApiSuc(res))
                .catch(err => handleApiErr(err));
            }
          }

          // delete already had been uploaded file
          this.fileData.splice(0, concatenation);
          return this._handleRequest();
        } catch (err) {
          this.isRequesting = false;
          logger.logErr(`Upload - ${JSON.stringify(err)}`);
        }
      } else {
        // all data completed upload
        this.isRequesting = false;
        onFinish && onFinish();
      }
    } else {
      // concurrent upload
      const len = this.fileData.length;
      if (len > 0) {
        this.isRequesting = true;
        try {
          if (isType('function')(action)) {
            await action(this.fileData)
              .catch(err => handleApiErr(err));
          } else if (isType('string')(action)) {
            const data = [];
            for (let i = 0; i < len; i++) {
              const item = this.fileData[i];
              const { label, file } = item;
              const filename = name || file.name || label;
              data.push({ [filename]: file });
            }

            await request({
              action,
              withCredentials,
              data,
              onProgress
            })
              .then(res => handleApiSuc(res))
              .then(() => onFinish && onFinish())
              .catch(err => handleApiErr(err));
          }
        } catch (err) {
          this.isRequesting = false;
          logger.logErr(`Upload - ${JSON.stringify(err)}`);
        } finally {
          // clear fileData
          this.fileData.splice(0);
        }
      } else {
        // all data completed upload
        this.isRequesting = false;
        onFinish && onFinish();
      }
    }
  }

  public handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    'use strict';
    const { isMounted } = this.state;
    const { onChange, onException, multiple, minCount, maxCount, disabled } = getProps(this.props);

    if (!isMounted || disabled) return false;

    const files = e && e.target.files;
    const len = files ? files.length : 0;
    const changeData = [];
    if (files) {
      // there is files upload
      const size = this.getSize();

      if ((!multiple && len > 1) || len > maxCount || len < minCount) {
        // over count limit
        const logStr = len < minCount ? 'under MIN' : 'over MAX';
        const logNum = len < minCount ? minCount : maxCount !== Infinity ? maxCount : 1;
        logger.logWarn(`Upload - The upload total count(${len}) ${logStr} limit(${logNum})`);
        onException && onException('count');
        this._clearInput();
        return false;
      };

      for (let i = 0; i < len; i++) {
        if (!this._handleAccept(files[i].type)) {
          // file type is invalid
          logger.logWarn(`Upload - The ${files[i].name} type is ${files[i].type} which unmatch the accept upload type`);
          onException && onException('accept');
          this._clearInput();
          return false;
        };

        if (files[i].size > size) {
          // file size exceed the limit
          logger.logWarn(`Upload - The ${files[i].name} size(${files[i].size / (1024 * 1024)} MB) exceed the limit(${size / (1024 * 1024)} MB)`);
          onException && onException('size');
          this._clearInput();
          return false;
        };

        changeData.push({
          label: `${getTs()}-${i}`,
          file: files[i]
        });
      };

      onChange && onChange(changeData, e);

      this.fileData = [...this.fileData, ...changeData];
      this._handleRequest(e);
    } else {
      // without file upload
      logger.logErr('Upload - Without any files upload');
    }
    return this._clearInput(); // clear upload object
  }

  public render() {
    const { isMounted, isIE } = this.state;
    const { className, style, prefixCls, disabled } = getProps(this.props);
    const accept = this.getAccept();

    const domProps: DomProps[] = ['id', 'style', 'multiple', 'disabled'];
    const props = pick(this.props, domProps);

    const classes = classnames({
      [prefixCls]: true,
      [`${prefixCls}-adapt-ie`]: isIE,
      [className || '']: !!className
    });

    return (
      <React.Fragment>
        <input
          {...props}
          className={classes}
          type='file'
          accept={accept}
          disabled={isMounted ? disabled : true}
          style={style}
          ref={this.file}
          onChange={this.handleChange}
        />

        { prefixCls === 'hfdc-upload' && <style>
          {`
            .hfdc-upload {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              font-size: 0;
              cursor: ${ isMounted ? disabled ? 'not-allowed' : 'pointer' : 'not-allowed'};
            }
            .hfdc-upload-adapt-ie {
              z-index: 99;
              font-size: 100px;
            }
          `}
        </style> }

      </React.Fragment>
    );
  };
};

export default Upload;
