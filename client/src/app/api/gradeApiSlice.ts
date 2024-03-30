import { apiSlice } from "./apiSlice";
import { Grade } from "./types/types";

interface UpdateGrade {
	id: string;
	body: Grade;
}

const gradeApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addGrade: builder.mutation <unknown, Grade> ({
			query: (body) => ({
				url: '/grades/',
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => (result) 
				? ['Grade'] 
				: []
		}),
		getGrade: builder.query <Grade, string> ({
			query: (id) => ({
				url: `/grades/${id}/`
			}),
			providesTags: (result, error, id) => (result) 
				? [{ type: 'Grade' as const, id }] 
				: []
		}),
		getGrades: builder.query <Grade[], void> ({
			query: () => ({
				url: '/grades/'
			}),
			providesTags: (result, error) => (result) 
				? ['Grades'] 
				: []
		}),
		updateGrade: builder.mutation <unknown, UpdateGrade> ({
			query: ({ id, body }) => ({
				url: `/grades/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Grade' as const, id: arg.id }]
				: [],
		}),
		getGradesByRole: builder.query <Grade[], { role: string; id: string }> ({
			query: ({ role, id }) => ({
				url: `/${role}/${id}/grade/`
			}),
			providesTags: (result, error, arg) => (result) 
				? [...result.map((grade: Grade) => ({ type: 'Grade' as const, id: grade._id })),
					{ type: 'Role' as const, id: arg.role }] // remove this perhaps
				: [],
		}),
	})
});

export const {
	useAddGradeMutation,
	useGetGradeQuery,
	useGetGradesQuery,
	useUpdateGradeMutation,
	useGetGradesByRoleQuery,
} = gradeApiSlice;