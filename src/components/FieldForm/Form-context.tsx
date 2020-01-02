import React from 'react';
import {FormStore} from './FormStore';

export interface FormOptions {
  inline?: boolean;
  compact?: boolean;
  required?: boolean;
  labelWidth?: number;
  gutter?: number;
  errorClassName?: string;
}

export const FormOptionsContext = React.createContext<FormOptions>({});

export const FormStoreContext = React.createContext<FormStore<any> | undefined>(undefined);
