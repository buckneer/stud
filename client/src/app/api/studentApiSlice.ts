import { apiSlice } from "./apiSlice";
import { Student, UniUser, UpdateStudent, AddUni, DelUni, AddStExam, DelStExam, AddStSub, Subject } from "./types/types";

const studentApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addStudent: builder.mutation <{ id: string }, { university: string, body: Subject }> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/student/`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Student' as const }]
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
		getStudent: builder.query <Student, { university: string; id: string }> ({
			query: ({ university, id }) => ({
				url: `/uni/${university}/student/${id}/`,
			}),
			providesTags: (result, error, arg) => (result)
				? [{ type: 'Student' as const, id: arg.id }]
				: []
		}),
		getStudentByUser: builder.query <Student, string> ({
			query: (university) => ({
				url: `/uni/${university}/user/student`,
			}),
			providesTags: (result, err, id) => (result)
				? [{ type: 'University' as const, id },
					{ type: 'Student' as const, id: result._id}]
				: [],
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
			query: ({ university, id, body }) => ({
				url: `/uni/${university}/student/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Student' as const, id: arg.id}] // <- add uni here from result maybe...
				: []
		}),
		addStudentExams: builder.mutation <unknown, AddStExam> ({
			query: ({ university, student, body }) => ({
				url: `/uni/${university}/exam/student/${student}`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Student' as const, id: arg.student },
				...arg.body.exams.map((exam: string) => ({ type: 'Exam' as const, id: exam }))]
				: [],
		}),
		removeStudentExam: builder.mutation <unknown, DelStExam> ({
			query: ({ university, student, body }) => ({
				url: `/uni/${university}/student/${student}/exam/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Student' as const, id: arg.student }, { type: 'Exam' as const, id: arg.body.exam }]
				: [],
		}),
		addSubjectsToStudent: builder.mutation <any, AddStSub> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/student/subject/add`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [...arg.body.subjects.map((subj: string) => ({ type: 'Subject' as const, id: subj })),
					{ type: 'University' as const, id: arg.university }]
				: []
		}),
		getStudentOnSubject: builder.query <Student[], { university: string; subject: string }> ({
			query: ({ university, subject }) => ({
				url: `/uni/${university}/student/subject/${subject}`
			}),
			providesTags: (result, error, arg) => (result)
			? [{ type: 'University' as const, id: arg.university },
				{ type: 'Subject' as const, id: arg.subject },
				...result.map((stud: Student) => ({ type: 'Student' as const, id: stud._id }))]	
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
	useGetStudentByUserQuery,
	useGetUniStudentsQuery,
	useDeleteStudentUniMutation,
	useDeleteStudentMutation,
	useRemoveStudentExamMutation,
	useAddSubjectsToStudentMutation,
	useUpdateStudentMutation,
	useGetStudentOnSubjectQuery
} = studentApiSlice;
