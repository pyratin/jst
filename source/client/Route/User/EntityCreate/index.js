'use strict';

import React from 'react';

import AuthorizationNavigation from 'client/Route/User/Component/AuthorizationNavigation';
import AuthorizationForm from 'client/Route/User/Component/AuthorizationForm';

const EntityCreate = () => {
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
