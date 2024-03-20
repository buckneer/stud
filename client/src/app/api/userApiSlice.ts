import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body
            })
        }),
        setPassword: builder.mutation({
            query: (body) => ({
                url: '/password',
                method: 'PATCH',
                body
            })
        })
    })
});

export const {
    useRegisterMutation
} = userApiSlice