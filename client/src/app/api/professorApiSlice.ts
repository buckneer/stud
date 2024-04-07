import { apiSlice } from "./apiSlice";
import { Professor, ProfBody, AddProfUni, DelProfUni, AddProfSub, DelProfSub, AddProfGrade, DelProfGrade, AddUniProf, DelUniProf, GiveSign, Subject } from "./types/types";

// TODO: add delete professor later...

const professorApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addProfessor: builder.mutation <unknown, { university: string; body: Professor }>({
			query: ({ university, body}) => ({
				url: `/uni/${university}/professor/`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, body) => (result)
				// @ts-ignore
				? ['Professor'/*, ...body.universities.map((uni: string) => ({ type: 'Uni' as const, id: uni }))*/]
				: [],
		}),
		getProfessor: builder.query <Professor, { university: string; professor: string }> ({
			query: ({ university, professor }) => ({
				url: `/uni/${university}/professor/${professor}/`
			}),
			providesTags: (result, error, arg) => (result)
				? [{ type: 'Professor' as const, id: arg.professor }]
				: [],
		}),
		getProfessors: builder.query <Professor[], string | undefined> ({
			query: (university) => ({
				url: `/uni/${university}/professor/`
			}),
			providesTags: (result, error, id) => (result)
				? [...result.map((prof: Professor) => ({ type: 'Professor' as const, id: prof._id })),
					{ type: 'Uni' as const, id }]
				: [],
		}),
		updateProfessor: builder.mutation <Professor, ProfBody> ({
			query: ({ university, professor, body }) => ({
				url: `/uni/${university}/professor/${professor}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Professor' as const, id: arg.professor }]
				: [],
		}),
		addProfessorToUni: builder.mutation <unknown, AddProfUni> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/professor/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [...arg.body.professors.map((prof: string) => ({ type: 'Professor' as const, id: prof })),
					{ type: 'Uni' as const, id: arg.university }]
				: [],
		}),
		deleteProfessorFromUni: builder.mutation <unknown, DelProfUni> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/professor/uni/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Professor' as const, id: arg.body.professor }, { type: 'Uni' as const, id: arg.university}]
				: [],
		}),
		addProfessorToSubject: builder.mutation <unknown, AddProfSub> ({
			query: ({ university, professor, body }) => ({
				url: `/uni/${university}/professor/${professor}/subject`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Professor' as const, id: arg.professor },
					...arg.body.subjects.map((subject:  string) => ({ type: 'Subject' as const, id: subject }))]
					: [],
		}),
		deleteProfessorFromSubject: builder.mutation <unknown, DelProfSub> ({
			query: ({ university, professor, body }) => ({
				url: `/uni/${university}/professor/${professor}/subject`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Professor' as const, id: arg.professor }, { type: 'Subject' as const, id: arg.body.subject }]
				: [],
		}),
		addProfessorGrade: builder.mutation <unknown, AddProfGrade> ({
			query: ({ university, professor, body }) => ({
				url: `/uni/${university}/professor/${professor}/grade/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error,arg ) => (result)
				? [{ type: 'Professor' as const, id: arg.professor },
					...arg.body.grades.map((grade: string) => ({ type: 'Grade' as const, id: grade}))]
				: [],
		}),
		deleteProfessorGrade: builder.mutation <unknown, DelProfGrade> ({
			query: ({ university, professor, body }) => ({
				url: `/uni/${university}/professor/${professor}/grade/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Professor', 'Grade', 'Grades'],
		}),
		addProfessorUnis: builder.mutation <unknown, AddUniProf> ({
			query: ({ university, professor }) => ({
				url: `/uni/${university}/professor/${professor}/uni/`,
				method: 'PATCH'
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Professor', id: arg.professor },
				{ type: 'Uni' as const, id: arg.university }]
				: [],
		}),
		deleteProfessorUni: builder.mutation <unknown, DelUniProf> ({
			query: ({ university, professor }) => ({
				url: `/uni/${university}/professor/${professor}/uni/`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Professor' as const, id: arg.professor },
					{ type: 'Uni' as const, id: arg.university }]
				: [],
		}),
		giveSign: builder.mutation <any, GiveSign> ({
			query: ({ university, subject, body }) => ({
				url: `/uni/${university}/subject/${subject}/sign`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Subject' as const, id: arg.subject },
					...arg.body.students.map((student: string) => ({ type: 'Student' as const, id: student }))]
				: [],
		}),
		getSubjectProfessors: builder.query <Subject[], string> ({
			query: (university) => ({
				url: `/uni/${university}/subject/professor/active`
			}),
			providesTags: (result, error, arg) => (result)
				? [{ type: 'University' as const, id: arg },
					...result.map((sub: Subject) => ({ type: 'Subject' as const, id: sub._id }))]
				: [],
		}),
	})
});

export const {
	useAddProfessorMutation,
	useGetProfessorQuery,
	useGetProfessorsQuery,
	useUpdateProfessorMutation,
	useAddProfessorToUniMutation,
	useDeleteProfessorFromUniMutation,
	useAddProfessorToSubjectMutation,
	useDeleteProfessorFromSubjectMutation,
	useAddProfessorGradeMutation,
	useDeleteProfessorGradeMutation,
	useAddProfessorUnisMutation,
	useGiveSignMutation,
	useDeleteProfessorUniMutation,
	useGetSubjectProfessorsQuery,
} = professorApiSlice;
