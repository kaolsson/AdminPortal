import { Link as RouterLink } from 'react-router-dom';
// import { format } from 'date-fns';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import ArrowRightIcon from '../../../icons/ArrowRight';
import Label from '../../Label';
import MoreMenu from '../../MoreMenu';
import Scrollbar from '../../Scrollbar';
import PropTypes from 'prop-types';

const CustomerOrders = (props) => {
    const { orders } = props;

  return (
    <Card {...props}>
      <CardHeader
        action={<MoreMenu />}
        title="Invoices"
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
                  Total
                </TableCell>
                <TableCell>
                  Payment Status
                </TableCell>
                <TableCell>
                  Payment Method
                </TableCell>
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderID}>
                  <TableCell>
                    {order.orderID}
                  </TableCell>
                  <TableCell>
                    {order.orderDate.substring(0, 10)}
                    {' at '}
                    {order.orderDate.substring(12, 16)}
                  </TableCell>
                  <TableCell>
                    {order.Currency}
                    {' '}
                    {order.salesAmount / 100}
                  </TableCell>
                  <TableCell>
                    <Label color="primary">
                      {order.paymentStatus}
                    </Label>
                  </TableCell>
                  <TableCell>
                    <Label color="primary">
                      {order.paymentMethod}
                    </Label>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={RouterLink}
                      to="/dashboard/invoices/1"
                    >
                      <ArrowRightIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={orders.length}
        onPageChange={() => {
        }}
        onRowsPerPageChange={() => {
        }}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerOrders.propTypes = {
    orders: PropTypes.array.isRequired
  };
export default CustomerOrders;
