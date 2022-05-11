'use strict';

import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';

let ajv;

export default () => {
  ajv ??= ajvFormats(new Ajv({ allErrors: true }));

  return ajv;
};
