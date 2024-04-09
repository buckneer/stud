import { apiSlice } from "./apiSlice";
import { Grade } from "./types/types";

interface UpdateGrade {
	university: string;
	id: string;
	body: Grade;
}

const gradeApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addGrade: builder.mutation <unknown, { university: string, body: Grade }> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/grade/`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => (result)
				? ['Grade', {type: "Exam", id: "EXAM_LIST"}]
				: []
		}),
		getGrade: builder.query <Grade, { university: string, id: string}> ({
			query: ({ university, id }) => ({
				url: `/uni/${university}/grade/${id}/`
			}),
			providesTags: (result, error, arg) => (result)
				? [{ type: 'Grade' as const, id: arg.id }]
				: []
		}),
		getGrades: builder.query <Grade[], string> ({
			query: (university) => ({
				url: `/uni/${university}/grade/`
			}),
			providesTags: (result, error) => (result)
				? ['Grade']
				: []
		}),
		updateGrade: builder.mutation <unknown, UpdateGrade> ({
			query: ({ university, id, body }) => ({
				url: `/uni/${university}/grade/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Grade' as const, id: arg.id }, 'EXAM']
				: [],
		}),
		getGradesByRole: builder.query <Grade[], { role: string; id: string }> ({
			query: ({ role, id }) => ({
				url: `/${role}/${id}/grade/`
			}),
			providesTags: (result, error, arg) => (result)
				? [...result.map((grade: Grade) => ({ type: 'Grade' as const, id: grade._id })),
					{ type: 'Role' as const, id: arg.role }] // remove this perhaps
				: [],
		}),
		getStats: builder.query <any, string> ({
			query: (university) => ({
				url: `/uni/${university}/grade/student/stats`
			}),
			providesTags: (result, error, id) => (result)
				? [{ type: 'University' as const, id },
					{ type: 'Grade' as const }
				]
				: []
		})
	})
});

export const {
	useAddGradeMutation,
	useGetGradeQuery,
	useGetGradesQuery,
	useUpdateGradeMutation,
	useGetGradesByRoleQuery,
	useGetStatsQuery
} = gradeApiSlice;
