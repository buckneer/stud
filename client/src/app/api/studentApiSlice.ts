import { apiSlice } from "./apiSlice";
import { Student } from "./types/types";

interface UniUser {
	university: string,
	body: Student
}

interface UpdateStudent {
	id: string;
	body: Student;
}

interface AddUni {
	university: string;
	body: {
		students: string[];
	}
}

interface DelUni {
	university: string;
	body: {
		student: string;
	}
}

interface AddStExam {
	student: string | undefined;
	body: {
		exams: string[];
	}
}

interface DelStExam {
	uni: string;
	student: string;
	body: {
		exam: string;
	}
}

const studentApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addStudent: builder.mutation <{ id: string }, any>({
			query: (body) => ({
				url: `/student/`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? ['Student']
				: []
		}),
		addStudentToUni: builder.mutation <unknown, AddUni> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/student/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? ['Student', { type: 'Uni' as const, id: arg.university }]
				: []
		}),
		deleteStudentUni: builder.mutation <unknown, DelUni> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/student/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Student' as const, id: arg.body.student },
				{ type: 'Uni' as const, id: arg.university }] // maybe add 'Subject', 'Department'
				: []
		}),
		getStudent: builder.query <Student, string> ({
			query: (id) => ({
				url: `/student/${id}/`,
			}),
			providesTags: (result, error, id) => (result)
				? [{ type: 'Student' as const, id }]
				: []
		}),
		deleteStudent: builder.mutation <unknown, string> ({
			query: (id) => ({
				url: `/student/${id}/`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, id) => (result)
				? [{ type: 'Student' as const, id }]
				: []
		}),
		getUniStudents: builder.query <Student[], string> ({
			query: (uni) => ({
				url: `/uni/${uni}/student/`
			}),
			providesTags: (result, error, id) => (result)
				? [...result.map((student: Student) => ({ type: 'Student', id: student._id })),
				{ type: 'Uni' as const, id }]
				: []
		}),
		updateStudent: builder.mutation <unknown, UpdateStudent> ({
			query: ({ id, body }) => ({
				url: `/student/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Student' as const, id: arg.id}] // <- add uni here from result maybe...
				: []
		}),
		addStudentExams: builder.mutation <unknown, AddStExam> ({
			query: ({ student, body }) => ({
				url: `/exam/student/${student}`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Student' as const, id: arg.student },
				...arg.body.exams.map((exam: string) => ({ type: 'Exam' as const, id: exam }))]
				: [],
		}),
		removeStudentExam: builder.mutation <unknown, DelStExam> ({
			query: ({ student, body }) => ({
				url: `/student/${student}/exam/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Student' as const, id: arg.student }, { type: 'Exam' as const, id: arg.body.exam }]
				: [],
		}),
		// addCompleted: builder.mutation <unknown, unknown> ({
		// 	query: ({  }) => ({

		// 	})
		// })
	})
});

export const {
	useAddStudentMutation,
	useAddStudentToUniMutation,
	useAddStudentExamsMutation,
	useGetStudentQuery,
	useGetUniStudentsQuery,
	useDeleteStudentUniMutation,
	useDeleteStudentMutation,
	useRemoveStudentExamMutation,
	useUpdateStudentMutation
} = studentApiSlice;
