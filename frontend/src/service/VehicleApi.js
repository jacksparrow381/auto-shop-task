import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vehicleApiSlice = createApi({
  reducerPath: "vehicleApiSlice", // name of the reducer
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/vehicle", // backend url for vehicle
    credentials: "include", // to send cookies
  }),
  tagTypes: ["Vehicle"], // tag for invalidation
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
      invalidatesTags: ["Vehicle"], // invalidates the tag
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

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints

export const {
  useGetCarsQuery,
  useCreateCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
} = vehicleApiSlice;
