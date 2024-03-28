import { apiSlice } from "./apiSlice";
import { Subject } from "./types/types";

interface UpdateSubject {
	id: string;
	body: Subject;
}

interface AddSubProf {
	subject: string;
	body: {
		professors: string[];
	}
}

interface DelSubProf {
	subject: string;
	body: {
		professor: string;
	}
}

interface AddReq {
	subject: string;
	body: {
		requiredSub: string[];
	}
}

interface DelReq {
	subject: string;
	body: {
		requiredSub: string;
	}
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
				url: `/department/${department}/subject/`
			}),
			providesTags: (result, error) => error ? [] : ['Subjects'],
		}),
		getUniSubjects: builder.query <Subject[], string> ({
			query: (uni) => ({
				url: `/uni/${uni}/subject/`
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
		addSubjectProfessors: builder.mutation <unknown, AddSubProf> ({
			query: ({ subject, body }) => ({
				url: `/subject/${subject}/professor/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Subject', 'Subjects', 'Professor', 'Professors'],
		}),
		deleteSubjectProfessor: builder.mutation <unknown, DelSubProf> ({
			query: ({ subject, body }) => ({
				url: `/subject/${subject}/professor/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Subject', 'Subjects', 'Professor', 'Professors'],
		}),
		addRequiredSubjects: builder.mutation <unknown, AddReq> ({
			query: ({ subject, body }) => ({
				url: `/subject/${subject}/required`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Subject', 'Subjects'],
		}),
		deleteRequiredSubject: builder.mutation <unknown, DelReq> ({
			query: ({ subject, body }) => ({
				url: `/subject/${subject}/required`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Subject', 'Subjects'],
		}),
	})
});

export const {
	useAddSubjectMutation,
	useGetSubjectQuery,
	useGetDepSubjectsQuery,
	useGetUniSubjectsQuery,
	useUpdateSubjectMutation,
	useAddSubjectProfessorsMutation,
	useDeleteSubjectProfessorMutation,
	useAddRequiredSubjectsMutation,
	useDeleteRequiredSubjectMutation,
} = subjectApiSlice;