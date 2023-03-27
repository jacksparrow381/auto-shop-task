import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const categoryApiSlice = createApi({
  reducerPath: "categoryApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/category",
    credentials: "include",
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/",
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: (body) => ({
        url: `/update/${body.id}`,
        method: "PUT",
        body: body.values,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});
export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApiSlice;
