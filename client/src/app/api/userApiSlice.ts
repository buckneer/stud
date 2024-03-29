import { apiSlice } from "./apiSlice";
import { User } from './types/types';

interface AddUni {
	user: string;
	body: {
		universities: string[];
	}
}

interface DelUni {
	user: string;
	body: {
		university: string;
	}
}

interface GetPending {
	university: string;
	role: string;
}

const userApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		// TODO change this type if needed
		register: builder.mutation <{ id: string }, User>({
			query: (body) => ({
				url: '/register/',
				method: 'POST',
				body
			}),
			// @ts-ignore
			providesTags: (result, error) => (error) ? [] : ['User'],
		}),
		sendPasswordMail: builder.mutation <unknown, User> ({
			query: (body) => ({
				url: '/password/',
				method: 'POST',
				body
			})  
		}),
		setNewPassword: builder.mutation <unknown, User> ({
			query: (body) => ({
				url: '/password/',
				method: 'PATCH',
				body
			})
		}),
		getUser: builder.query <User, string> ({
			query: (id) => ({
				url: `/user/${id}/`
			}),
			providesTags: (result, error) => (error) ? [] : ['User']
		}),
		addUniToUser: builder.mutation <unknown, AddUni> ({
			query: ({ user, body }) => ({
				url: `/user/${user}/uni/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['User', 'Users'],
		}),
		removeUniFromUser: builder.mutation <unknown, DelUni> ({
			query: ({ user, body }) => ({
				url: `/user/${user}/uni/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['User', 'Users'] // remove this later
		}),
		getPending: builder.query <User[], GetPending>({
			query: ({ university, role}) => ({
				url: `/uni/${university}/user/${role}/pending/`
			}),
			providesTags: (result, error) => (error) ? [] : ['Users'],
		}),
		deleteUser: builder.mutation <unknown, string> ({
			query: (id) => ({
				url: `/user`,
				method: 'DELETE',
				body: {
					user: id
				}
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['User', 'Users'],
		}),
		getUserUnisRole: builder.query <unknown, { user: string, role: string }> ({
			query: ({ user, role }) => ({
				url: `/user/${user}/uni/role/${role}/`
			}),
			providesTags: (result, error) => (error) ? [] : ['UserUni'],
		}),
	})
});

export const {
	useRegisterMutation,
	useSendPasswordMailMutation,
	useSetNewPasswordMutation,
	useGetUserQuery,
	useAddUniToUserMutation,
	useRemoveUniFromUserMutation,
	useGetPendingQuery,
	useLazyGetPendingQuery,
	useDeleteUserMutation,
	useGetUserUnisRoleQuery
} = userApiSlice