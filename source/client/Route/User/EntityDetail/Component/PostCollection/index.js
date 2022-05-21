'use strict';

import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  Fragment
} from 'react';
import ReactInfiniteScroller from 'react-infinite-scroller';

import { Store } from 'client/store';
import entityPostCollectionGetAction from 'client/store/action/user/entityPostCollectionGet';
import Error from 'client/Route/Shared/Error';
import CollectionEmpty from 'client/Route/Shared/CollectionEmpty';
import LoadingInline from 'client/Route/Shared/LoadingInline';
import Item from './Item';
import Divider from 'client/Route/Shared/Divider';

const PostCollection = (props) => {
  const limit = 1;

  const { dispatch } = useContext(Store);

  const entityPostCollection = Object.values(
    props.user.post.collection.dictionary
  );

  const hasMore = props.user.post.collection.info.hasMore;

  const [loading, loadingSet] = useState(false);

  const [error, errorSet] = useState();

  const [action, actionSet] = /** @type {any} */ (useState());

  const entityPostCollectionGet = useCallback(
    (offset) => {
      loadingSet(true);

      return dispatch(
        entityPostCollectionGetAction(props.user.id, {
          limit,
          offset
        })
      )
        .catch((error) => {
          return errorSet(error);
        })
        .finally(() => {
          return loadingSet(false);
        });
    },
    [dispatch, props.user.id]
  );

  useEffect(() => {
    entityPostCollectionGet(0);
  }, [entityPostCollectionGet]);

  const onLoadMoreHandle = () => {
    return entityPostCollectionGet(entityPostCollection.length);
  };

  const onEntityUpdateTriggerHandle = (id) => {
    return actionSet({
      type: 'entityUpdate',
      id
    });
  };

  const actionTypeGet = (id) => {
    return id === action?.id && action.type;
  };

  const onEntityUpdateCancelHandle = () => {
    return actionSet(null);
  };

  const onEntityDeleteTriggerHandle = (id) => {
    return actionSet({
      type: 'entityDelete',
      id
    });
  };

  const onEntityDeleteCancelHandle = () => {
    return actionSet(null);
  };

  const collectionEmptyRender = () => {
    return (
      !loading &&
      !entityPostCollection.length && <CollectionEmpty collectionName='post' />
    );
  };

  const errorRender = () => {
    return error && <Error error={error} />;
  };

  const itemRender = (entity, index) => {
    return (
      <Fragment key={index}>
        <Item
          actionType={actionTypeGet(entity.id)}
          userAuthorization={props.userAuthorization}
          entity={entity}
          user={props.user}
          onEntityUpdateTrigger={onEntityUpdateTriggerHandle}
          onEntityUpdateCancel={onEntityUpdateCancelHandle}
          onEntityDeleteTrigger={onEntityDeleteTriggerHandle}
          onEntityDeleteCancel={onEntityDeleteCancelHandle}
        />
        <Divider size='md' />
      </Fragment>
    );
  };

  const _entityPostCollectionRender = () => {
    return entityPostCollection.map((entity, index) => {
      return itemRender(entity, index);
    });
  };

  const entityPostCollectionRender = () => {
    return (
      <ReactInfiniteScroller loadMore={onLoadMoreHandle} hasMore={hasMore}>
        {_entityPostCollectionRender()}
      </ReactInfiniteScroller>
    );
  };

  const _renderFn = () => {
    return (
      !error && (
        <div className='success'>
          {collectionEmptyRender()}
          {entityPostCollectionRender()}
        </div>
      )
    );
  };

  const loadingRender = () => {
    return (
      loading && (
        <div
          key='loader'
          className='loader d-flex justify-content-center align-items-center p-5'
        >
          <LoadingInline />
        </div>
      )
    );
  };

  const renderFn = () => {
    return (
      <div>
        {errorRender()}
        {_renderFn()}
        {loadingRender()}
      </div>
    );
  };

  return <div className='PostCollection'>{renderFn()}</div>;
};

export default PostCollection;
