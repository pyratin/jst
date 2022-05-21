'use strict';

import React from 'react';

import EntityUpdateTrigger from './EntityUpdateTrigger';
import EntityDeleteTrigger from './EntityDeleteTrigger';

const Control = (props) => {
  const entityUpdateTriggerRender = () => {
    return (
      <EntityUpdateTrigger
        entity={props.entity}
        onEntityUpdateTrigger={props.onEntityUpdateTrigger}
      />
    );
  };

  const entityDeleteTriggerRender = () => {
    return (
      <EntityDeleteTrigger
        entity={props.entity}
        onEntityDeleteTrigger={props.onEntityDeleteTrigger}
      />
    );
  };

  const _renderFn = () => {
    return (
      <div className='dropdown'>
        <button className='btn btn-link' data-bs-toggle='dropdown'>
          <i className='fa fa-ellipsis'></i>
        </button>

        <ul className='dropdown-menu'>
          {entityUpdateTriggerRender()}

          <div className='dropdown-divider'></div>

          {entityDeleteTriggerRender()}
        </ul>
      </div>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='Control'>{renderFn()}</div>;
};

export default Control;
