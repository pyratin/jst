'use strict';

import React from 'react';

import useEntityGet from 'client/Route/User/fn/useEntityGet';
import Error from 'client/Route/Component/Error';
import EntityDelete from 'client/Route/User/EntityDelete';

const EntityDetail = () => {
  const [entity, error] = useEntityGet();

  const errorRender = () => {
    return error && <Error error={error} />;
  };

  const headerRender = () => {
    return (
      <div className='header d-flex justify-content-center p-5 bg-light text-secondary'>
        <div className='email fs-1 fw-lighter'>{entity?.email}</div>
      </div>
    );
  };

  const _renderFn = () => {
    return entity && <div>{headerRender()}{<EntityDelete/>}</div>;
  };

  const renderFn = () => {
    return (
      <div>
        {errorRender()}
        {_renderFn()}
      </div>
    );
  };

  return <div className='EntityDetail'>{renderFn()}</div>;
};

export default EntityDetail;
