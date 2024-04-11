import { apiSlice } from "./apiSlice";
import { Exam } from "./types/types";

interface UpdateExam {
	id: string;
	university: string;
	body: Exam;
}

interface ExamStudents {
	university: string;
	exam: string;
	body: {
		students: string[];
	}
}

interface ExamGrades {
	university: string;
	exam: string;
	body: {
		grades: string[];
	}
}

interface DelExamGrade {
	university: string;
	exam: string;
	body: {
		grade: string;
	}
}

interface DelExamStudent {
	university: string;
	exam: string;
	body: {
		student: string;
	}
}

const examApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addExam: builder.mutation <unknown, { university: string, body: Exam }> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/exam/`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => (result)
				? ['Exam']
				: []
		}),
		getExam: builder.query <Exam, { university: string, id: string }> ({
			query: ({ university, id }) => ({
				url: `/uni/${university}/exam/${id}/`
			}),
			providesTags: (result, error, arg) => (result)
				? [{ type: 'Exam', id: arg.id }]
				: [],
		}),
		getExamBySubject: builder.query <Exam, { university: string, period: string, subject: string }> ({
			query: ({ university, period, subject }) => ({
				url: `/uni/${university}/exam/period/${period}/subject/${subject}`
			}),
			// TODO Change this!
			providesTags: (result, error, arg) => (result)
				? [{ type: 'Exam', id: result._id }, 'EXAM']
				: [],
		}),
		getExams: builder.query <Exam[], { university: string; period: string; }> ({
			query: ({ university, period }) => ({
				url: `/uni/${university}/period/${period}/exam`,
			}),
			providesTags: (result, error) => (result)
				? ['Exam', ...result.map((exam: Exam) => ({ type: 'Uni' as const, id: exam.university }))]
				: []
		}),
		updateExam: builder.mutation <unknown, UpdateExam> ({
			query: ({ university, id, body }) => ({
				url: `/uni/${university}/exam/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Exam' as const, id: arg.id }]
				: []
		}),
		addExamStudents: builder.mutation <unknown, ExamStudents> ({
			query: ({ university, exam, body }) => ({
				url: `/uni/${university}/exam/${exam}/student/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Exam' as const, id: arg.exam },
				...arg.body.students.map((student: string) => ({ type: 'Student' as const, id: student }))]
				: []
		}),
		deleteExamStudent: builder.mutation <unknown, DelExamStudent> ({
			query: ({ university, exam, body }) => ({
				url: `/uni/${university}/exam/${exam}/student/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Exam' as const, id: arg.exam }, { type: 'Student' as const, id: arg.body.student }]
				: [],
		}),
		addExamGrades: builder.mutation <unknown, ExamGrades> ({
			query: ({ university, exam, body }) => ({
				url: `/uni/${university}/exam/${exam}/grade/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Exam' as const, id: arg.exam },
					...arg.body.grades.map((grade: string) => ({ type: 'Grade' as const, id: grade }))]
				: []
		}),
		deleteExamGrades: builder.mutation <unknown, DelExamGrade> ({
			query: ({ university, exam, body }) => ({
				url: `/uni/${university}/exam/${exam}/grade/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Exam' as const, id: arg.exam }, { type: 'Grade', id: arg.body.grade }]
				: [],
		}),
		getAvailableExams: builder.query<any, any>({
			query: ({ id, university }) => ({
				url: `/uni/${university}/exam/student/${id}/`,
			}),
			providesTags: (result, error, id) => (result)
				? [...result.map((exam: Exam) => ({ type: 'Exam' as const, id: exam._id })),
					{ type: 'Student' as const, id }]
				: [],
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
	useGetAvailableExamsQuery,
	useGetExamBySubjectQuery,
} = examApiSlice;
