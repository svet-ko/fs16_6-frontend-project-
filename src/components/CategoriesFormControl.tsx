import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

import useAppSelector from "../hooks/useAppSelector";
import { AppState } from "../redux/store";

interface CategoriesFormControlProps {
  selectValue: number | string;
  onItemChange: ((event: SelectChangeEvent<string | number>, child: React.ReactNode) => void) | undefined;
}

const CategoriesFormControl = ({
  selectValue,
  onItemChange,
}: CategoriesFormControlProps) => {
  const { categories, loading, error } = useAppSelector(
    (state: AppState) => state.categoriesReducer
  );

  return (
    <FormControl fullWidth>
      <InputLabel color="secondary">Categories</InputLabel>
      <Select
        color="secondary"
        labelId="form-select-category-label"
        value={selectValue}
        label="Categories"
        onChange={onItemChange}
        disabled={!!loading && !!error}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoriesFormControl;
