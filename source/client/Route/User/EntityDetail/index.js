'use strict';

import React from 'react';

import useEntityGet from 'client/Route/User/fn/useEntityGet';
import Loading from 'client/Route/Component/Loading';
import Error from 'client/Route/Component/Error';
import Header from './Component/Header';
import PostCollection from './Component/PostCollection';

const EntityDetail = () => {
  const [entity, loading, error] = useEntityGet();

  const loadingRender = () => {
    return loading && <Loading />;
  };

  const errorRender = () => {
    return error && <Error error={error} />;
  };

  const headerRender = () => {
    return <Header entity={entity} />;
  };

  const postCollectionRender = () => {
    return <PostCollection user={entity} />;
  };

  const _renderFn = () => {
    return (
      entity && (
        <div className='success'>
          {headerRender()}
          {postCollectionRender()}
        </div>
      )
    );
  };

  const renderFn = () => {
    return (
      <div>
        {loadingRender()}
        {errorRender()}
        {_renderFn()}
      </div>
    );
  };

  return <div className='EntityDetail'>{renderFn()}</div>;
};

export default EntityDetail;
