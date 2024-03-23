import { apiSlice } from "./apiSlice";
import { Student, Uni } from "./types/types";

interface UpdateUni {
	id: string;
	body: Uni;
}

const uniApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addUni: builder.mutation <unknown, Uni>({
			query: (body) => ({
				url: '/uni/',
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Uni', 'Unis'] 
		}),
		getAllUnis: builder.query <Uni[], void> ({
			query: () => ({
				url: '/uni/'
			}),
			providesTags: (result, error) => result ? 
			// this one should be tested and such...
			[...result.map(({ _id }) => ({ type: 'Unis' as const, _id })), 'Unis']
			: ['Unis'],
		}),
		uniAddStudents: builder.mutation <unknown, Student[]> ({
			query: (body) => ({
				url: '/uni/',
				method: 'PATCH',
				body
			})
		}),
		updateUni: builder.mutation <unknown, UpdateUni> ({
			query: ({ id, body }) => ({
				url: `/uni/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Uni', 'Unis'] 
		}),
	})
});

export const {
	useAddUniMutation,
	useGetAllUnisQuery,
	useUniAddStudentsMutation,
	useUpdateUniMutation
} = uniApiSlice;