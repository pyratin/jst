'use strict';

import { hashSync } from 'bcryptjs';

export default (input) => {
  return hashSync(input, 4);
};
