'use strict';

import React, { useContext, useState } from 'react';

import { Store } from 'client/store';
import entityUpdateAction from 'client/store/action/post/entityUpdate';
import Header from 'client/Route/Post/Component/Shared/Header';
import Form from 'client/Route/Post/Component/Shared/Form';
import Modal from 'client/Route/Shared/Modal';

const EntityUpdate = (props) => {
  const input = { text: props.entity.text };

  const { dispatch } = useContext(Store);

  const [loading, loadingSet] = useState(false);

  const [error, errorSet] = useState();

  const entityUpdate = (input) => {
    loadingSet(true);

    return dispatch(entityUpdateAction(props.entity.id, input))
      .then(() => {
        props.onEntityUpdateCancel();
      })
      .catch((error) => {
        return errorSet(error);
      })
      .finally(() => {
        return loadingSet(false);
      });
  };

  const onSubmitHandle = (input) => {
    return !loading && entityUpdate(input);
  };

  const onModalCloseHandle = () => {
    return props.onEntityUpdateCancel();
  };

  const headerRender = () => {
    return (
      <Header
        actionType={props.actionType}
        userAuthorization={props.userAuthorization}
        user={props.user}
        entity={props.entity}
      />
    );
  };

  const formRender = () => {
    return (
      <Form
        actionType={props.actionType}
        input={input}
        loading={loading}
        error={error}
        user={props.user}
        onSubmit={onSubmitHandle}
      />
    );
  };

  const _renderFn = () => {
    return (
      <Modal title='Post Edit' onModalClose={onModalCloseHandle}>
        {headerRender()}
        {formRender()}
      </Modal>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='EntityUpdate'>{renderFn()}</div>;
};

export default EntityUpdate;
