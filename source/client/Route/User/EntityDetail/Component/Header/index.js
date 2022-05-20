'use strict';

import React from 'react';

import UserProfile from 'client/Route/Shared/UserProfile';

const Header = (props) => {
  const profileRender = () => {
    return (
      <div className='p-2 me-1 border rounded-circle bg-white'>
        <UserProfile size='md' user={props.entity} />
      </div>
    );
  };

  const emailRender = () => {
    return (
      <div className='text-secondary'>
        <div className='email fs-3 fw-lighter'>{props.entity.email}</div>
      </div>
    );
  };

  const _renderFn = () => {
    return (
      <div className='d-flex justify-content-center align-items-center p-3 bg-light '>
        {profileRender()}
        {emailRender()}
      </div>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='Header'>{renderFn()}</div>;
};

export default Header;
