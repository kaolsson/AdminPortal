import PropTypes from 'prop-types';
import numeral from 'numeral';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Label from '../../Label';

const getStatusLabel = (paymentStatus) => {
  const map = {
    NEW: {
        color: 'success',
        text: 'New'
    },
      unpaid: {
      color: 'error',
      text: 'UnPaid'
    },
    paid: {
        color: 'success',
        text: 'Paid'
      },
      canceled: {
        color: 'error',
        text: 'Canceled'
      },
      completed: {
      color: 'success',
      text: 'Completed'
    },
    pending: {
      color: 'warning',
      text: 'Pending'
    },
    rejected: {
      color: 'error',
      text: 'Rejected'
    }
  };

  const { text, color } = map[paymentStatus];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const Receipt = () => (
    <TableRow>
      <TableCell>
        <Typography
        color="textPrimary"
        variant="subtitle2"
        >
        Receipt
        </Typography>
      </TableCell>
      <TableCell>
        <Button
          color="primary"
          startIcon={<ReceiptIcon fontSize="small" />}
          variant="text"
        >
          Download Receipt
        </Button>
      </TableCell>
    </TableRow>
  );

const PayOrder = () => (
    <TableRow>
      <TableCell>
        <Typography
        color="textPrimary"
        variant="subtitle2"
        >
        Pay
        </Typography>
      </TableCell>
      <TableCell>
        <Button
          color="primary"
          startIcon={<ReceiptIcon fontSize="small" />}
          variant="text"
        >
          Pay Order
        </Button>
      </TableCell>
    </TableRow>
  );

const OrderSummary = (props) => {
  const { order, ...other } = props;
  console.log(order);

  return (
    <Card {...other}>
      <CardHeader title="Order info" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Id
              </Typography>
            </TableCell>
            <TableCell>
              {order.id}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Vendor
              </Typography>
            </TableCell>
            <TableCell>
              <div>
                QomoTax
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Customer
              </Typography>
            </TableCell>
            <TableCell>
              <div>
                {order.customer.firstName}
                {' '}
                {order.customer.middleInitial}
                {' '}
                {order.customer.lastName}
              </div>
              <div>
                {order.customer.address1}
              </div>
              <div>
                {order.customer.city}
              </div>
              <div>
                {order.customer.country}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Date
              </Typography>
            </TableCell>
            <TableCell>
              {order.orderDate}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Subscription
              </Typography>
            </TableCell>
            <TableCell>
              {order.subscriptionRate}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Total Amount
              </Typography>
            </TableCell>
            <TableCell>
              {numeral(order.salesAmount / 100)
                .format(`${order.currency}0,0.00`)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Payment Method
              </Typography>
            </TableCell>
            <TableCell>
              {order.paymentMethod}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Payment Status
              </Typography>
            </TableCell>
            <TableCell>
              {getStatusLabel(order.paymentStatus)}
            </TableCell>
          </TableRow>
          {order.paymentStatus === 'unpaid' ? <PayOrder /> : <Receipt />}
        </TableBody>
      </Table>
      <CardActions>
        <Button
          color="primary"
          startIcon={<ReceiptIcon fontSize="small" />}
          variant="text"
        >
          Download Order
        </Button>
      </CardActions>
    </Card>
  );
};

OrderSummary.propTypes = {
  order: PropTypes.object.isRequired
};

export default OrderSummary;
