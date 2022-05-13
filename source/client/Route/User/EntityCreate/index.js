'use strict';

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Store } from 'client/store';
import entityCreateAction from 'client/store/action/user/entityCreate';
import AuthorizationNavigation from 'client/Route/User/Component/AuthorizationNavigation';
import AuthorizationForm from 'client/Route/User/Component/AuthorizationForm';

const EntityCreate = () => {
  const { dispatch } = useContext(Store);

  const navigate = useNavigate();

  const [loading, loadingSet] = useState(false);

  const [error, errorSet] = useState();

  const entityCreate = (input) => {
    loadingSet(true);

    errorSet(null);

    return dispatch(entityCreateAction(input))
      .then(() => {
        return navigate('/');
      })
      .catch((error) => {
        return errorSet(error);
      })
      .finally(() => {
        return loadingSet(false);
      });
  };

  const onSubmitHandle = (input) => {
    return !loading && entityCreate(input);
  };

  const authorizationNavigationRender = () => {
    return <AuthorizationNavigation />;
  };

  const authorizationFormRender = () => {
    return (
      <AuthorizationForm
        actionType='entityCreate'
        input={{
          email: '',
          password: ''
        }}
        loading={loading}
        error={error}
        onSubmit={onSubmitHandle}
      />
    );
  };

  const renderFn = () => {
    return (
      <div className='p-3 border'>
        {authorizationNavigationRender()}
        {authorizationFormRender()}
      </div>
    );
  };

  return <div className='EntityCreate'>{renderFn()}</div>;
};

export default EntityCreate;
