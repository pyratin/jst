'use strict';

import { useContext, useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Store } from 'client/store';
import entityGetAction from 'client/store/action/user/entityGet';

export default () => {
  const { store, dispatch } = useContext(Store);

  const params = useParams();

  const entity = store.user.collection[params.id];

  const [loading, loadingSet] = useState(false);

  const [error, errorSet] = useState();

  const entityGet = useCallback(() => {
    loadingSet(true);

    return dispatch(entityGetAction(params.id))
      .catch((error) => {
        return errorSet(error);
      })
      .finally(() => {
        return loadingSet(false);
      });
  }, [dispatch, params]);

  useEffect(() => {
    entity?.id !== params.id && !loading && !error && entityGet();
  }, [entity?.id, params.id, loading, error, entityGet]);

  return [entity, error];
};
