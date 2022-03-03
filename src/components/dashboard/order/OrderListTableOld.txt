import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
//  Checkbox,
  Divider,
//  IconButton,
//  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
// import ArrowRightIcon from '../../../icons/ArrowRight';
// import PencilAltIcon from '../../../icons/PencilAlt';
import Label from '../../Label';
// import MoreMenu from '../../MoreMenu';
import Scrollbar from '../../Scrollbar';
// import OrderListBulkActions from './OrderListBulkActions';
import { Link as RouterLink } from 'react-router-dom';

const getStatusLabel = (paymentStatus) => {
  const map = {
    canceled: {
      color: 'error',
      text: 'Canceled'
    },
    completed: {
      color: 'success',
      text: 'Completed'
    },
    paid: {
        color: 'success',
        text: 'Paid'
      },
    pending: {
      color: 'warning',
      text: 'Pending'
    },
    rejected: {
      color: 'error',
      text: 'Rejected'
    },
    unpaid: {
        color: 'error',
        text: 'Unpaid'
      }
    };

  const { text, color } = map[paymentStatus];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

// const applyPagination = (orders, page, limit) => orders
//   .slice(page * limit, page * limit + limit);

const OrderListTable = (props) => {
  const { orders, ...other } = props;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  return (
    <>
      <Card {...other}>
        <CardHeader
          title="Orders"
        />
        <Divider />
        <Scrollbar>
          <Box sx={{ minWidth: 1150 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Order ID
                  </TableCell>
                  <TableCell>
                    Date
                  </TableCell>
                  <TableCell>
                    Product
                  </TableCell>
                  <TableCell>
                    Customer Name
                  </TableCell>
                  <TableCell>
                    Payment Method
                  </TableCell>
                  <TableCell>
                    Total Amount
                  </TableCell>
                  <TableCell align="right">
                    Payment Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.allIds.map((orderId) => {
                  const order = orders.byId[orderId];
                  return (
                    <TableRow
                      hover
                      key={orderId}
                      style={{ textDecoration: 'none' }}
                      component={RouterLink}
                      to={['/orders/details/?oid=', order.id].join('')}
                    >
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="body2"
                        >
                          {order.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="body2"
                        >
                          {order.orderDate}
                        </Typography>
                      </TableCell>
                      <TableCell>
                      {order.carts.map((cart) => (
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                          {cart.product[0].productName}
                        </Typography>
                        ))}
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                          {order.customer.firstName}
                          {' '}
                          {order.customer.middleInitial}
                          {' '}
                          {order.customer.lastName}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {order.customer.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {order.paymentMethod}
                      </TableCell>
                      <TableCell>
                        {numeral(order.salesAmount / 100).format(`${order.currency}0,0.00`)}
                      </TableCell>
                      <TableCell align="right">
                        {getStatusLabel(order.paymentStatus)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          component="div"
          count={orders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

OrderListTable.propTypes = {
  orders: PropTypes.array.isRequired
};

export default OrderListTable;
