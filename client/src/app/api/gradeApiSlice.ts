import { apiSlice } from "./apiSlice";
import { Grade } from "./types/types";

const gradeApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addGrade: builder.mutation <void, Grade> ({
			query: () => ({
				url: '/grades/',
				method: 'POST'
			}),
			invalidatesTags: (result, error) => error ? [] : ['Grade', 'Grades']
		}),
		getGrade: builder.query <Grade, string> ({
			query: (id) => ({
				url: `/grades/${id}`
			}),
			providesTags: (result, error) => error ? [] : ['Grade']
		}),
		getGrades: builder.query <Grade[], void> ({
			query: () => ({
				url: '/grades'
			}),
			providesTags: (result, error) => error ? [] : ['Grades']
		})
	})
});

export const {
	useAddGradeMutation,
	useGetGradeQuery,
	useGetGradesQuery
} = gradeApiSlice;