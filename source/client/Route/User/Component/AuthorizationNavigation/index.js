'use strict';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthorizationNavigation = () => {
  const itemCollection = [
    {
      text: 'Signin',
      pathname: '/User/Authenticate'
    },
    {
      text: 'Signup',
      pathname: '/User/Create'
    }
  ];

  const location = useLocation();

  const navigate = useNavigate();

  const onClickHandle = (item) => {
    return navigate(item.pathname);
  };

  const onClickHandleFn = (item) => {
    return (event) => {
      event.preventDefault();
      event.stopPropagation();

      return onClickHandle(item);
    };
  };

  const activeGet = (item) => {
    return item.pathname === location.pathname ? 'active' : '';
  };

  const itemRender = (item, index) => {
    return (
      <li key={index} className='nav-item'>
        <a
          href='#'
          className={`nav-link ${activeGet(item)}`}
          onClick={onClickHandleFn(item)}
        >
          {item.text}
        </a>
      </li>
    );
  };

  const itemCollectionRender = () => {
    return itemCollection.map((item, index) => {
      return itemRender(item, index);
    });
  };

  const _renderFn = () => {
    return <ul className='nav nav-tabs'>{itemCollectionRender()}</ul>;
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='AuthorizationNavigation'>{renderFn()}</div>;
};

export default AuthorizationNavigation;
