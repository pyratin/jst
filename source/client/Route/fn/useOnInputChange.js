'use strict';

import { useState } from 'react';

export default (_value) => {
  const [value, valueSet] = useState(_value);

  const onChangeHandle = (event) => {
    return valueSet($(event.target).val());
  };

  return [value, onChangeHandle, valueSet];
};
