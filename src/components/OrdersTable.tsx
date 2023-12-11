import { Box, Button, ButtonGroup, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import useAppDispatch from '../hooks/useDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { AppState } from '../redux/store';
import LoadBox from './LoadBox';
import ErrorPage from '../pages/Error';
import { fetchOrdersByUserAsync } from '../redux/slices/orderSlice';
import Order from '../types/Order';
import StyledImage from "../styles/components/StyledImage";

function Row(props: { row: Order }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row._id}</TableCell>
        <TableCell align="center">{row.totalPrice}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Items:
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" />
                    <TableCell align="center">Product</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items.map((itemsRow) => (
                    <TableRow key={itemsRow._id}>
                      <TableCell align="center">
                        <StyledImage classes='order-image' link={itemsRow.productId.images[0]} />
                      </TableCell>
                      <TableCell align="center">{itemsRow.productId.title}</TableCell>
                      <TableCell align="center">{itemsRow.quantity}</TableCell>
                      <TableCell align="center">
                        {Math.round(itemsRow.quantity * itemsRow.productId.price )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const OrdersTable = () => {
  const dispatch = useAppDispatch();
  const {
    userOrders,
    loading,
    error
  } = useAppSelector(
    (state: AppState) => state.ordersReducer
  );
  const { currentUser } = useAppSelector(
    (state: AppState) => state.usersReducer
  );
  const jwt = localStorage.getItem('token');

  useEffect(() => {
    dispatch(fetchOrdersByUserAsync({ 
      userId: currentUser?._id as string,
      accessToken: jwt as string
    }));
  }, []);

  return (
    <TableContainer component={Paper}>
      {error && !loading && <ErrorPage message={error} />}
    
      {loading && !error && <LoadBox />}

      {!loading && !error && userOrders && (
        <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Order Id</TableCell>
            <TableCell align="center">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userOrders.map((row) => (
            <Row key={row._id} row={row} />
          ))}
        </TableBody>
      </Table>
      )}
    </TableContainer>
  );
}

export default OrdersTable;