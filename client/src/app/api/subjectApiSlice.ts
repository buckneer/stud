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
			invalidatesTags: (result, error, body) => (result) 
				? ['Subject'] 
				: [],
		}),
		getSubject: builder.query <Subject, string> ({
			query: (id) => ({
				url: `/subject/${id}`
			}),
			providesTags: (result, error, id) => (result) 
				? [{ type: 'Subject' as const, id },
					{ type: 'Department' as const, id: result.department }] 
				: [],
		}),
		getDepSubjects: builder.query <Subject[], string> ({
			query: (department) => ({
				url: `/department/${department}/subject/`
			}),
			providesTags: (result, error, id) => (result) 
				? [ ...result.map((subject: Subject) => ({ type: 'Subject' as const, id: subject._id })),
				 { type: 'Department' as const, id }] 
				: [],
		}),
		getUniSubjects: builder.query <Subject[], string> ({
			query: (uni) => ({
				url: `/uni/${uni}/subject/`
			}),
			providesTags: (result, error, uni) => (result) 
			? [...result.map((subject: Subject) => ({ type: 'Subject' as const, id: subject._id })),
				{ type: 'Uni' as const, id: uni }]
			: [],
		}),
		updateSubject: builder.mutation <unknown, UpdateSubject> ({
			query: ({ id, body }) => ({
				url: `/subject/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Subject' as const, id: arg.id }]
				: [],
		}),
		addSubjectProfessors: builder.mutation <unknown, AddSubProf> ({
			query: ({ subject, body }) => ({
				url: `/subject/${subject}/professor/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Subject' as const, id: arg.subject }, 
				...arg.body.professors.map((prof: string) => ({ type: 'Professor' as const, id: prof }))] 
				: [],
		}),
		deleteSubjectProfessor: builder.mutation <unknown, DelSubProf> ({
			query: ({ subject, body }) => ({
				url: `/subject/${subject}/professor/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Subject' as const, id: arg.subject }, 
				{ type: 'Professor' as const, id: arg.body.professor }] 
				: [],
		}),
		addRequiredSubjects: builder.mutation <unknown, AddReq> ({
			query: ({ subject, body }) => ({
				url: `/subject/${subject}/required`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Subject' as const, id: arg.subject }]
				: [],
		}),
		deleteRequiredSubject: builder.mutation <unknown, DelReq> ({
			query: ({ subject, body }) => ({
				url: `/subject/${subject}/required`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Subject' as const, id: arg.subject }] 
				: [],
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