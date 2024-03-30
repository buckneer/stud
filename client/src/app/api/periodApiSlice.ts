import { apiSlice } from "./apiSlice";
import { Period } from "./types/types";

interface UpdatePeriod {
	id: string;
	body: Period;
}

interface PeriodExam {
	period: string;
	body: {
		exams: string[];
	}
}

interface DelPeriod {
	period: string;
	body: {
		exam: string;
	}
}

const periodApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addPeriod: builder.mutation <{ id: string }, Period> ({
			query: (body) => ({
				url: '/period/',
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => (result) 
				? ['Period'] 
				: [],
		}),
		getPeriod: builder.query <Period, string> ({
			query: (id) => ({
				url: `/period/${id}/`
			}),
			providesTags: (result, error, id) => (result) 
				? [{ type: 'Period' as const, id }] 
				: [],
		}),
		getPeriods: builder.query <Period[], void> ({
			query: () => ({
				url: '/period/'
			}),
			providesTags: (result, error) => (result) 
				? [...result.map((period: Period) => ({ type: 'Period' as const, id: period._id }))] 
				: [],
		}),
		updatePeriod: builder.mutation <unknown, UpdatePeriod> ({
			query: ({ id, body }) => ({
				url: `/period/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
			? [{ type: 'Period' as const, id: arg.id }] 
			: [],
		}),
		addPeriodExams: builder.mutation <unknown, PeriodExam> ({
			query: ({ period, body }) => ({
					url: `/period/${period}/exam/`,
					method: 'PATCH',
					body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Period' as const, id: arg.period }, 
					...arg.body.exams.map((exam: string) => ({ type: 'Exam' as const, id: exam}))] 
				: [],
		}),
		deletePeriodExam: builder.mutation <unknown, DelPeriod> ({
			query: ({ period, body }) => ({
				url: `/period/${period}/exam/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
			? [{ type: 'Period' as const, id: arg.period }, { type: 'Exam' as const, id: arg.body.exam }] 
			: [],
		})
	})
});

export const {
	useAddPeriodMutation,
	useGetPeriodQuery,
	useGetPeriodsQuery,
	useUpdatePeriodMutation,
	useAddPeriodExamsMutation,
	useDeletePeriodExamMutation,
} = periodApiSlice;