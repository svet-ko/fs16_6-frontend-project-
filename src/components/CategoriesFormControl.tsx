import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import React from 'react'

import useAppSelector from '../hooks/useAppSelector';
import { AppState } from '../redux/store';

interface CategoriesFormControlProps {
  selectValue: number | string;
  onItemChange: (params?: any) => void;
}

const CategoriesFormControl = ({selectValue, onItemChange}: CategoriesFormControlProps) => {

  const {categories, loading, error} = useAppSelector((state: AppState) => state.categoriesReducer);

  return (
    <FormControl fullWidth>
      <InputLabel color='secondary' id="form-select-category-label">Categories</InputLabel>
      <Select
        color='secondary'
        labelId="form-select-category-label"
        id="form-select-category"
        value={selectValue}
        label="Categories"
        onChange={onItemChange}
        disabled={!!loading && !!error}
      >
        {categories.map((category) =>
          (<MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)
        )}
      </Select>
    </FormControl>
  )
}

export default CategoriesFormControl