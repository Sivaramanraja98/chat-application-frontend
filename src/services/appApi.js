import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://chat-app-backend-6l4d.onrender.com",
  }),

  endpoints: (builder) => ({
    //creating the user
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/users/signup",
        method: "POST",
        body: user,
      }),
    }),

    //login
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    //logout
    logoutUser: builder.mutation({
      query: (payload) => ({
        url: "/logout",
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = appApi;
export default appApi;
