import { apiSlice } from "./apiSlice";
import { Service } from './types/types';

const serviceApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		addService: builder.mutation <unknown, Service> ({
			query: (body) => ({
				url: '/service/',
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Service', 'Services', 'Uni'],
		}),
		deleteService: builder.mutation <unknown, string> ({
			query: (id) => ({
				url: `/service/${id}/`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error) => (error) ? [] : ['Service', 'Services', 'Uni'],
		}),
		getServices: builder.query <Service[], string> ({
			query: (university) => ({
				url: `/uni/${university}/service/`
			}),
			providesTags: (result, error) => (error) ? [] : ['Services'],
		})
	})
});

export const {
	useAddServiceMutation,
	useDeleteServiceMutation,
	useGetServicesQuery
} = serviceApiSlice;