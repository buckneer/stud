import { apiSlice } from './apiSlice';
import { setAccess, setRefresh, loggedOut } from '../slices/sessionSlice';

const sessionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                  const { data } = await queryFulfilled;
                  setTimeout(() => {
                    dispatch(setAccess(data.accessToken));
                    dispatch(setRefresh(data.refreshToken));
                  }, 1000);
                } catch (err) {
                  dispatch(loggedOut());
                }
            },
        }),
        logout: builder.mutation({
            query: (body) => ({
                url: '/logout',
                method: 'POST',
                body
            })
        }),
    })
});

export const {
    useLoginMutation,
    useLogoutMutation
} = sessionApiSlice;