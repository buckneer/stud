import { apiSlice } from './apiSlice';
import { Optional, AddSubjOpt } from './types/types';

const optionalApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addOptional: builder.mutation<any, Optional>({
			query: (body) => ({
				url: `/optional/`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, body) => (result)
				// @ts-ignore
				? [ ...body.subjects?.map((subject: string) => ({ type: 'Subject' as const, id: subject })),
					{ type: 'Department' as const, id: body.department },
					'Optional' ]
        : []
    }),
		addSubjectsToOptional: builder.mutation <any, AddSubjOpt> ({
			query: ({ university, optional, body }) => ({
				url: `/uni/${university}/optional/${optional}/subject`,
				method: 'PATCH',
				body
			}),
			invalidatesTags: (result, error, arg) => (result)
				? [{ type: 'Optional' as const, id: arg.optional },
						...arg.body.subjects.map((subject: any) => ({ type: 'Subject' as const, id: subject })) ]
				: [],
		}),
	})
});

export const {
	useAddOptionalMutation,
	useAddSubjectsToOptionalMutation,
} = optionalApiSlice;

