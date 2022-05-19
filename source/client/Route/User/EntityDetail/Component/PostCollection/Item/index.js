'use strict';

import React from 'react';

import Header from './Header';

const Item = (props) => {
  const headerRender = () => {
    return <Header user={props.user} post={props.post} />;
  };

  const postTextRender = () => {
    return <div className='fs-3 fw-light'>{props.post.text}</div>;
  };

  const _renderFn = () => {
    return (
      <div className='p-3'>
        {headerRender()}
        {postTextRender()}
      </div>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='Item'>{renderFn()}</div>;
};

export default Item;
