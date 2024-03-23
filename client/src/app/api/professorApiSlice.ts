import { apiSlice } from "./apiSlice";
import { Professor } from "./types/types";

interface ProfUni {
	user: string,
	university: string,
	body: Professor
}

interface ProfBody {
	professor: string,
	body: Professor
}

const professorApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addProfessor: builder.mutation <unknown, ProfUni>({
			query: ({ university, user, body }) => ({
				url: `/professor/${university}/${user}/`,
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
		})
	})
});

export const {
	useAddProfessorMutation,
	useGetProfessorQuery,
	useGetProfessorsQuery,
	useUpdateProfessorMutation
} = professorApiSlice;