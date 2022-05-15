'use strict';

import React from 'react';

const Header = (props) => {
  const _renderFn = () => {
    return (
      <div className='d-flex justify-content-center p-5 bg-light text-secondary'>
        <div className='email fs-1 fw-lighter'>{props.entity.email}</div>
      </div>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='Header'>{renderFn()}</div>;
};

export default Header;
