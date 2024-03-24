import { apiSlice } from "./apiSlice";
import { User } from './types/types';
const userApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		// TODO change this type if needed
		register: builder.mutation <{id: string}, User>({
			query: (body) => ({
				url: '/register/',
				method: 'POST',
				body
			})
	}	),
		sendPasswordMail: builder.mutation <unknown, User>({
			query: (body) => ({
				url: '/password/',
				method: 'POST',
				body
			})  
		}),
		setNewPassword: builder.mutation <unknown, User>({
			query: (body) => ({
				url: '/password/',
				method: 'PATCH',
				body
			})
		})
	})
});

export const {
	useRegisterMutation,
	useSendPasswordMailMutation,
	useSetNewPasswordMutation
} = userApiSlice