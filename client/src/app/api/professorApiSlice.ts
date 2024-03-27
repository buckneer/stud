import { apiSlice } from "./apiSlice";
import { Professor, ProfBody, AddProfUni, DelProfUni, AddProfSub, DelProfSub, AddProfGrade, DelProfGrade, AddUniProf, DelUniProf } from "./types/types";

// TODO: add delete professor later...

const professorApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addProfessor: builder.mutation <unknown, Professor>({
			query: (body) => ({
				url: `/professor/`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Professor', 'Professors'],
		}),
		getProfessor: builder.query <string, Professor> ({
			query: (professor) => ({
				url: `/professor/${professor}/`
			}),
			providesTags: (result, error) => error ? [] : ['Professor'],
		}),
		getProfessors: builder.query({
			query: (university) => ({
				url: `/uni/${university}/professor/`
			}),
			providesTags: (result, error) => error ? [] : ['Professors'],
		}),
		updateProfessor: builder.mutation <Professor, ProfBody> ({
			query: ({ professor, body }) => ({
				url: `/professor/${professor}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Professor', 'Professors'],
		}),
		addProfessorToUni: builder.mutation <unknown, AddProfUni> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/professor/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Professors', 'Professor'],
		}),
		deleteProfessorFromUni: builder.mutation <unknown, DelProfUni> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/professor`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Professors', 'Professor'],
		}),
		addProfessorToSubject: builder.mutation <unknown, AddProfSub> ({
			query: ({ professor, body }) => ({
				url: `/professor/${professor}/subject`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Professor', 'Subject'],
		}),
		deleteProfessorFromSubject: builder.mutation <unknown, DelProfSub> ({
			query: ({ professor, body }) => ({
				url: `/professor/${professor}/subject`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Professor', 'Subject'],
		}),
		addProfessorGrade: builder.mutation <unknown, AddProfGrade> ({
			query: ({ professor, body }) => ({
				url: `/professor/${professor}/grade/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Professor', 'Grade', 'Grades'],
		}),
		deleteProfessorGrade: builder.mutation <unknown, DelProfGrade> ({
			query: ({ professor, body }) => ({
				url: `/professor/${professor}/grade/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Professor', 'Grade', 'Grades'],
		}),
		addProfessorUnis: builder.mutation <unknown, AddUniProf> ({
			query: ({ professor, body }) => ({
				url: `/professor/${professor}/uni/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Professor', 'Professors'],
		}),
		deleteProfessorUni: builder.mutation <unknown, DelUniProf> ({
			query: ({ professor, body }) => ({
				url: `/professor/${professor}/uni/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Professor', 'Professors'],
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
	useDeleteProfessorUniMutation,

} = professorApiSlice;