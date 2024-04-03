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
			invalidatesTags: (result, error) => (result)
				? ['Exam']
				: []
		}),
		getExam: builder.query <Exam, string> ({
			query: (id) => ({
				url: `/exam/${id}/`
			}),
			providesTags: (result, error, id) => (result)
				? [{ type: 'Exam', id }]
				: [],
		}),
		getExams: builder.query <Exam[], string> ({
			query: () => ({
				url: '/exam/',
			}),
			providesTags: (result, error) => (result)
				? ['Exam', ...result.map((exam: Exam) => ({ type: 'Uni' as const, id: exam.university }))]
				: []
		}),
		updateExam: builder.mutation <unknown, UpdateExam> ({
			query: ({ id, body }) => ({
				url: `/exam/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Exam' as const, id: arg.id }]
				: []
		}),
		addExamStudents: builder.mutation <unknown, ExamStudents> ({
			query: ({ exam, body }) => ({
				url: `/exam/${exam}/student/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Exam' as const, id: arg.exam },
				...arg.body.students.map((student: string) => ({ type: 'Student' as const, id: student }))]
				: []
		}),
		deleteExamStudent: builder.mutation <unknown, DelExamStudent> ({
			query: ({ exam, body }) => ({
				url: `/exam/${exam}/student/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Exam' as const, id: arg.exam }, { type: 'Student' as const, id: arg.body.student }]
				: [],
		}),
		addExamGrades: builder.mutation <unknown, ExamGrades> ({
			query: ({ exam, body }) => ({
				url: `/exam/${exam}/grade/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Exam' as const, id: arg.exam },
					...arg.body.grades.map((grade: string) => ({ type: 'Grade' as const, id: grade }))]
				: []
		}),
		deleteExamGrades: builder.mutation <unknown, DelExamGrade> ({
			query: ({ exam, body }) => ({
				url: `/exam/${exam}/grade/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Exam' as const, id: arg.exam }, { type: 'Grade', id: arg.body.grade }]
				: [],
		}),
		getAvailableExams: builder.query<any, any>({
			query: (id) => ({
				url: `/exam/student/${id}`,
			}),
			providesTags: (result, error, id) => (result)
				? [...result.map((exam: Exam) => ({ type: 'Exam' as const, id: exam._id })),
					{ type: 'Student', id: result.id }]
				: [],
		})
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
