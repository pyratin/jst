'use strict';

import React from 'react';
import { Outlet } from 'react-router-dom';

const User = () => {
  const outletRender = () => {
    return <Outlet />;
  };

  const renderFn = () => {
    return <div>{outletRender()}</div>;
  };

  return <div className='User'>{renderFn()}</div>;
};

export default User;
