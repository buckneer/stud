import { apiSlice } from "./apiSlice";
import { Student, Uni, UpdateUni, AddUniDep, AddUniSer, DelDep, DelUniSer } from "./types/types";


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
		getUni: builder.query <Uni, string> ({
			query: (id) => ({
				url: `/uni/${id}/`
			}),
			providesTags: (result, error) => error ? [] : ['Uni'],
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
		addUniDepartment: builder.mutation <unknown, AddUniDep> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/department`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['University', 'Department', 'Departments']
		}),
		deleteUniDepartment: builder.mutation <unknown, DelDep> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/department`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['University', 'Department', 'Departments']
		}),
		addUniService: builder.mutation <unknown, AddUniSer> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/service/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Uni', 'Service', 'Services'],
		}),
		deleteUniService: builder.mutation <unknown, DelUniSer> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/service`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Uni', 'Service', 'Services'],
		})
	})
});

export const {
	useAddUniMutation,
	useGetUniQuery,
	useGetAllUnisQuery,
	useUniAddStudentsMutation,
	useUpdateUniMutation,
	useAddUniDepartmentMutation,
	useDeleteUniDepartmentMutation,
	useAddUniServiceMutation,
	useDeleteUniServiceMutation,
} = uniApiSlice;