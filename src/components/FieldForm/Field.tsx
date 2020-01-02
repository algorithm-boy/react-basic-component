import React, {cloneElement, isValidElement, useCallback, useContext, useState, useEffect,} from 'react';
import {FormStore} from './FormStore';
import {FormOptions, FormOptionsContext, FormStoreContext} from './Form-context';
import {getPropName,getValueFromEvent} from './utils';


const useFieldChange = <T extends {}>(
  store: FormStore<T> | undefined,
  name: string | undefined,
  onChange: (name: string) => void
) => {
  useEffect(() => {
    if (!name || !store) return;

    return store.subscribe((n) => {
      if (name === '*' || n === name || n === '*') {
        onChange(name);
      }
    });
  }, [name, onChange, store]);
};


export interface FormFieldProps extends FormOptions {
  className?: string;
  label?: string;
  name?: string;
  valueProp?: string | ((type: any) => string);
  valueGetter?: (...args: any[]) => any;
  suffix?: React.ReactNode;
  children?: React.ReactNode;
}

export const FormField = (props: FormFieldProps) => {
  const {
    className,
    label,
    name,
    valueProp = 'value',
    suffix,
    children,
    valueGetter = getValueFromEvent,

    ...restProps
  } = props;

  const store = useContext(FormStoreContext);
  const options = useContext(FormOptionsContext);

  const [value, setValue] = useState(name && store ? store.get(name) : undefined);
  const [error, setError] = useState(name && store ? store.error(name) : undefined);

  useFieldChange(store, name, () => {
    if (store && name) {
      setValue(store.get(name));
      setError(store.error(name));
    }
  });

  let child: any = children;
  const onChange = useCallback(
    (...args: any[]) => {
      name && store && store.set(name as any, valueGetter(...args));
    },
    [name, store, valueGetter]
  );


  if (name && store && isValidElement(child)) {
    const prop = getPropName(valueProp, child && child.type);


    const childProps = {[prop]: value, onChange};
    child = cloneElement(child, childProps);
  }

  const {inline, compact, required, labelWidth, gutter, errorClassName} = {
    ...options,
    ...restProps
  };


  const classNames = [
    classes.field,
    inline ? classes.inline : '',
    compact ? classes.compact : '',
    required ? classes.required : '',
    error ? classes.error : '',
    className ? className : '',
    error ? errorClassName : ''
  ].join('');


  const headerStyle = {
    width: labelWidth,
    marginRight: gutter
  };

  return (
    <div className={classNames}>
      {label !== undefined && (
        <div className={classes.header} style={headerStyle}>
          {label}
        </div>
      )}
      <div className={classes.container}>
        <div className={classes.control}>{child}</div>
        <div className={classes.message}>{error}</div>
      </div>
      {suffix !== undefined && <div className={classes.footer}>{suffix}</div>}
    </div>
  );
};

const classes = {
  field: 'hfdc-form-field ',
  inline: 'hfdc-form-field--inline ',
  compact: 'hfdc-form-field--compact ',
  required: 'hfdc-form-field--required ',
  error: 'hfdc-form-field--error ',

  header: 'hfdc-form-field__header',
  container: 'hfdc-form-field__container',
  control: 'hfdc-form-field__control',
  message: 'hfdc-form-field__message',
  footer: 'hfdc-form-field__footer'
};
