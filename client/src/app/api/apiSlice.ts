import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { loggedOut, setAccess } from "../slices/sessionSlice";
import { Mutex } from 'async-mutex';
import { RootState } from '../store';
const url = 'http://localhost:1337';

const mutex: Mutex = new Mutex();

const tags: string[] = [ 
	'Uni', 'Student', 'Professor',
  'Department', 'Subject', 'Service', 
  'Grade', 'Exam', 'Period', 
  'User', 'Role', 'Optional'
];

const baseQuery = fetchBaseQuery({ 
  baseUrl: `${url}/`, 
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken = state.session.accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
      
      if(headers.has('Content-Type')) {
        headers.set('Content-Type', headers.get('Content-Type')!);
      } else {
        headers.set('Content-Type', 'application/json');
      }
    }
    return headers;
  }
});
const baseQueryWithReauth: BaseQueryFn<
string | FetchArgs,
any,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if(result?.error?.status === 401) {
    api.dispatch(setAccess(''));
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      
      try {
        const state = api.getState() as RootState;
        const refreshToken: string = state.session?.refreshToken;

        if(refreshToken) {
          const refreshResult = await baseQuery({ 
            url: '/refresh',
            method: 'POST', 
            body: { refreshToken },
          },
          api, extraOptions);
          
          if(refreshResult.data) { 
            // @ts-ignore
            api.dispatch(setAccess(refreshResult.data.accessToken));
            result = await baseQuery(args, api, extraOptions);
          } else { 
            api.dispatch(loggedOut());
            api.dispatch(apiSlice.util.resetApiState());
          }

        } else {
          api.dispatch(loggedOut());
          api.dispatch(apiSlice.util.resetApiState());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
}

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
  tagTypes: tags,
	endpoints: (builder) => ({}),
});