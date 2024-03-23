import { apiSlice } from "./apiSlice";
import { Subject } from "./types/types";

interface SubjectDep {
	department: string;
	body: Subject
}

const subjectApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addSubject: builder.mutation <void, SubjectDep> ({
			query: ({ department, body }) => ({
				url: `/department/${department}/subject/`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Subject', 'Subjects'],
		}),
		getSubject: builder.query <Subject, string> ({
			query: (id) => ({
				url: `/subject/${id}`
			}),
			providesTags: (result, error) => error ? [] : ['Subject'],
		}),
		getDepSubjects: builder.query <Subject[], string> ({
			query: (department) => ({
				url: `/department/${department}/subject`
			}),
			providesTags: (result, error) => error ? [] : ['Subjects'],
		}),
	})
});

export const {
	useAddSubjectMutation,
	useGetSubjectQuery,
	useGetDepSubjectsQuery
} = subjectApiSlice;