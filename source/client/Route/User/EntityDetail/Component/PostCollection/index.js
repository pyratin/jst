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

const PostCollection = (props) => {
  const limit = 1;

  const { dispatch } = useContext(Store);

  const entityPostCollection = Object.values(
    props.user.post.collection.dictionary
  );

  const hasMore = props.user.post.collection.info.hasMore;

  const [loading, loadingSet] = useState(false);

  const [error, errorSet] = useState();

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
    entityPostCollectionGet(entityPostCollection.length);
  }, [entityPostCollectionGet, entityPostCollection.length]);

  const collectionEmptyRender = () => {
    return (
      !loading &&
      !entityPostCollection.length && <CollectionEmpty collectionName='post' />
    );
  };

  const onLoadMoreHandle = () => {
    return !loading && entityPostCollectionGet(entityPostCollection.length);
  };

  const errorRender = () => {
    return error && <Error error={error} />;
  };

  const itemRender = (post, index) => {
    return (
      <Fragment key={index}>
        <Item post={post} />
      </Fragment>
    );
  };

  const _entityPostCollectionRender = () => {
    return entityPostCollection.map((post, index) => {
      return itemRender(post, index);
    });
  };

  const entityPostCollectionRender = () => {
    return (
      <ReactInfiniteScroller
        pageStart={0}
        loadMore={onLoadMoreHandle}
        hasMore={hasMore}
      >
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
          className='loader d-flex justify-content-center align-items-center'
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
