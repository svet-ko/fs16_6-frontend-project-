import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  deleteProductAsync,
  fetchAllProductsAsync,
  updateProductAsync,
} from "../redux/slices/productsSlice";
import useAppDispatch from "../hooks/useDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { AppState } from "../redux/store";
import InfoTooltip from "./InfoTooltip";
import useDebounce from "../hooks/useDebounce";
import ErrorPage from "../pages/Error";
import LoadBox from "./LoadBox";

export default function FullFeaturedCrudGrid() {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useAppSelector(
    (state: AppState) => state.productReducer
  );

  const [rows, setRows] = useState<GridRowsProp>(products);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState<boolean>(false);
  const [isInfoTooltipSuccessed, setIsInfoTooltipSuccessed] =
    useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("Something went wrong");
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>(
    search
  );
  const [isRowUpdated, setIsRowUpdated] = useState<boolean>(false);
  useDebounce(() => setDebouncedSearch(search), search);

  useEffect(() => {
    dispatch(fetchAllProductsAsync({ title: search }))
      .unwrap()
      .then((result) => {
        setRows(result);
      })
      .catch(() => {});
  }, [debouncedSearch, isRowUpdated]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    dispatch(deleteProductAsync(Number(id)))
      .unwrap()
      .then(() => {
        setRows(rows.filter((row) => row.id !== id));
      })
      .catch((err) => {
        setErrorText(err);
        setIsInfoTooltipSuccessed(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    dispatch(updateProductAsync({ id: newRow.id, update: newRow }))
      .then(() => {
        setIsRowUpdated(true);
      })
      .catch((err) => {
        setIsInfoTooltipSuccessed(false);
        setIsInfoTooltipOpen(true);
      });
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 180,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 500,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      valueFormatter: ({ value }) => value.name,
      width: 180,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        mb: "2em",
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Admin's dashboard
      </Typography>
      <TextField
        id="outlined-controlled"
        label="Search for item"
        value={search}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(event.target.value);
        }}
        sx={{ mb: "2em" }}
      />
      {error && !loading && <ErrorPage message={error} />}
      {loading && !error && <LoadBox />}
      {!loading && !error && (
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          //onProcessRowUpdateError={(err) => console.log(err)}
          /*slots={{
            toolbar: EditToolbar,
          }}*/
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      )}
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={() => setIsInfoTooltipOpen(false)}
        isSuccessed={isInfoTooltipSuccessed}
        successText="User successfully created"
        errorText={errorText}
      />
    </Box>
  );
}
