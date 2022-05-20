'use strict';

import React from 'react';

import EntityUpdate from 'client/Route/Post/Component/EntityUpdate';
import EntityDisplay from 'client/Route/Post/Component/EntityDisplay';

const Item = (props) => {
  const entityUpdateRender = () => {
    return (
      props.update && (
        <EntityUpdate
          actionType='entityUpdate'
          user={props.user}
          entity={props.entity}
          onEntityUpdateCancel={props.onEntityUpdateCancel}
        />
      )
    );
  };

  const entityDisplayRender = () => {
    return (
      <EntityDisplay
        user={props.user}
        entity={props.entity}
        onEntityUpdateTrigger={props.onEntityUpdateTrigger}
      />
    );
  };

  const _renderFn = () => {
    return (
      <div>
        {entityUpdateRender()}
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
