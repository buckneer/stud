import { apiSlice } from "./apiSlice";
import { Exam } from "./types/types";

interface UpdateExam {
	id: string;
	body: Exam;
}

interface ExamStudents {
	exam: string;
	body: {
		students: string[];
	}
}

interface ExamGrades {
	exam: string;
	body: {
		grades: string[];
	}
}

interface DelExamGrade {
	exam: string;
	body: {
		grade: string;
	}
}

interface DelExamStudent {
	exam: string;
	body: {
		student: string;
	}
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
		}),
		addExamStudents: builder.mutation <unknown, ExamStudents> ({
			query: ({ exam, body }) => ({
				url: `/exam/${exam}/student/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Exam', 'Exams', 'Student']
		}),
		deleteExamStudent: builder.mutation <unknown, DelExamStudent> ({
			query: ({ exam, body }) => ({
				url: `/exam/${exam}/student/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Exam', 'Exams', 'Student'],
		}),
		addExamGrades: builder.mutation <unknown, ExamGrades> ({
			query: ({ exam, body }) => ({
				url: `/exam/${exam}/grade/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Exam', 'Exams', 'Grade', 'Grades']
		}),
		deleteExamGrades: builder.mutation <unknown, DelExamGrade> ({
			query: ({ exam, body }) => ({
				url: `/exam/${exam}/grade/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Exam', 'Grade', 'Grades'],
		}),
	})
});

export const {
	useAddExamMutation,
	useGetExamQuery,
	useGetExamsQuery,
	useUpdateExamMutation,
	useAddExamStudentsMutation,
	useDeleteExamStudentMutation,
	useAddExamGradesMutation,
	useDeleteExamGradesMutation,
} = examApiSlice;