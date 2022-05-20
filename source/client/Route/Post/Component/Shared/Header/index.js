'use strict';

import React from 'react';
import { DateTime } from 'luxon';

import UserProfile from 'client/Route/Shared/UserProfile';
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

  const _detailRender = () => {
    return (
      <div className='small'>
        {userEmailRender()}
        {entityCreatedAtRender()}
      </div>
    );
  };

  const detailRender = () => {
    return (
      <div className='d-flex align-items-center'>
        {userProfileRender()}
        {_detailRender()}
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

  const _renderFn = () => {
    return (
      <div className='d-flex justify-content-between mb-3'>
        {detailRender()}
        {controlRender()}
      </div>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='Header'>{renderFn()}</div>;
};

export default Header;
