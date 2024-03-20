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
        sendPasswordMail: builder.mutation({
            query: (body) => ({
                url: '/password',
                method: 'POST',
                body
            })  
        }),
        setNewPassword: builder.mutation({
            query: (body) => ({
                url: '/password',
                method: 'PATCH',
                body
            })
        })
    })
});

export const {
    useRegisterMutation,
    useSetNewPasswordMutation
} = userApiSlice