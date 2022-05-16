'use strict';

import ajvInstanceGet from 'server/router/fn/ajvInstanceGet';
import ajvErrorGet from 'server/router/fn/ajvErrorGet';

export default (input) => {
  const schema = {
    type: 'object',
    properties: {
      limit: {
        type: 'integer',
        minimum: 1
      },
      offset: {
        type: 'integer',
        minimum: 0
      },
    },
    required: ['limit', 'offset'],
    additionalProperties: false
  };

  const validate = ajvInstanceGet().compile(schema);

  const valid = validate(input);

  if (!valid) {
    throw ajvErrorGet(validate.errors);
  }
};
