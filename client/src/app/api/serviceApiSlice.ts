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
			invalidatesTags: (result, error, body) => (result) 
				? ['Service', /*{ type: 'Uni' as const, id: body.university },*/] 
				: [],
		}),
		deleteService: builder.mutation <unknown, string> ({
			query: (id) => ({
				url: `/service/${id}/`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, id) => (result) 
				? [{ type: 'Service' as const, id }, 'Uni'] 
				: [],
		}),
		getServices: builder.query <Service[], string> ({
			query: (university) => ({
				url: `/uni/${university}/service/`
			}),
			providesTags: (result, error, university) => (result) 
				? [ ...result.map((service: Service) => ({ type: 'Service' as const, id: service._id })),
				{ type: 'Uni' as const, id: university }] 
				: [],
		})
	})
});

export const {
	useAddServiceMutation,
	useDeleteServiceMutation,
	useGetServicesQuery
} = serviceApiSlice;