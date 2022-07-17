import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core';
import Label from '../../Label';
import { orderApi } from '../../../__fakeApi__/orderApi';
import useAuth from '../../../hooks/useAuth';
import useMounted from '../../../hooks/useMounted';
import numeral from 'numeral';

const labelColorsMap = {
  pending: 'error',
  unpaid: 'error',
  paid: 'success',
  completed: 'success',
  rejected: 'error'
};

const NotPaidOrderDashboard = () => {
  const mounted = useMounted();
  const { user } = useAuth();
  const [orders, setOrders] = useState(null);

  const getOrders = useCallback(async () => {
    try {
      const data = await orderApi.getOrders(user.customerID);

      if (mounted.current) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (!orders) {
    return <p> </p>;
  }

  if (orders.order.filter((order) => order.paymentStatus === 'unpaid').length !== 0) {
    return (
    <>
    <Box
      sx={{
        backgroundColor: 'background.widget',
        minHeight: '100%',
        p: 3
      }}
    >
      <Card>
        <CardHeader title="Orders not Paid" />
        <Divider />
        <Table>
          <TableBody>
            {orders.order.map((order) => (
              <TableRow
                key={order.id}
                sx={{
                  '&:last-child td': {
                    border: 0
                  }
                }}
              >
                <TableCell>
                  <Typography
                    color="textPrimary"
                    variant="subtitle2"
                  >
                    {order.orderDate}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                  >
                    Order Date
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
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    Customer Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textPrimary"
                    variant="subtitle2"
                  >
                    {order.orderDate}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                  >
                    Due Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textPrimary"
                    variant="subtitle2"
                  >
                    {numeral(order.salesAmount / 100).format(`${order.currency}0,0.00`)}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                  >
                    Amount to Pay
                  </Typography>
                </TableCell>
                <TableCell>
                  <Label color={labelColorsMap[order.paymentStatus]}>
                    {order.paymentStatus}
                  </Label>
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="primary"
                    size="small"
                    variant="outlined"
                    href="/orders/details/?oid=1"
                  >
                    Go to Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
    </>
  );
  }

  return (
    <>
    <Box
      sx={{
        backgroundColor: 'background.widget',
        minHeight: '100%',
        p: 3
      }}
    >
      <Card>
        <CardHeader title="No pending payments" />
      </Card>
    </Box>
    </>
  );
};

export default NotPaidOrderDashboard;
