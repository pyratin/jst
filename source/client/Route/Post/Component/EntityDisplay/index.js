'use strict';

import React from 'react';

import Header from 'client/Route/Post/Component/Header';

const EntityDisplay = (props) => {
  const headerRender = () => {
    return (
      <Header
        user={props.user}
        entity={props.entity}
        onEntityUpdateTrigger={props.onEntityUpdateTrigger}
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
