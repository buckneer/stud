import { apiSlice } from "./apiSlice";
import { Period } from "./types/types";

interface UpdatePeriod {
	id: string;
	body: Period;
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
	})
});

export const {
	useAddPeriodMutation,
	useGetPeriodQuery,
	useGetPeriodsQuery,
	useUpdatePeriodMutation,
} = periodApiSlice;