'use strict';

import { DateTime } from 'luxon';

export default (input) => {
  return DateTime.fromJSDate(input).set({ millisecond: 0 }).toSQL({ includeOffset: false });
};
