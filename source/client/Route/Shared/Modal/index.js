'use strict';

import React, { useRef, useCallback, useEffect } from 'react';
import { Modal as BootstrapModal } from 'bootstrap';

const Modal = (_props) => {
  const {onModalClose, ...props} = _props;

  const ref = /** @type {any} */ (useRef());

  const onModalCloseHandle = useCallback(() => {
    return onModalClose();
  }, [onModalClose]);

  const renderInitialize = useCallback(() => {
    new BootstrapModal(ref.current).show();
  }, []);

  useEffect(() => {
    const refCurrent = ref.current;

    refCurrent.addEventListener('hide.bs.modal', onModalCloseHandle);

    renderInitialize();

    return () => {
      $('.modal-backdrop').remove();

      return refCurrent.removeEventListener(
        'hide.bs.modal',
        onModalCloseHandle
      );
    };
  }, [onModalCloseHandle, renderInitialize]);

  const _renderFn = () => {
    return (
      <div ref={ref} className='modal fade' tabIndex={-1}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <div className='modal-title'>{props.title}</div>
              <button className='btn-close' data-bs-dismiss='modal'></button>
            </div>

            <div className='modal-body'>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };
  return <div className='Modal'>{renderFn()}</div>;
};

export default Modal;
