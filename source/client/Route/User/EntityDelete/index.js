'use strict';

import React, { useContext, useState } from 'react';

import { Store } from 'client/store';
import entityDeleteAction from 'client/store/action/user/entityDelete';

const EntityDelete = () => {
  const { store, dispatch } = useContext(Store);

  const [loading, loadingSet] = useState(false);

  const entityDelete = () => {
    loadingSet(true);

    return dispatch(entityDeleteAction(store.user.authorization?.id))
      .finally(() => {
        return loadingSet(false);
      });
  };

  const onClickHandle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    return !loading && entityDelete();
  };

  const _renderFn = () => {
    return (
      <a href='#' onClick={onClickHandle}>
        Delete
      </a>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='EntityDelete'>{renderFn()}</div>;
};

export default EntityDelete;
