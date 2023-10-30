import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApis = createApi({
  reducerPath: "productApis",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/CMS/products/get",
      }),
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/CMS/products/${id}`,
      }),
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/CMS/products/create",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: "/CMS/products/update",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/CMS/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    })
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productApis;
export default productApis;
