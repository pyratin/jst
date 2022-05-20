'use strict';

import React from 'react';

const LoadingInline = () => {
  const _renderFn = () => {
    return <i className='fa fa-spinner fa-fw fa-spin'></i>;
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='LoadingInline'>{renderFn()}</div>;
};

export default LoadingInline;
