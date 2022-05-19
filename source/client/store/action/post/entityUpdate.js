'use strict';

export default (id) => {
  return (_dispatch, Authorization) => {
    return window
      .fetch(`/post/${id}`, {
        method: 'PUT',
        headers: {
          Authorization,
          'Content-Type': 'application/json'
        }
      })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        if (result._error) {
          throw result;
        }

        _dispatch({
          type: 'POST_UPDATE',
          result
        });

        return result;
      });
  };
};
