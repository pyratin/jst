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
import Error from 'client/Route/Component/Error';
import CollectionEmpty from 'client/Route/Component/CollectionEmpty';
import LoadingInline from 'client/Route/Component/LoadingInline';
import Item from './Item';
import Divider from 'client/Route/Component/Divider';

const PostCollection = (props) => {
  const limit = 1;

  const { dispatch } = useContext(Store);

  const entityPostCollection = Object.values(
    props.user.post.collection.dictionary
  );

  const hasMore = props.user.post.collection.info.hasMore;

  const [loading, loadingSet] = useState(false);

  const [error, errorSet] = useState();

  const [id, idSet] = useState('0cba3fb6-8033-4365-a648-d26e9240692a');

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
    return idSet(id);
  };

  const onEntityUpdateCancelHandle = () => {
    return idSet(null);
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
          user={props.user}
          entity={entity}
          update={entity.id === id}
          onEntityUpdateTrigger={onEntityUpdateTriggerHandle}
          onEntityUpdateCancel={onEntityUpdateCancelHandle}
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
