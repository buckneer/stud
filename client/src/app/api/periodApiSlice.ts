import { apiSlice } from "./apiSlice";
import { Period } from "./types/types";

interface UpdatePeriod {
	id: string;
	university: string;
	body: Period;
}

interface PeriodExam {
	university: string;
	period: string;
	body: {
		exams: string[];
	}
}

interface DelPeriod {
	university: string;
	period: string;
	body: {
		exam: string;
	}
}

const periodApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addPeriod: builder.mutation <{ id: string }, { university: string; body: Period }> ({
			query: ({ university, body }) => ({
				url: `/uni/${university}/period/`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => (result) 
				? [{ type: 'Period' as const }] 
				: [],
		}),
		getPeriod: builder.query <Period, { university: string; id: string }> ({
			query: ({ university, id }) => ({
				url: `/period/${id}/`
			}),
			providesTags: (result, error, arg) => (result) 
				? [{ type: 'Period' as const, id: arg.id }] 
				: [],
		}),
		getUniPeriods: builder.query <Period[], { university: string }> ({
			query: (university) => ({
				url: `/uni/${university}/period`
			}),
			providesTags: (result, error) => (result) 
				? [...result.map((period: Period) => ({ type: 'Period' as const, id: period._id }))] 
				: [],
		}),
		updatePeriod: builder.mutation <unknown, UpdatePeriod> ({
			query: ({ university, id, body }) => ({
				url: `/uni/${university}/period/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result) 
			? [{ type: 'Period' as const, id: arg.id }] 
			: [],
		}),
		addPeriodExams: builder.mutation <unknown, PeriodExam> ({
			query: ({ university, period, body }) => ({
					url: `/uni/${university}/period/${period}/exam/`,
					method: 'PATCH',
					body
			}),
			invalidatesTags: (result, error, arg) => (result) 
				? [{ type: 'Period' as const, id: arg.period }, 
					...arg.body.exams.map((exam: string) => ({ type: 'Exam' as const, id: exam}))] 
				: [],
		}),
		deletePeriodExam: builder.mutation <unknown, DelPeriod> ({
			query: ({ university, period, body }) => ({
				url: `/uni/${university}/period/${period}/exam/`,
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
	useGetUniPeriodsQuery,
	useUpdatePeriodMutation,
	useAddPeriodExamsMutation,
	useDeletePeriodExamMutation,
} = periodApiSlice;