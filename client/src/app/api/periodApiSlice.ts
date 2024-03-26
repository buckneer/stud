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
		addPeriod: builder.mutation <unknown, Period> ({
			query: (body) => ({
				url: '/period/',
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Period', 'Periods'],
		}),
		getPeriod: builder.query <Period, string> ({
			query: (id) => ({
				url: `/period/${id}/`
			}),
			providesTags: (result, error) => error ? [] : ['Period'],
		}),
		getPeriods: builder.query <Period[], void> ({
			query: () => ({
				url: '/period/'
			}),
			providesTags: (result, error) => error ? [] : ['Periods'],
		}),
		updatePeriod: builder.mutation <unknown, UpdatePeriod> ({
			query: ({ id, body }) => ({
				url: `/period/${id}/`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Period', 'Periods'],
		}),
		addPeriodExams: builder.mutation <unknown, PeriodExam> ({
			query: ({ period, body }) => ({
					url: `/period/${period}/exam/`,
					method: 'PATCH',
					body
			}),
			invalidatesTags: (result, error) => error ? [] : ['Period', 'Periods', 'Exam', 'Exams'],
		}),
		deletePeriodExam: builder.mutation <unknown, DelPeriod> ({
			query: ({ period, body }) => ({
				url: `/period/${period}/exam/`,
				method: 'DELETE',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] :  ['Period', 'Periods', 'Exam', 'Exams'],
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