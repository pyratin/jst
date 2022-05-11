'use strict';

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Store } from 'client/store';
import entityAuthenticateAction from 'client/store/action/user/entityAuthenticate';
import AuthorizationNavigation from 'client/Route/User/Component/AuthorizationNavigation';
import AuthorizationForm from 'client/Route/User/Component/AuthorizationForm';

const EntityAuthenticate = () => {
  const { dispatch } = useContext(Store);

  const navigate = useNavigate();

  const [loading, loadingSet] = useState(false);

  const [error, errorSet] = useState();

  const entityAuthenticate = (input) => {
    loadingSet(true);

    errorSet(null);

    return dispatch(entityAuthenticateAction(input))
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
    return !loading && entityAuthenticate(input);
  };

  const authorizationNavigationRender = () => {
    return <AuthorizationNavigation />;
  };

  const formRender = () => {
    return (
      <AuthorizationForm
        actionType='entityAuthenticate'
        input={{
          email: '',
          password: ''
        }}
        error={error}
        onSubmit={onSubmitHandle}
      />
    );
  };

  const renderFn = () => {
    return (
      <div className='p-3 border'>
        {authorizationNavigationRender()}
        {formRender()}
      </div>
    );
  };

  return <div className='EntityAuthenticate'>{renderFn()}</div>;
};

export default EntityAuthenticate;