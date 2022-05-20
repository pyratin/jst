'use strict';

import React from 'react';

import Header from 'client/Route/Post/Component/Shared/Header';
import Form from 'client/Route/Post/Component/Shared/Form';
import Modal from 'client/Route/Component/Modal';

const EntityUpdate = (props) => {
  const onSubmitHandle = (input) => {
    // eslint-disable-next-line no-console
    console.log(input);
  };

  const onModalCloseHandle = () => {
    return props.onEntityUpdateCancel();
  };

  const headerRender = () => {
    return (
      <Header
        actionType={props.actionType}
        user={props.user}
        entity={props.entity}
      />
    );
  };

  const formRender = () => {
    return (
      <Form
        actionType='entityUpdate'
        input={props.entity}
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
