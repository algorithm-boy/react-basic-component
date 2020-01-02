// import './style.less';

import React from 'react';
import {FormField} from './Field';
// import { FormItem } from './form-item'
import {FormStore} from './FormStore';
import {FormStoreContext, FormOptions, FormOptionsContext} from './Form-context';

export interface FormProps extends FormOptions {
  className?: string;
  store: FormStore;
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function Form(props: FormProps) {
  const {className = '', children, store, onSubmit, onReset, ...options} = props;

  const classNames = 'hfdc-form ' + className;

  return (
    <FormStoreContext.Provider value={store}>
      <FormOptionsContext.Provider value={options}>
        <form className={classNames} onSubmit={onSubmit} onReset={onReset}>
          {children}
        </form>
      </FormOptionsContext.Provider>
    </FormStoreContext.Provider>
  );
}

Form.Field = FormField;

// Form.Item = FormItem
