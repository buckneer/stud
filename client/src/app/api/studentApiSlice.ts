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
		})
	})
});

export const {
	useAddStudentMutation,
	useAddStudentToUniMutation,
	useGetStudentQuery,
	useDeleteStudentMutation,
	useGetUniStudentsQuery
} = studentApiSlice;