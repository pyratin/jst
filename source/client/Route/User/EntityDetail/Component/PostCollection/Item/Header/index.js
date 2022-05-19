'use strict';

import React from 'react';
import { DateTime } from 'luxon';

import UserProfile from 'client/Route/Component/UserProfile';

const Header = (props) => {
  const userProfileRender = () => {
    return (
      <div className='flex-shrink-0 me-1'>
        <UserProfile size='sm' user={props.user} />
      </div>
    );
  };

  const userEmailRender = () => {
    return <div>{props.user.email}</div>;
  };

  const postCreatedAtRender = () => {
    return (
      <div className='text-muted'>
        {DateTime.fromJSDate(new Date(props.post.createdAt)).toFormat('F')}
      </div>
    );
  };

  const detailRender = () => {
    return (
      <div className='flex-grow-1 small'>
        {userEmailRender()}
        {postCreatedAtRender()}
      </div>
    );
  };

  const _renderFn = () => {
    return (
      <div className='d-flex pb-1'>
        {userProfileRender()}
        {detailRender()}
      </div>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='Header'>{renderFn()}</div>;
};

export default Header;
