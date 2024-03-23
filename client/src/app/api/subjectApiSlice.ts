import { apiSlice } from "./apiSlice";
import { Subject } from "./types/types";

interface UpdateSubject {
	id: string;
	body: Subject;
}

const subjectApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addSubject: builder.mutation <unknown, Subject> ({
			query: (body) => ({
				url: `/subject/`,
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
		updateSubject: builder.mutation <unknown, UpdateSubject> ({
			query: ({ id, body }) => ({
				url: `/subject/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Subject', 'Subjects'],
		}),

	})
});

export const {
	useAddSubjectMutation,
	useGetSubjectQuery,
	useGetDepSubjectsQuery,
	useUpdateSubjectMutation
} = subjectApiSlice;