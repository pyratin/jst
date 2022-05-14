'use strict';

import React, { useEffect, useContext, useCallback } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { css } from '@emotion/react';

import { Store } from 'client/store';

const Route = () => {
  const { store } = useContext(Store);

  const location = useLocation();

  const navigate = useNavigate();

  const routeInitialize = useCallback(() => {
    switch (true) {
      case !store.user.authorization.id &&
        !location.pathname.match(/^\/User\/(Authenticate|Create)$/):
        return navigate('/User/Authenticate');

      case !!store.user.authorization.id && !!location.pathname.match(/^\/$/):
        return navigate(`/User/${store.user.authorization.id}`);
    }
  }, [store.user.authorization.id, location.pathname, navigate]);

  useEffect(() => {
    routeInitialize();
  }, [routeInitialize]);

  const outletRender = () => {
    return <Outlet />;
  };

  const renderFn = () => {
    return (
      <div
        className='d-flex justify-content-center'
        css={css({
          '> *': {
            width: '100%',
            maxWidth: 576
          }
        })}
      >
        {outletRender()}
      </div>
    );
  };

  return <div className='Route'>{renderFn()}</div>;
};

export default Route;
