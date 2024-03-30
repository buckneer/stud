import { apiSlice } from "./apiSlice";
import { Student, Uni, UpdateUni, AddUniDep, AddUniSer, DelDep, DelUniSer } from "./types/types";


const uniApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addUni: builder.mutation <Uni, Uni>({
			query: (body) => ({
				url: '/uni/',
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => (result)
				? ['Uni']
				: []
		}),
		getUni: builder.query <Uni, string> ({
			query: (id) => ({
				url: `/uni/${id}/`
			}),
			providesTags: (result, error, id) => (result) 
				? [{ type: 'Uni' as const, id }] 
				: ['Uni'],
		}),
		getAllUnis: builder.query <Uni[], void> ({
			query: () => ({
				url: '/uni/'
			}),
			providesTags: (result, error) => (result) 
			? [...result.map(({ _id }) => ({ type: 'Uni' as const, _id })), 'Uni']
			: [],
		}),
		// uniAddStudents: builder.mutation <unknown, Student[]> ({
		// 	query: (body) => ({
		// 		url: '/uni/',
		// 		method: 'PATCH',
		// 		body
		// 	}),
		// 	invalidatesTags: (result, error, arg) => (result)
		// 		? [{ type: 'Student' as const }, { type: 'Uni' as const,  }]
		// 		: []
			
		// }),
		updateUni: builder.mutation <unknown, UpdateUni> ({
			query: ({ id, body }) => ({
				url: `/uni/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Uni' as const, id: arg.id }] 
				: [] 
		}),
		addUniDepartment: builder.mutation <unknown, AddUniDep> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/department`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Uni' as const, id: arg.university },
					...arg.body.departments.map((dep: string) => ({ type: 'Department' as const, id: dep }))]
				: []
		}),
		deleteUniDepartment: builder.mutation <unknown, DelDep> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/department`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Uni' as const, id: arg.university },
					{ type: 'Department' as const, id: arg.body.department }]
				: [],
		}),
		addUniService: builder.mutation <unknown, AddUniSer> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/service/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [...arg.body.services.map((service: string) => ({ type: 'Service' as const, id: service })),
				{ type: 'Uni', id: arg.university}]
				: [],
		}),
		deleteUniService: builder.mutation <unknown, DelUniSer> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/service`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Uni' as const, id: arg.university }, 
					{ type: 'Service' as const, id: arg.body.service },
					{ type: 'Role' as const, id: arg.body.service }] 
				: [],
		}),
		getRolesInUni: builder.query <any[], { role: string, university: string | undefined }> ({
			query: ({ university, role }) => ({
				url: `/uni/${university}/${role}`,
			}),
			providesTags: (result, error, arg) => (result) 
				? [{ type: 'Uni' as const, id: arg.university }, 
				...result.map((elem: any) => ({ type: `${arg.role[0].toUpperCase()}${arg.role.slice(1)}` as const, id: elem._id }))]
				: []
		}),
	})
});

export const {
	useAddUniMutation,
	useGetUniQuery,
	useGetAllUnisQuery,
	useUpdateUniMutation,
	useAddUniDepartmentMutation,
	useDeleteUniDepartmentMutation,
	useAddUniServiceMutation,
	useDeleteUniServiceMutation,
	useGetRolesInUniQuery
} = uniApiSlice;