import { apiSlice } from "./apiSlice";
import { Department, UniDep, UpdateDep, AddUniDep, DelDep, AddStDep, DelStDep, AddProfDep, DelProfDep, AddSubDep, DelSubDep } from "./types/types";

const departmentApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addDepartment: builder.mutation <unknown, UniDep> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/department/`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Department', 'Departments'],
		}),
		getDepartment: builder.query <Department, string> ({
			query: (department) => ({
				url: `/department/${department}/`
			}),
			providesTags: (result, error) => error ? [] : ['Department'],
		}),
		getUniDepartments: builder.query <Department[], string> ({
			query: (university) => ({
				url: `/uni/${university}/department/`
			}),
			providesTags: (result, error) => error ? [] : ['Department', 'Departments'],
		}),
		updateDeparment: builder.mutation <unknown, UpdateDep> ({
			query: ({ id, body }) => ({
				url: `/department/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Department', 'Departments'],
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
		addDepStudents: builder.mutation <unknown, AddStDep> ({
			query: ({ department, body }) => ({
				url: `/department/${department}/student/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['University', 'Department', 'Departments']
		}),
		deleteDepStudent: builder.mutation <unknown, DelStDep> ({
			query: ({ department, body }) => ({
				url: `/department/${department}/student/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['University', 'Department', 'Departments']
		}),
		addDepProfessors: builder.mutation <unknown, AddProfDep> ({
			query: ({ department, body }) => ({
				url: `/department/${department}/professor/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Department', 'Departments', 'Professor', 'Professors'],
		}),
		deleteDepProfessor: builder.mutation <unknown, DelProfDep> ({
			query: ({ department, body }) => ({
				url: `/department/${department}/professor/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Department', 'Departments', 'Professor', 'Professors'],
		}),
		addDepSubjects: builder.mutation <unknown, AddSubDep> ({
			query: ({ department, body }) => ({
				url: `/department/${department}/subject/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Department', 'Departments', 'Subject', 'Subjects'],
		}),
		deleteDepSubjects: builder.mutation <unknown, DelSubDep> ({
			query: ({ department, body }) => ({
				url: `/department/${department}/subject/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Department', 'Departments', 'Subject', 'Subjects'],
		})
	})
});

export const {
	useAddDepartmentMutation,
	useGetDepartmentQuery,
	useGetUniDepartmentsQuery,
	useUpdateDeparmentMutation,
	useAddUniDepartmentMutation,
	useDeleteUniDepartmentMutation,
	useAddDepStudentsMutation,
	useDeleteDepStudentMutation,
	useAddDepProfessorsMutation,
	useDeleteDepProfessorMutation,
	useAddDepSubjectsMutation,
	useDeleteDepSubjectsMutation
} = departmentApiSlice;