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
		register: builder.mutation <{ id: string }, User> ({
			query: (body) => ({
				url: '/register/',
				method: 'POST',
				body
			}),
			// @ts-ignore
			invalidatesTags: (result, error) => (result) 
			? ['User'] // TODO: add university here...
			: [],
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
			providesTags: (result, error, id) => (result) 
				? [{ type: 'User' as const, id }]
				: []
		}),
		addUniToUser: builder.mutation <unknown, AddUni> ({
			query: ({ user, body }) => ({
				url: `/user/${user}/uni/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result && !error) 
				? [{ type: 'User' as const, id: arg.user }, 
					...arg.body.universities.map((uni: string) => ({ type: 'Uni', id: uni }))] 
				: [],
		}),
		removeUniFromUser: builder.mutation <unknown, DelUni> ({
			query: ({ user, body }) => ({
				url: `/user/${user}/uni/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result && !error) 
				? [{ type: 'User' as const, id: arg.user }] 
				: [] // remove this later
		}),
		getPending: builder.query <User[], GetPending>({
			query: ({ university, role}) => ({
				url: `/uni/${university}/user/${role}/pending/`
			}),
			providesTags: (result, error, arg) => (result) 
				? [...result.map((item: User) => ({ type: 'User' as const, id: item._id })), 
					{ type: 'Uni', id: arg.university }] 
				: [],
		}),
		deleteUser: builder.mutation <unknown, string> ({
			query: (id) => ({
				url: `/user`,
				method: 'DELETE',
				body: {
					user: id
				}
			}),
			invalidatesTags: (result, error, id) => (result) 
			? [{ type: 'User' as const, id }]
			: []
		}),
		getUserUnisRole: builder.query <any[], { user: string, role: string }> ({
			query: ({ user, role }) => ({
				url: `/user/${user}/uni/role/${role}/`
			}),
			providesTags: (result, error, arg) => (result) 
				? [ ...result.map((uni: string) => ({ type: 'Uni' as const, id: uni })),
					 { type: 'Role' as const, id: arg.role } ]  // <- maybe delete this one...
				: [],
		}),
		getUserUniRole: builder.query <any, string> ({
			query: (university) => ({
				url: `/uni/${university}/user`,
			}),
			providesTags: (result, error, id) => (result)
				? [{ type: 'University' as const, id },
					...result?.map((role: any) => ({ type: 'Role' as const, id: role }))]
				: [],
		}),
		getUserSubjects: builder.query<any, string> ({
			query: (university) => ({
				url: `/uni/${university}/student/current/subject`
			})
		})
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
	useGetUserUnisRoleQuery,
	useLazyGetUserUnisRoleQuery,
	useGetUserUniRoleQuery,
	useGetUserSubjectsQuery
} = userApiSlice