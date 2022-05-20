'use strict';

import React from 'react';

const Loading = () => {
  const _renderFn = () => {
    return (
      <div>
        <i className='fa fa-spinner fa-fw fa-spin'></i>
      </div>
    );
  };

  const renderFn = () => {
    return (
      <div className='d-flex justify-content-center mt-5'>
        {_renderFn()}
      </div>
    );
  };

  return <div className='Loading'>{renderFn()}</div>;
};

export default Loading;
