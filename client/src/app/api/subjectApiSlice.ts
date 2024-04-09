import { apiSlice } from "./apiSlice";
import { Subject } from "./types/types";

interface UpdateSubject {
	university: string;
	id: string;
	body: Subject;
}

interface AddSubProf {
	university: string;
	subject: string;
	body: {
		professors: string[];
	}
}

interface DelSubProf {
	university: string;
	subject: string;
	body: {
		professor: string;
	}
}

interface AddReq {
	university: string;
	subject: string;
	body: {
		requiredSub: string[];
	}
}

interface DelReq {
	university: string;
	subject: string;
	body: {
		requiredSub: string;
	}
}

interface GetReq {
	university: string;
	semester: string;
	department: string;
}

const subjectApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addSubject: builder.mutation <unknown, { university: string, body: Subject }> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/subject/`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Subject' as const },
					{ type: 'University' as const, id: arg.university }]
				: [],
		}),
		getSubject: builder.query <Subject, { university: string; id: string }> ({
			query: ({ university, id }) => ({
				url: `/uni/${university}/subject/${id}`
			}),
			providesTags: (result, error, arg) => (result)
				? [{ type: 'Subject' as const, id: arg.id },
					{ type: 'Department' as const, id: result.department },
					{ type: 'University' as const, id: arg.university }]
				: [],
		}),
		getDepSubjects: builder.query <Subject[], { university: string; department: string }> ({
			query: ({ university, department }) => ({
				url: `/uni/${university}/subject/department/${department}`
			}),
			providesTags: (result, error, arg) => (result)
				? [ ...result.map((subject: Subject) => ({ type: 'Subject' as const, id: subject._id })),
				{ type: 'Department' as const, id: arg.department },
				{ type: 'University' as const, id: arg.university }]
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
		// TODO Check this !!
		getSubjectsForExam: builder.query <Subject[], {uni: string, period: string}> ({
			query: ({uni, period}) => ({
				url: `/uni/${uni}/subject/period/${period}`
			}),
			providesTags: (result, error, {uni}) => (result)
				? [...result.map((subject: Subject) => ({ type: 'Subject' as const, id: subject._id })),
					{ type: 'Uni' as const, id: uni }]
				: [],
		}),
		updateSubject: builder.mutation <unknown, UpdateSubject> ({
			query: ({ university, id, body }) => ({
				url: `/uni/${university}/subject/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Subject' as const, id: arg.id }]
				: [],
		}),
		addSubjectProfessors: builder.mutation <unknown, AddSubProf> ({
			query: ({ university, subject, body }) => ({
				url: `/uni/${university}/subject/${subject}/professor/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Subject' as const, id: arg.subject },
				...arg.body.professors.map((prof: string) => ({ type: 'Professor' as const, id: prof }))]
				: [],
		}),
		deleteSubjectProfessor: builder.mutation <unknown, DelSubProf> ({
			query: ({ university, subject, body }) => ({
				url: `/uni/${university}/subject/${subject}/professor/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Subject' as const, id: arg.subject },
				{ type: 'Professor' as const, id: arg.body.professor }]
				: [],
		}),
		getRequiredSubjects: builder.query <Subject[], GetReq> ({
			query: ({ university, department, semester }) => ({
				url: `/uni/${university}/subject/department/${department}/required`,
				params: { semester }
			}),
			providesTags: (result, error, arg) => (result)
				? [{ type: 'University' as const, id: arg.university },
					{ type: 'Department' as const, id: arg.department },
					...result.map((subject: Subject) => ({ type: 'Subject' as const, id: subject._id }))]
				: [],
		}),
		addRequiredSubjects: builder.mutation <unknown, AddReq> ({
			query: ({ university, subject, body }) => ({
				url: `/uni/${university}/subject/${subject}/required`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Subject' as const, id: arg.subject }]
				: [],
		}),
		deleteRequiredSubject: builder.mutation <unknown, DelReq> ({
			query: ({ university, subject, body }) => ({
				url: `/uni/${university}/subject/${subject}/required`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Subject' as const, id: arg.subject }]
				: [],
		}),
		getAvailableSubjects: builder.query <Subject[], { university: string, department: string }> ({
			query: ({ university, department }) => ({
				url: `/uni/${university}/subject/department/${department}/`
			}),
			providesTags: (result, error, arg) => (result)
				? [{ type: 'University' as const, id: arg.university },
					{ type: 'Department' as const, id: arg.department },
					...result.map((subject: Subject ) => ({ type: 'Subject' as const, id: subject._id }))]
				: [],
		}),
		getAvailableOptionalSubjects: builder.query <Subject[], { university: string, department: string, sem: string | number, degree: string }> ({
			query: ({ university, department, sem, degree }) => ({
				url: `/uni/${university}/subject/department/${department}/optional/available`,
				params: { sem, degree }
			}),
			providesTags: (result, error, arg) => (result)
				? [ ...result.map((subj: Subject) => ({ type: 'Subject' as const, id: subj._id })),
					{ type: 'Department' as const, id: arg.department },
					{ type: 'University' as const, id: arg.university } ]
				: [],
		})
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
	useGetRequiredSubjectsQuery,
	useGetAvailableSubjectsQuery,
	useGetAvailableOptionalSubjectsQuery,
	useGetSubjectsForExamQuery
} = subjectApiSlice;
