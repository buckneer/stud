import { apiSlice } from "./apiSlice";
import { Professor } from "./types/types";

interface ProfBody {
	professor: string;
	body: Professor;
}

interface AddProfUni {
	university: string;
	body: {
		professors: string[];
	}
}

interface AddProfSub {
	professor: string;
	body: {
		subjects: string[];
	}
}

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
			invalidatesTags: (result, error) => error ? [] : ['Professors'],
		}),
		addProfessorToSubject: builder.mutation <unknown, AddProfSub> ({
			query: ({ professor, body }) => ({
				url: `/professor/${professor}/subject`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Professor', 'Subject'],
		})
	})
});

export const {
	useAddProfessorMutation,
	useGetProfessorQuery,
	useGetProfessorsQuery,
	useUpdateProfessorMutation,
	useAddProfessorToUniMutation,
	useAddProfessorToSubjectMutation,
} = professorApiSlice;