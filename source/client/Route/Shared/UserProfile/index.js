'use strict';

import React from 'react';

const UserProfile = (props) => {
  const widthGet = () => {
    switch (props.size) {
      case 'md':
        return 64;

      case 'sm':
        return 38;
    }
  };

  const _renderFn = () => {
    return <img width={widthGet()} src={props.user.profile} />;
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div>{renderFn()}</div>;
};

export default UserProfile;
