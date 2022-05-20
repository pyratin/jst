'use strict';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import autosize from 'autosize';

import useOnInputChange from 'client/Route/fn/useOnInputChange';
import errorShow from 'client/Route/fn/errorShow';
import errorClear from 'client/Route/fn/errorClear';
import LoadingInline from 'client/Route/Component/LoadingInline';

const Form = (props) => {
  const [text, onTextChangeHandle, textSet] = useOnInputChange(
    props.input.text
  );

  const [submit, submitSet] = useState(false);

  const ref = useRef();

  const onEntityCreateSuccessHandle = useCallback(() => {
    props.actionType === 'entityCreate' && submit && textSet(props.input.text);

    submitSet(false);
  }, [submit, textSet, props.input.text]);

  const onErrorHandle = useCallback(() => {
    return props.error
      ? errorShow(props.error, ref.current)
      : errorClear(ref.current);
  }, [props.error]);

  const renderInitialize = useCallback(() => {
    autosize($('textarea'));
  }, []);

  useEffect(() => {
    onEntityCreateSuccessHandle();
  }, [onEntityCreateSuccessHandle]);

  useEffect(() => {
    onErrorHandle();
  }, [onErrorHandle]);

  useEffect(() => {
    renderInitialize();
  }, [renderInitialize]);

  const onSubmitHandle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    submitSet(true);

    return props.onSubmit({ text });
  };

  const textGet = () => {
    switch (props.actionType) {
      case 'entityCreate':
        return 'Post';

      case 'entityUpdate':
        return 'Save';
    }
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

  const _renderFn = () => {
    return (
      <form ref={ref} onSubmit={onSubmitHandle}>
        <div className='inputGroup mb-3'>
          <textarea
            rows={1}
            className='formControl form-control'
            placeholder={`what is on your mind, ${props.user.email}?`}
            data-key='text'
            value={text}
            onChange={onTextChangeHandle}
          ></textarea>

          <div className='invalidFeedback invalid-feedback'></div>
        </div>

        <div className='btnGroup d-flex justify-content-end'>
          <button type='submit' className='d-flex btn btn-outline-primary'>
            {loadingInlineRender()}
            {textGet()}
          </button>
        </div>
      </form>
    );
  };

  const renderFn = () => {
    return <div>{_renderFn()}</div>;
  };

  return <div className='Form'>{renderFn()}</div>;
};

export default Form;
