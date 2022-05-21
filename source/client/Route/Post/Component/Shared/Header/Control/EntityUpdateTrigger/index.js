'use strict';

import React from 'react';

const EntityUpdateTrigger = (props) => {
  const onClickHandle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    return props.onEntityUpdateTrigger(props.entity.id);
  };

  const iconRender = () => {
    return (
      <div className='me-1'>
        <i className='fa fa-edit'></i>
      </div>
    );
  };

  const _renderFn = () => {
    return (
      <li>
        <a href='#' className='d-flex dropdown-item' onClick={onClickHandle}>
          {iconRender()}
          Update
        </a>
      </li>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='EntityUpdateTrigger'>{renderFn()}</div>;
};

export default EntityUpdateTrigger;
