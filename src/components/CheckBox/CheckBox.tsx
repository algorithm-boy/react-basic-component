import React, { SFC } from 'react';
import { GeneralProps } from '../global.d';

export interface CheckBoxProps extends GeneralProps {
  id?: string | number;
  name? : number | string;
  disabled?: boolean;
  defaultChecked?: boolean;
  className? : string;
  style? : React.CSSProperties;
  checked?: boolean;
  readOnly?: boolean;
  onChange? : (event?: any) => void;
};

const CheckBox: SFC<CheckBoxProps> = props => {
  const { className, style = {}, children, disabled } = props;
  return (
    <div
      className={className}
      style={style}
    >
      <p>
        <input 
          type="checkbox" 
          disabled={disabled || props.readOnly}
          defaultChecked={props.defaultChecked}
          className={props.className}
          style={props.style}
          checked={props.checked}
          readOnly={props.readOnly}
          onChange={(e)=>{
            props.onChange?props.onChange(e.target.checked):'';
          }}  
        />
        {children}
      </p>
    </div>
  );
};

export default CheckBox;
