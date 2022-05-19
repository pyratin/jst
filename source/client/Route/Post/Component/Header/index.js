'use strict';

import React from 'react';
import { DateTime } from 'luxon';

import UserProfile from 'client/Route/Component/UserProfile';
import Control from './Control';

const Header = (props) => {
  const controlRenderFlagGet = () => {
    switch (props.actionType) {
      case 'entityUpdate':
        return false;

      default:
        return true;
    }
  };

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

  const entityCreatedAtRender = () => {
    return (
      <div className='text-muted'>
        {DateTime.fromJSDate(new Date(props.entity.createdAt)).toFormat('F')}
      </div>
    );
  };

  const detailRender = () => {
    return (
      <div className='flex-grow-1 small'>
        {userEmailRender()}
        {entityCreatedAtRender()}
      </div>
    );
  };

  const _renderFn = () => {
    return (
      <div className='d-flex pb-3'>
        {userProfileRender()}
        {detailRender()}
      </div>
    );
  };

  const controlRender = () => {
    return (
      controlRenderFlagGet() && (
        <Control
          user={props.user}
          entity={props.entity}
          onEntityUpdateTrigger={props.onEntityUpdateTrigger}
        />
      )
    );
  };

  const renderFn = () => {
    return (
      <div className='d-flex justify-content-between'>
        {_renderFn()}
        {controlRender()}
      </div>
    );
  };

  return <div className='Header'>{renderFn()}</div>;
};

export default Header;
