import { apiSlice } from './apiSlice';
import { setAccess, setRefresh, loggedOut, setUser, setMetadata } from '../slices/sessionSlice';
import { Session, User } from './types/types';


const sessionApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation <Session, User>({
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
						dispatch(setUser(data.user));
						dispatch(setMetadata({ role: data.user.roles![0] }));
					}, 1000);

					// @ts-ignore
					let result = await dispatch(apiSlice.endpoints.getUserUnisRole.initiate({ user: data.user._id, role: data.user.roles![0] }));
					console.log('hello', result);
				} catch (e: any) {
					dispatch(loggedOut());
					dispatch(apiSlice.util.resetApiState());
				}
			},
		}),
		logout: builder.mutation <any, { refreshToken: string; }> ({
			query: (body) => ({
				url: '/logout',
				method: 'POST',
				body
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch(err) {
          console.log('error', err);
        } finally {
          dispatch(loggedOut());
          dispatch(apiSlice.util.resetApiState());
        }
      },
		}),
	})
});

export const {
	useLoginMutation,
	useLogoutMutation
} = sessionApiSlice;