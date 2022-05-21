'use strict';

import React from 'react';

import EntityUpdate from 'client/Route/Post/Component/EntityUpdate';
import EntityDelete from 'client/Route/Post/Component/EntityDelete';
import EntityDisplay from 'client/Route/Post/Component/EntityDisplay';

const Item = (props) => {
  const entityUpdateRender = () => {
    return (
      <EntityUpdate
        actionType={props.actionType}
        userAuthorization={props.userAuthorization}
        entity={props.entity}
        user={props.user}
        onEntityUpdateCancel={props.onEntityUpdateCancel}
      />
    );
  };

  const entityDeleteRender = () => {
    return (
      <EntityDelete
        entity={props.entity}
        user={props.user}
        onEntityDeleteCancel={props.onEntityDeleteCancel}
      />
    );
  };

  const actionSwitchRender = () => {
    switch (props.actionType) {
      case 'entityUpdate':
        return entityUpdateRender();

      case 'entityDelete':
        return entityDeleteRender();
    }
  };

  const entityDisplayRender = () => {
    return (
      <EntityDisplay
        actionType={props.actionType}
        userAuthorization={props.userAuthorization}
        entity={props.entity}
        user={props.user}
        onEntityUpdateTrigger={props.onEntityUpdateTrigger}
        onEntityDeleteTrigger={props.onEntityDeleteTrigger}
      />
    );
  };

  const _renderFn = () => {
    return (
      <div>
        {actionSwitchRender()}
        {entityDisplayRender()}
      </div>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='Item'>{renderFn()}</div>;
};

export default Item;
