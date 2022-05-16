'use strict';

import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  Fragment
} from 'react';
import { useParams } from 'react-router-dom';

import { Store } from 'client/store';
import entityPostCollectionGetAction from 'client/store/action/user/entityPostCollectionGet';
import ReactInfiniteScroller from 'react-infinite-scroller';
import LoadingInline from 'client/Route/Component/LoadingInline';
import Item from './Item';

const PostCollection = () => {
  const limit = 1;

  const { store, dispatch } = useContext(Store);

  const params = useParams();

  const entity = store.user.collection.dictionary[params.id];

  const entityPostCollection = Object.values(entity.post.collection.dictionary);

  const hasMore = entity.post.collection.info.hasMore;

  const [loading, loadingSet] = useState(false);

  const entityPostCollectionGet = useCallback(
    (offset) => {
      loadingSet(true);

      return dispatch(
        entityPostCollectionGetAction(params.id, {
          limit,
          offset
        })
      ).finally(() => {
        return loadingSet(false);
      });
    },
    [dispatch, params.id]
  );

  useEffect(() => {
    entityPostCollectionGet(0);
  }, [entityPostCollectionGet]);

  const onLoadMoreHandle = () => {
    return !loading && entityPostCollectionGet(entityPostCollection.length);
  };

  const loaderRender = () => {
    return (
      <div
        className='loader d-flex justify-content-center align-items-center p-5'
        key='loader'
      >
        <LoadingInline />
      </div>
    );
  };

  const itemRender = (post, index) => {
    return (
      <Fragment key={index}>
        <Item post={post} />
      </Fragment>
    );
  };

  const entityPostCollectionRender = () => {
    return entityPostCollection.map((post, index) => {
      return itemRender(post, index);
    });
  };

  const _renderFn = () => {
    return (
      <ReactInfiniteScroller
        pageStart={0}
        loadMore={onLoadMoreHandle}
        hasMore={hasMore}
        loader={loaderRender()}
      >
        {entityPostCollectionRender()}
      </ReactInfiniteScroller>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='PostCollection'>{renderFn()}</div>;
};

export default PostCollection;
