import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const vehicleApiSlice = createApi({
  reducerPath: "vehicleApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/vehicle",
    credentials: "include",
  }),
  tagTypes: ["Vehicle"],
  endpoints: (builder) => ({
    getCars: builder.query({
      query: () => "/",
      providesTags: ["Vehicle"],
    }),
    createCar: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Vehicle"],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vehicle"],
    }),
    updateCar: builder.mutation({
      query: (body) => ({
        url: `/update/${body.id}`,
        method: "PUT",
        body: body.values,
      }),
      invalidatesTags: ["Vehicle"],
    }),
  }),
});
export const {
  useGetCarsQuery,
  useCreateCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
} = vehicleApiSlice;
