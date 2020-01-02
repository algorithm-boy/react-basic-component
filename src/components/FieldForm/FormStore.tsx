import {deepCopy, deepGet, deepSet} from './utils';
import {useEffect, useMemo} from 'react';


export type FormListener = (name: string) => void;
export type FormResult = boolean | string | number | object | null | undefined;
export type FormValidator = (value: any, values: any) => FormResult | Promise<FormResult>;
export type FormRules = { [key: string]: FormValidator };
export type FormErrors = { [key: string]: string | undefined }

async function executeValidator(
  validator: FormValidator | undefined,
  value: any,
  values: any
): Promise<Error | undefined> {
  if (validator) {
    const result = await validator(value, values);

    if (result !== true && result !== undefined) {
      return new Error(typeof result === 'string' ? result : '');
    }
  }
  return undefined;
}

export class FormStore<T extends {} = any> {

  private initValue: T;
  private listeners: FormListener[] = [];
  private values: T;
  private rules: FormRules;
  private errors: FormErrors = {};


  //Partial 作用是将传入的属性变为可选项.
  public constructor(values: Partial<T> = {}, rules: FormRules = {}) {
    this.initValue = values as any;
    this.values = deepCopy(values) as any;
    this.rules = rules;

    this.set = this.set.bind(this);
    this.validate = this.validate.bind(this);

  }

  public reset() {
    this.errors = {};
    this.values = deepCopy(this.initValue);
    this.notify('*');
  }


  private notify(name: string): void {
    this.listeners.forEach((listener) => listener(name));
  }

  public get(name?: string): T {
    return name === undefined ? {...this.values} : deepGet(this.values, name);
  }

  public async set(values: Partial<T>): Promise<void>
  public async set(name: string, value: any, validate?: boolean): Promise<void>
  public async set(name: any, value?: any, validate = true) {
    if (typeof name === 'string') {
      deepSet(this.values, name, value);
      this.notify(name);

      if (validate) {
        await this.validate(name);
        this.notify(name);
      }
    } else if (name) {
      await Promise.all(Object.keys(name).map((n) => this.set(n, name[n])));
    }
  }


  public error(): FormErrors
  public error(name: number | string): string | undefined
  public error(name: string, value: string | undefined): string | undefined
  public error(...args: any[]) {
    let name, value;
    if (args.length === 2) {
      [name, value] = args;
    } else {
      [name] = args;
    }

    if (args.length === 0) return this.errors;

    if (typeof name === 'number') {
      name = Object.keys(this.errors)[name];
    }

    if (args.length === 2) {
      if (value === undefined) {
        delete this.errors[name];
      } else {
        this.errors[name] = value;
      }
    }

    return this.errors[name];
  }


  public async validate(): Promise<[Error | undefined, T]>
  public async validate(name: string): Promise<[Error | undefined, any]>
  public async validate(name?: string) {
    if (name === undefined) {
      await Promise.all(Object.keys(this.rules).map((n) => this.validate(n)));
      this.notify('*');

      const message = this.error(0);
      const error = message === undefined ? undefined : new Error(message);

      return [error, this.get()];
    } else {
      const validator = this.rules[name];
      const value = this.get(name);

      const error = await executeValidator(validator, value, this.values);
      this.error(name, error && error.message);

      return [error, value];
    }
  }

  public subscribe(listener: FormListener) {
    this.listeners.push(listener);

    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) this.listeners.splice(index, 1);
    };
  }

}

export function useFormStore<T extends {} = any>(
  values: Partial<T> = {},
  rules: FormRules = {}
) {
  return useMemo(() => new FormStore(values, rules), [rules, values]);
}

export const useFormChange = <T extends {} = any>(
  store: FormStore<T> | undefined,
  onChange: (name: string) => void
) => {
  useEffect(() => {
    if (!store) return;
    return store.subscribe(n => onChange(n));
  });
};

