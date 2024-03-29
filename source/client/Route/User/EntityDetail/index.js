'use strict';

import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Store } from 'client/store';
import useEntityGet from 'client/Route/User/fn/useEntityGet';
import Loading from 'client/Route/Shared/Loading';
import Error from 'client/Route/Shared/Error';
import Header from './Component/Header';
import PostCreate from 'client/Route/Post/Component/EntityCreate';
import Divider from 'client/Route/Shared/Divider';
import PostCollection from './Component/PostCollection';

const EntityDetail = () => {
  const { store } = useContext(Store);

  const params = useParams();

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

  const postCreateRender = () => {
    return <PostCreate user={entity} />;
  };

  const dividerRender = () => {
    return <Divider size='md' />;
  };

  const postCollectionRender = () => {
    return (
      <PostCollection
        userAuthorization={store.user.authorization.id === params.id}
        user={entity}
      />
    );
  };

  const _renderFn = () => {
    return (
      entity && (
        <div className='success'>
          {headerRender()}
          {postCreateRender()}
          {dividerRender()}
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
