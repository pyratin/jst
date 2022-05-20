'use strict';

import React from 'react';

const Divider = (props) => {
  const pyGet = () => {
    switch (props.size) {
      case 'md':
        return 'py-1';
    }
  };

  const _renderFn = () => {
    return <div className={`bg-light border-top ${pyGet()}`}></div>;
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='Divider'>{renderFn()}</div>;
};

export default Divider;
