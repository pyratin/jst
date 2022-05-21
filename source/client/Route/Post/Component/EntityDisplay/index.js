'use strict';

import React from 'react';

import Header from 'client/Route/Post/Component/Shared/Header';

const EntityDisplay = (props) => {
  const headerRender = () => {
    return (
      <Header
        actionType={props.actionType}
        userAuthorization={props.userAuthorization}
        entity={props.entity}
        user={props.user}
        onEntityUpdateTrigger={props.onEntityUpdateTrigger}
        onEntityDeleteTrigger={props.onEntityDeleteTrigger}
      />
    );
  };

  const entityTextRender = () => {
    return <div className='fs-3 fw-light'>{props.entity.text}</div>;
  };

  const _renderFn = () => {
    return (
      <div className='p-3'>
        {headerRender()}
        {entityTextRender()}
      </div>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='EntityDisplay'>{renderFn()}</div>;
};

export default EntityDisplay;
