'use strict';

import React from 'react';

const CollectionEmpty = (props) => {
  const _renderFn = () => {
    return <div>No {props.collectionName} items to show</div>;
  };

  const renderFn = () => {
    return (
      <div className='d-flex justify-content-center mt-5'>{_renderFn()}</div>
    );
  };

  return <div className='CollectionEmpty'>{renderFn()}</div>;
};

export default CollectionEmpty;
