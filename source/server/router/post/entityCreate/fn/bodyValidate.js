'use strict';

import bodyFragment from 'server/router/post/fn/bodyFragment';
import ajvInstanceGet from 'server/router/fn/ajvInstanceGet';
import ajvErrorGet from 'server/router/fn/ajvErrorGet';

export default (input) => {
  const schema = {
    type: 'object',
    properties: {
      ...bodyFragment
    },
    required: ['text'],
    additionalProperties: false
  };

  const validate = ajvInstanceGet().compile(schema);

  const valid = validate(input);

  if (!valid) {
    throw ajvErrorGet(validate.errors);
  }
};
