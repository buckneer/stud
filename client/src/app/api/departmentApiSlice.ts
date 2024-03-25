import { apiSlice } from "./apiSlice";
import { Department } from "./types/types";

interface UniDep {
	university: string;
	body: Department
}

interface UpdateDep {
	id: string;
	body: Department;
}

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
		})
	})
});

export const {
	useAddDepartmentMutation,
	useGetDepartmentQuery,
	useGetUniDepartmentsQuery,
	useUpdateDeparmentMutation,
} = departmentApiSlice;