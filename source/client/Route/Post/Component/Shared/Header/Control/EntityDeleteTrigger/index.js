'use strict';

import React from 'react';

const EntityDeleteTrigger = (props) => {
  const onClickHandle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    return props.onEntityDeleteTrigger(props.entity.id);
  };

  const iconRender = () => {
    return (
      <div className='me-1'>
        <i className='fa fa-square-xmark'></i>
      </div>
    );
  };

  const _renderFn = () => {
    return (
      <li>
        <a href='#' className='d-flex dropdown-item' onClick={onClickHandle}>
          {iconRender()}
          Delete
        </a>
      </li>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='EntityDeleteTrigger'>{renderFn()}</div>;
};

export default EntityDeleteTrigger;
