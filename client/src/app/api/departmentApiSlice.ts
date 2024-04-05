import { apiSlice } from "./apiSlice";
import { Department, UniDep, UpdateDep, AddUniDep, DelDep, AddStDep, DelStDep, AddProfDep, DelProfDep, AddSubDep, DelSubDep, Student } from "./types/types";

const departmentApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addDepartment: builder.mutation <unknown, UniDep> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/department/`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => (result) 
				? ['Department'] 
				: [],
		}),
		getDepartment: builder.query <Department, { university: string, department: string }> ({
			query: ({ university, department }) => ({
				url: `/uni/${university}/department/${department}/`
			}),
			providesTags: (result, error) => (result) 
				? [{ type: 'Department' as const, id: result._id }] 
				: [],
		}),
		getUniDepartments: builder.query <Department[], string> ({
			query: (university) => ({
				url: `/uni/${university}/department/`
			}),
			providesTags: (result, error, id) => (result) 
			? [...result.map((dep: Department) => ({ type: 'Department' as const, id: dep._id })),
				{ type: 'Uni', id }] 
				: [],
		}),
		updateDeparment: builder.mutation <unknown, UpdateDep> ({
			query: ({ university, id, body }) => ({
				url: `/uni/${university}/department/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => result 
				? [{ type: 'Department' as const, id: arg.id}] 
				: [],
		}),
		addUniDepartment: builder.mutation <unknown, AddUniDep> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/department`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [...arg.body.departments.map((dep: string) => ({ type: 'Department' as const, id: dep })),
					{ type: 'Uni' as const, id: arg.university }] 
				: []
		}),
		deleteUniDepartment: builder.mutation <unknown, DelDep> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/department`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Department' as const, id: arg.body.department }, { type: 'Uni' as const, id: arg.university }] 
				: []
		}),
		addDepStudents: builder.mutation <unknown, AddStDep> ({
			query: ({ university, department, body }) => ({
				url: `/uni/${university}/department/${department}/student/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Department' as const, id: arg.department },
					...arg.body.students.map((student: string) => ({ type: 'Student' as const, id: student }))] 
				: []
		}),
		deleteDepStudent: builder.mutation <unknown, DelStDep> ({
			query: ({ university, department, body }) => ({
				url: `/uni/${university}/department/${department}/student/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Department' as const, id: arg.department }, { type: 'Student' as const, id: arg.body.student }] 
				: []
		}),
		addDepProfessors: builder.mutation <unknown, AddProfDep> ({
			query: ({ university, department, body }) => ({
				url: `/uni/${university}/department/${department}/professor/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Department' as const, id: arg.department },
					...arg.body.professors.map((prof: string) => ({ type: 'Professor' as const, id: prof }))] 
				: [],
		}),
		deleteDepProfessor: builder.mutation <unknown, DelProfDep> ({
			query: ({ university, department, body }) => ({
				url: `/uni/${university}/department/${department}/professor/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Departemnt' as const, id: arg.department }, { type: 'Professor' as const, id: arg.body.professor }] 
				: [],
		}),
		addDepSubjects: builder.mutation <unknown, AddSubDep> ({
			query: ({ university, department, body }) => ({
				url: `/uni/${university}/department/${department}/subject/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Department' as const, id: arg.department },
					...arg.body.subjects.map((subject: string) => ({ type: 'Subject' as const, id: subject }))] 
				: [],
		}),
		deleteDepSubjects: builder.mutation <unknown, DelSubDep> ({
			query: ({ university, department, body }) => ({
				url: `/uni/${university}/department/${department}/subject/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Department' as const, id: arg.department }, { type: 'Subject' as const, id: arg.body.subject }] 
				: [],
		}),
		getStudentsByDepartment: builder.query <Student[], string> ({
			query: (id) => ({
				url: `/department/${id}/student/`,
			}),
			providesTags: (result, error, id) => (result)
				? [{ type: 'Department' as const, id }, 
					...result.map((student: Student) => ({ type: 'Student' as const, id: student._id }))]
				: [],
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
	useDeleteDepSubjectsMutation,
	useGetStudentsByDepartmentQuery
} = departmentApiSlice;