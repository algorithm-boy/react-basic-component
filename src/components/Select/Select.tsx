import React, {PureComponent} from 'react';
import {GeneralProps} from '../global.d';
import Option, {IOptProps} from './Option';
import Popup from './Popups';
import Trigger from './Trigger';
import {createPropsGetter} from '../../utils';
import cls from 'classnames';

// const noop = (): null => null;
export interface SelectProps extends GeneralProps {
  placeholder?: string | undefined;
  multiple?: boolean;
  defaultValue?: Array<string> | string;
  disabled?: boolean;
  showSearch?: boolean;
  resetOption?: boolean;
  resetText?: string;
  autoWidth?: boolean;
  prefixCls?: string;
  searchPlaceholder?: string;
  value?: string;

  resetCls?: string;
  searchCls?: string;
  popupCls?: string;
  triggerCls?: string;
  triggerSpanCls?: string;
  maxCount?: number;
  maxCanChoose?: boolean;

  onSearch?: (value: string) => any;
  onChange?: (value: any, option: any) => void;
  onSelect?: (value: any, option: any) => void;
  onDelete?: (value: any, option: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;

  popupStyle?: object;
  optionStyle?: object;
  triggerStyle?: object;
  triggerSpanStyle?: object;
  containerStyle?: object;
}

export interface SelectStates {
  showOpts: boolean;
  setDefaultState: boolean;
  deleteState: boolean;
  optionList: Array<any>;
  reset: boolean;
  value: string;
  defaultCurrent: number | null;
  mutiOptValues: Array<any>;
  mutiOpts: Array<any>;
}

interface LifeCircleProps extends SelectProps {
  children: JSX.Element[] | JSX.Element | any;
}

interface OptionType {
  key: any;
  props: {
    disabled?: boolean;
    value?: string;
    key?: any;
    onClick?: object;
    operate?: string;
  };
}


const defaultProps = {
  style: {},
  children: [],
  disabled: false,
  showSearch: false,
  resetOption: false,
  resetText: '',
  multiple: false,
  prefixCls: 'hupu-select',
};


const getProps = createPropsGetter(defaultProps);

const getValuePropValue = (child: any) => {
  if (!child) {
    return null;
  }
  const props = child.props;
  if ('value' in props) {
    return props.value;
  }
  if (child.key) {
    return child.key;
  }
  if (child.type && child.type.isSelectOptGroup && props.label) {
    return props.label;
  }
  throw new Error(`Need at least a key or a value or a label (only for OptGroup) for ${child}`);
};

const filterChildren = (children: any, value: string) => {
  const getChildren = (child: any) => {
    if (getValuePropValue(child).indexOf(value) !== -1) {
      return child;
    }
  };
  if (children instanceof Array) {
    return children.filter((child: any) => {
      return getChildren(child);
    });
  } else {
    return getChildren(children) ? [getChildren(children)] : getChildren(children);
  }
};

class Select extends PureComponent<SelectProps, SelectStates> {
  public static Option: typeof Option;
  public static Popup: typeof Popup;
  public static defaultProps = defaultProps;
  private selectContainer: HTMLDivElement | null;

  public constructor(props: SelectProps) {
    super(props);
    this.selectContainer = null;
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      optionList: [],
      setDefaultState: false,
      showOpts: false,
      reset: false,
      value: '',
      //避免将 props 的值复制给 state！这是一个常见的错误：
      defaultCurrent: null,
      mutiOptValues: [],
      mutiOpts: [],
      deleteState: false
    };
  }

  public static getDerivedStateFromProps(props: LifeCircleProps, state: SelectStates) {
    if (!state.value && !state.reset) {
      let setDefaultState = state.setDefaultState;
      const optionList = state.optionList;
      if (state.optionList.length === 0 && !setDefaultState) {

        const childrenWithProps = React.Children.map(props.children,
          (child: any) => React.cloneElement(child, {_key: child.props.value}),);

        childrenWithProps.map((child: any, index: number) => {
          if (typeof props.defaultValue === 'object') {
            props.defaultValue.forEach(defaultKey => {
              if (defaultKey === child.props._key) {
                let findFlag = false;
                if (optionList.length > 0) {
                  optionList.forEach((opt) => {
                    if (opt.key === child.props._key) {
                      findFlag = true;
                    }
                  });
                }
                setDefaultState = true;
                if (!findFlag) {
                  optionList.push(child);
                }
              }
            });
          } else {
            if (props.defaultValue === child.props._key) {
              optionList.push(child);
            }
          }
        });
        return {
          optionList,
          setDefaultState,
        };
      }
    }
    return null;
  }


  componentDidMount(): void {
    document.addEventListener('mousedown', this.handleClickOutside);
  }


  handleClickOutside(event: any) {
    if (this.selectContainer && !this.selectContainer.contains(event.target)) {
      this.setState({
        showOpts: false
      });
    }
  }

  componentWillUnmount(): void {
    this.selectContainer = null;
    this.setState = (state, callback) => {
      return;
    };
  }

  public getChildrenFromProps() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child: any) => React.cloneElement(child, {_key: child.props.value}),);
    return childrenWithProps;
  }

  private _handleChange = (e: any) => {
    const {showSearch} = this.props;
    if (!showSearch) return false;
    const value = e.target.value;
    this.setState({value});
    if (typeof this.props.onSearch === 'function') {
      this.props.onSearch(value);
    }

    if (!value) {
      this.reset();
    }
  };

  private reset = () => {
    this.setState({
      value: '',
      reset: true
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange('', null);
      }
    });
  };


  private handleContainerClick = (e: any) => {
    e.stopPropagation();
    if (this.props.disabled) return;
    this.setState((state) => {
      return {
        showOpts: !state.showOpts
      };
    });
  };

  private _onFocus = (): void => {
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus();
    }
  };

  private _onBlur = (): void => {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur();
    }
  };


  private emitChange = (option?: OptionType) => {
    const {onSelect} = this.props;
    if (typeof this.props.onChange === 'function') {
      const {multiple} = this.props;
      const {
        optionList
      } = this.state;
      this.setState({
        deleteState: false
      });
      if (multiple) {
        const mutiOptValues = optionList.map(opt => (
          opt.props
        ));
        this.props.onChange(mutiOptValues as any, optionList as any);
      } else {
        this.props.onChange(optionList[0].props as any, optionList[0] as any);
      }
      if (option) onSelect && onSelect(option.props, option);
    }
  };

  public handleOptClick = (option: OptionType) => {
    const optionProps = option.props;
    if (optionProps.disabled) return null;

    if (optionProps.operate === 'reset') {
      this.setState({
        reset: true,
        value: '',
        optionList: [],
        showOpts: false
      }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange('', null);
        }
      });
      return;
    }
    const {multiple, maxCount, maxCanChoose,onDelete} = this.props;
    if (multiple) {
      const {optionList} = this.state;
      if (optionList.length === 0) {
        optionList.push(option);
      } else {
        let pushFlag = true, deleteIndex;
        optionList.map((opt, index) => {
          if (option.key === opt.key) {
            //has selected, delete
            pushFlag = false;
            deleteIndex = index;
            onDelete && onDelete(opt.props, opt);
          }
        });

        if (maxCount && optionList.length < maxCount) {
          if (pushFlag) optionList.push(option);
        }
        if (maxCanChoose) if (pushFlag) optionList.push(option);


        if (typeof deleteIndex === 'number') optionList.splice(deleteIndex, 1);
        if (maxCanChoose) {
          if (maxCount && optionList.length > maxCount) {
            optionList.splice(0, 1);
          }
        }
      }
      this.setState({
        optionList: [...optionList]
      }, () => this.emitChange(option));
    } else {
      this.setState({
        optionList: [option],
        showOpts: false
      }, () => this.emitChange(option));
    }
  };

  private handleDelete = (deleteIndex: number, optionList: Array<IOptProps>, opt: OptionType) => {
    const {onDelete} = this.props;
    optionList.splice(deleteIndex, 1);
    this.setState({
      optionList,
      deleteState: true
    }, () => {
      onDelete && onDelete(opt.props, opt);
      this.emitChange();
    });
  };

  public render() {
    const {
      className,
      style,
      placeholder,
      disabled,
      searchPlaceholder,
      resetText,
      resetCls,
      searchCls,
      containerStyle
    } = getProps(this.props);

    const {prefixCls = ' hupu-select'} = this.props;

    const {
      optionList,
      value
    } = this.state;

    const selectContainerCls = [
      className,
      {[`${prefixCls}-disabled` as string]: disabled},
      [`${prefixCls}-container`],
      {[`${prefixCls}-focus`]: this.state.showOpts}
    ];

    let children = this.getChildrenFromProps();
    if (value) {
      children = filterChildren(this.getChildrenFromProps(), value) ? filterChildren(this.getChildrenFromProps(), value) : [];
    }

    return (
      <div
        style={style}
      >
        <div
          className={cls(selectContainerCls)}
          onClick={this.handleContainerClick}
          style={containerStyle}
          ref={(selectContainer) => this.selectContainer = selectContainer}
        >

          <Trigger
            optionList={optionList}
            placeholder={placeholder}
            {...this.props}
            onDelete={this.handleDelete}
          />

          <Popup
            {...this.props}
            children={children}
            showOpts={this.state.showOpts}
            defaultCurrent={this.state.defaultCurrent}
            selectedOpts={optionList}
            searchPlaceholder={searchPlaceholder}
            value={value}
            resetCls={resetCls}
            searchCls={searchCls}
            resetText={resetText}
            selectPrefixCls={prefixCls}
            onChange={this._handleChange}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            onOptClick={this.handleOptClick}
          />
        </div>
      </div>
    );
  };
}

export default Select;
