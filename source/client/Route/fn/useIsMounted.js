'use strict';

import { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;

    return () => {
      ref.current = false;
    };
  });

  return ref;
};
