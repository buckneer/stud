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
				method: 'POST'
			}),
			invalidatesTags: (result, error) => error ? [] : ['Grade', 'Grades']
		}),
		getGrade: builder.query <Grade, string> ({
			query: (id) => ({
				url: `/grades/${id}/`
			}),
			providesTags: (result, error) => error ? [] : ['Grade']
		}),
		getGrades: builder.query <Grade[], void> ({
			query: () => ({
				url: '/grades/'
			}),
			providesTags: (result, error) => error ? [] : ['Grades']
		}),
		updateGrade: builder.mutation <unknown, UpdateGrade> ({
			query: ({ id, body }) => ({
				url: `/grades/${id}/`,
				method: 'PATCH',
				body
			})
		})
	})
});

export const {
	useAddGradeMutation,
	useGetGradeQuery,
	useGetGradesQuery,
	useUpdateGradeMutation
} = gradeApiSlice;