import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from './seaLazyBaseQuery';

export { baseQuery };

export default createApi({
  reducerPath: 'seaApi',
  baseQuery,
  endpoints: () => ({}),
});
