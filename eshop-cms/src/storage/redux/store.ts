import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";
import { productApis } from "../../apis";

const store = configureStore({
    reducer: {
        productStore: productReducer,
        [productApis.reducerPath]: productApis.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApis.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;