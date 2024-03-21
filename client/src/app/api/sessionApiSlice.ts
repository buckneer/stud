import { apiSlice } from './apiSlice';
import { setAccess, setRefresh, loggedOut, setUser } from '../slices/sessionSlice';
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