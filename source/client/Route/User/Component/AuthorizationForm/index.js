'use strict';

import React, { useRef, useCallback, useEffect } from 'react';

import useOnInputChange from 'client/Route/fn/useOnInputChange';
import errorShow from 'client/Route/fn/errorShow';
import errorClear from 'client/Route/fn/errorClear';
import LoadingInline from 'client/Route/Component/LoadingInline';

const AuthorizationForm = (props) => {
  const ref = useRef();

  const [email, onEmailChangeHandle] = useOnInputChange(props.input.email);

  const [password, onPasswordChangeHandle] = useOnInputChange(
    props.input.password
  );

  const onErrorHandle = useCallback(() => {
    return props.error
      ? errorShow(props.error, ref.current)
      : errorClear(ref.current);
  }, [props.error]);

  useEffect(() => {
    onErrorHandle();
  }, [onErrorHandle]);

  const textGet = () => {
    switch (props.actionType) {
      case 'entityAuthenticate':
        return 'Signin';

      case 'entityCreate':
        return 'Signup';
    }
  };

  const onSubmitHandle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    return props.onSubmit({
      email,
      password
    });
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
          <input
            type='email'
            className='formControl form-control'
            placeholder='email'
            data-key='email'
            value={email}
            onChange={onEmailChangeHandle}
          />

          <div className='invalidFeedback invalid-feedback'></div>
        </div>

        <div className='inputGroup mb-3'>
          <input
            type='password'
            className='formControl form-control'
            placeholder='password'
            data-key='password'
            value={password}
            onChange={onPasswordChangeHandle}
          />

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
    return <div className='p-3'>{_renderFn()}</div>;
  };

  return <div className='AuthorizationForm'>{renderFn()}</div>;
};

export default AuthorizationForm;
