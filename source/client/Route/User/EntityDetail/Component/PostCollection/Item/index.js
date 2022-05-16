'use strict';

import React from 'react';

const Item = (props) => {
  const _renderFn = () => {
    return <div>{props.post.text}</div>;
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='Item'>{renderFn()}</div>;
};

export default Item;
