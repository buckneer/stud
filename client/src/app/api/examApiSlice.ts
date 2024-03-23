import { apiSlice } from "./apiSlice";
import { Exam } from "./types/types";

interface UpdateExam {
	id: string;
	body: Exam;
}

const examApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addExam: builder.mutation <unknown, Exam> ({
			query: (body) => ({
				url: '/exam/',
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Exam', 'Exams']
		}),
		getExam: builder.query <Exam, string> ({
			query: (id) => ({
				url: `/exam/${id}/`
			}),
			providesTags: (result, error) => error ? [] : ['Exam'],
		}),
		getExams: builder.query <Exam[], string> ({
			query: () => ({
				url: '/exam/',
			}),
			providesTags: (result, error) => error ? [] : ['Exams']
		}),
		updateExam: builder.mutation <unknown, UpdateExam> ({
			query: ({ id, body }) => ({
				url: `/exam/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Exam', 'Exams']
		})
	})
});

export const {
	useAddExamMutation,
	useGetExamQuery,
	useGetExamsQuery,
	useUpdateExamMutation
} = examApiSlice;