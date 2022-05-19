'use strict';

import { DateTime } from 'luxon';

export default (input) => {
  return DateTime.fromSQL(input).toJSDate();
};
