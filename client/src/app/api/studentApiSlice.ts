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
	student: string;
	body: {
		exams: string[];
	}
}

interface DelStExam {
	student: string;
	body: {
		exam: string;
	}
}

const studentApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addStudent: builder.mutation <unknown, any>({
			query: (body) => ({
				url: `/student/`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['UniStudents']
		}),
		addStudentToUni: builder.mutation <unknown, AddUni> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/student/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['UniStudents']
		}),
		deleteStudentUni: builder.mutation <unknown, DelUni> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/student/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['UniStudents']
		}),
		getStudent: builder.query <Student, string> ({
			query: (id) => ({
				url: `/student/${id}/`,
			}),
			providesTags: (result, error) => error ? [] : ['Student']
		}),
		deleteStudent: builder.mutation <unknown, string> ({
			query: (id) => ({
				url: `/sutdent/${id}/`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error) => error ? [] : ['Student', 'UniStudents']
		}),
		getUniStudents: builder.query <Student[], string> ({
			query: (uni) => ({
				url: `/uni/${uni}/student/`
			}),
			providesTags: (result, error) => error ? [] : ['UniStudents']
		}),
		updateStudent: builder.mutation <unknown, UpdateStudent> ({
			query: ({ id, body }) => ({
				url: `/student/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Student', 'Students', 'UniStudents']
		}),
		addStudentExams: builder.mutation <unknown, unknown> ({
			query: ({ student, body }) => ({
				url: `/student/${student}/exam/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Exam', 'Exams', 'Student', 'Students'],
		}),
		removeStudentExam: builder.mutation <unknown, unknown> ({
			query: ({ student, body }) => ({
				url: `/student/${student}/exam/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Exam', 'Exams', 'Student', 'Students'],
		})
		// addCompleted: builder.mutation <unknown, unknown> ({
		// 	query: ({  }) => ({

		// 	})
		// })
	})
});

export const {
	useAddStudentMutation,
	useAddStudentToUniMutation,
	useDeleteStudentUniMutation,
	useGetStudentQuery,
	useDeleteStudentMutation,
	useGetUniStudentsQuery
} = studentApiSlice;