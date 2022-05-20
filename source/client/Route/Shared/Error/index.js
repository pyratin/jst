'use strict';

import React from 'react';

const Error = (props) => {
  const iconRender = () => {
    return (
      <div className='me-3'>
        <i className='fa fa-triangle-exclamation'></i>
      </div>
    );
  };

  const eRender = (e, index) => {
    return (
      <div key={index}>
        source: {e.source}
        <br />
        message: {e.message}
      </div>
    );
  };

  const _errorRender = () => {
    return props.error._error.map((e, index) => {
      return eRender(e, index);
    });
  };

  const errorRender = () => {
    return <div>{_errorRender()}</div>;
  };

  const _renderFn = () => {
    return (
      <div className='d-flex align-items-center p-3 bg-light text-muted'>
        {iconRender()}
        {errorRender()}
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

  return <div className='Error'>{renderFn()}</div>;
};

export default Error;
