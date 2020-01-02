import { useState, useEffect } from 'react';

type Params = {
  value?: string;
  initValue?: string;
  maxLength?: number;
}

export function useSetValue (params: Params) {
  const { value = '', initValue = '', maxLength = Infinity } = params;
  const [ val, setVal ] = useState(value || initValue);
  useEffect(() => {
    if (value.length > maxLength) return;
    setVal(value);
    /* eslint-disable */
    // ignore eslint-plugin-react-hooks which will auto fill conditional variable
  }, [value, maxLength]);
    /* eslint-enable */

  return { val, setVal };
}

export default useSetValue;