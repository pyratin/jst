'use strict';

import React, { useContext, useState } from 'react';

import { Store } from 'client/store';
import entityCreateAction from 'client/store/action/post/entityCreate';
import UserProfile from 'client/Route/Component/UserProfile';
import Form from 'client/Route/Post/Component/Shared/Form';

const EntityCreate = (props) => {
  const _input = { text: '' };

  const { dispatch } = useContext(Store);

  const [input, inputSet] = useState(_input);

  const [loading, loadingSet] = useState(false);

  const [error, errorSet] = useState();

  const entityCreate = (input) => {
    loadingSet(true);

    errorSet(null);

    return dispatch(entityCreateAction(input))
      .then(() => {
        return inputSet(_input);
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

  const profileRender = () => {
    return (
      <div className='flex-shrink-0 me-1 border'>
        <UserProfile size='sm' user={props.user} />
      </div>
    );
  };

  const formRender = () => {
    return (
      <div className='flex-grow-1'>
        <Form
          actionType='entityCreate'
          input={input}
          loading={loading}
          error={error}
          user={props.user}
          onSubmit={onSubmitHandle}
        />
      </div>
    );
  };

  const _renderFn = () => {
    return (
      <div className='d-flex align-items-start p-3'>
        {profileRender()}
        {formRender()}
      </div>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='EntityCreate'>{renderFn()}</div>;
};

export default EntityCreate;
