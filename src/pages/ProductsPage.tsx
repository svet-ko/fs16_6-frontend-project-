import React, { useEffect, useState } from 'react'

import { AppState } from '../redux/store'
import { createProduct, fetchAllProductsAsync, sortByPrice } from '../redux/slices/productsSlice'
import { addToCart, removeFromCart } from '../redux/slices/cartSlice'
import useAppSelector from '../hooks/useAppSelector'
import useAppDispatch from '../hooks/useDispatch'
//import { getFiltered } from '../redux/selectors/getFiltered'
//import { addToCart } from '../redux/reducers/cartReducer'
import Product from '../types/Product'
import { unwrapResult } from '@reduxjs/toolkit'
import { getFiltered } from '../redux/selectors/getFiltered'

const ProductsPage = () => {
  const {products, loading, error} = useAppSelector((state: AppState) => state.productReducer); //method to read any state from the global store
  const [search, setSearch] = useState<string | undefined>();
  const [offset, setOffset] = useState<number>(0);
  const dispatch = useAppDispatch();
  const filteredProducts = useAppSelector((state: AppState) => getFiltered(state, search));
  const cart = useAppSelector((state: AppState) => state.cartReducer);

  useEffect(() => {
    dispatch(fetchAllProductsAsync({offset: offset, limit: 20}))//possible to make "fetch more" button which grows the value of offset and limit. Offset and limit is set through the dispatch func
  }, [offset]);

  const onSortAsc = () => {
    dispatch(sortByPrice('asc'));
  }

  const onSortDesc = () => {
    dispatch(sortByPrice('desc'));
  }

  const onAddNew = () => {
    dispatch(createProduct({
      title: "New Product",
      price: 10,
      description: "A description",
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"]
    }));
  }

  return (
    <div>
      <p>Products Page</p>
      <button onClick={onAddNew}>Add new product</button>
      <button onClick={onSortAsc}>Sort asc</button>
      <button onClick={onSortDesc}>Sort desc</button>
      <input type="text" placeholder='Search for product by title' value={search} onChange={(e) => setSearch(e.target.value)} />
      {loading && (
        <p>loading in progress</p>
      )}
      {!loading && error && (
        <p>{error}</p>
      )}
      {!loading && !error && filteredProducts.map(product => (
        <div key={product.id}>
          {product.title} {product.price}
        </div>
      ))}
      <button onClick={()=>setOffset(offset+1)}>next page</button>
    </div>
  )
}

export default ProductsPage