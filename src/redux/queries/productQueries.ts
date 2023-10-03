import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import Product from '../../types/Product'
import PaginationQuery from '../../types/PaginationQuery'
import ProductToCreate from '../../types/ProductToCreate';

//another version of productReducer using RTK-Queries library
const productQueries = createApi({
  reducerPath: 'productApi',
  //base query for all the api calls inside this createApi
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.escuelajs.co/api/v1/products'}),
  tagTypes: ['Products'], //key for cached value
  endpoints: (builder) => ({
    //query for GET requests
    //mutation for POST UPDATE and DELETE which modify data
    //a hook is created from dispatch, async thunk function -> return data, error, loading
    fetchAllProducts: builder.query<Product[], PaginationQuery>({
      query: ({limit, offset}) => `?offset=${offset}&limit=${limit}`,
      providesTags: ['Products'] //attach the value to the cached key
      //if cached provide cache in case same set of values
    }), //when we call fetchAllProducts, we send request to `baseUrl?offset=${offset}&limit=${limit}`
    getProductById: builder.query<Product, string>({
      query: (productId: string) => `${productId}`,
    }),
    addProduct: builder.mutation<Product, ProductToCreate>({
      query: (newProduct: ProductToCreate) => ({
        url: '',
        method: 'POST',
        body: newProduct 
      }),
      invalidatesTags: ['Products']
    }),
    deleteProduct: builder.mutation<boolean, string>({
      query: (productId) => ({url: `${productId}`, method: 'DELETE'}),
      invalidatesTags: ['Products']//rexecute key func and append value to the key
    })
  })
})

export const { useFetchAllProductsQuery, useGetProductByIdQuery, useDeleteProductMutation } = productQueries;
export default productQueries;