import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoryApiSlice } from "./service/CategoryApi";
import { vehicleApiSlice } from "./service/VehicleApi";

// Define a root reducer with the slices we've created
export const store = configureStore({
  // Add the generated reducer as a specific top-level slice
  reducer: {
    [vehicleApiSlice.reducerPath]: vehicleApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
  },
  // Add the generated middleware to our store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      vehicleApiSlice.middleware,
      categoryApiSlice.middleware
    ),
});
// Setup the listeners for the generated endpoints
setupListeners(store.dispatch);
