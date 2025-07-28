import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://json-server-for-comment-box-3.onrender.com/api/",
  }),
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => `comments`,
    }),
    getUsers: builder.query({
      query: () => `users`,
    }),
    addNewUser: builder.mutation({
      query: (newuser) => ({
        url: "users",
        method: "POST",
        body: newuser,
      }),
      invalidatesTags: ["users"],
    }),
    addNewComment: builder.mutation({
      query: (newcomment) => ({
        url: "comments",
        method: "POST",
        body: newcomment,
      }),
      invalidatesTags: ["users"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetCommentsQuery,
  useAddNewUserMutation,
  useAddNewCommentMutation,
  useDeleteCommentMutation,
} = serverApi;
