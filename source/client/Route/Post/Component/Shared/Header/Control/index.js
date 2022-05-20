'use strict';

import React from 'react';

import UpdateTrigger from './UpdateTrigger';

const Control = (props) => {
  const updateTriggerRender = () => {
    return (
      <UpdateTrigger
        entity={props.entity}
        onEntityUpdateTrigger={props.onEntityUpdateTrigger}
      />
    );
  };

  const _renderFn = () => {
    return (
      <div className='dropdown'>
        <button className='btn btn-link' data-bs-toggle='dropdown'>
          <i className='fa fa-ellipsis'></i>
        </button>

        <ul className='dropdown-menu'>{updateTriggerRender()}</ul>
      </div>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='Control'>{renderFn()}</div>;
};

export default Control;
