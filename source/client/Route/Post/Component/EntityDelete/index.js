'use strict';

import React, { useContext, useState } from 'react';

import { Store } from 'client/store';
import entityDeleteAction from 'client/store/action/post/entityDelete';
import LoadingInline from 'client/Route/Shared/LoadingInline';
import Modal from 'client/Route/Shared/Modal';

const EntityDelete = (props) => {
  const { dispatch } = useContext(Store);

  const [loading, loadingSet] = useState(false);

  const onModalCloseHandle = () => {
    return props.onEntityDeleteCancel();
  };

  const entityDelete = () => {
    loadingSet(true);

    return dispatch(entityDeleteAction(props.entity.id))
      .then(() => {
        return props.onEntityDeleteCancel();
      })
      .finally(() => {
        return loadingSet(false);
      });
  };

  const onSubmitHandle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    return !loading && entityDelete();
  };

  const loadingInlineRender = () => {
    return (
      props.loading && (
        <>
          <LoadingInline />
          &nbsp;
        </>
      )
    );
  };

  const formRender = () => {
    return (
      <form onSubmit={onSubmitHandle}>
        <div className='mb-3'>Are you sure?</div>

        <div className='btnGroup d-flex justify-content-end'>
          <button type='submit' className='d-flex btn btn-outline-danger'>
            {loadingInlineRender()}
            Yes
          </button>
        </div>
      </form>
    );
  };

  const _renderFn = () => {
    return (
      <Modal title='Post Delete' onModalClose={onModalCloseHandle}>
        {formRender()}
      </Modal>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='EntityDelete'>{renderFn()}</div>;
};

export default EntityDelete;
