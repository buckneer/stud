import { apiSlice } from "./apiSlice";
import { Student } from "./types/types";

interface UniUser {
	university: string,
	user: string
}

const studentApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addStudent: builder.mutation <void, UniUser>({
			query: ({ university, user }) => ({
				url: `/student/${university}/${user}`,
				method: 'POST'
			}),
			invalidatesTags: (result, error) => error ? [] : ['UniStudents']
		}),
		getStudent: builder.query <Student, string> ({
			query: (id) => ({
				url: `/student/${id}`,
			}),
			providesTags: (result, error) => error ? [] : ['Student']
		}),
		deleteStudent: builder.mutation <unknown, string> ({
			query: (id) => ({
				url: `/sutdent/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error) => error ? [] : ['Student', 'UniStudents']
		}),
		getUniStudents: builder.query <Student[], string> ({
			query: (uni) => ({
				url: `/uni/${uni}/student`
			}),
			providesTags: (result, error) => error ? [] : ['UniStudents']
		}),
	})
});

export const {
	useAddStudentMutation,
	useGetStudentQuery,
	useDeleteStudentMutation,
	useGetUniStudentsQuery
} = studentApiSlice;