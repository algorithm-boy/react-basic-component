import * as React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Form, FormStore} from '../index'
import {boolean,} from "@storybook/addon-knobs";

configure({ adapter: new Adapter() });

describe('FieldForm', () => {
  it('renders correctly', () => {

    const store = new FormStore(
      {
        username: 'Default',
        password: '1',
        gender: 'female',
        contact: {
          phone: '',
          address: ''
        }
      },
      {
        username: (val: string) => !!val.trim() || '请输入用户名',
        password: (val: string) => !!val.trim() || '请输入密码',
        'contact.phone': (val: string) => /[0-9]{11}/.test(val) || 'Phone is invalid',
        'contact.address': (val: string) => !!val.trim() || 'Address is required'
      }
    )

    const wrapper = render(
      <Form
        store={store}
      >
        <Form.Field label='Username' name='username'
                    required={boolean('Required', true)}
        >
          <input type='text'/>
        </Form.Field>

        <Form.Field label='Password' name='password'>
          <input type='password'/>
        </Form.Field>


        <Form.Field label='Phone' name='contact.phone'>
          <input type='text'/>
        </Form.Field>

        <Form.Field label='Address' name='contact.address'>
          <input type='text'/>
        </Form.Field>

        <Form.Field label=''>
          <button >Reset</button>
          <button >Submit</button>
        </Form.Field>
      </Form>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
