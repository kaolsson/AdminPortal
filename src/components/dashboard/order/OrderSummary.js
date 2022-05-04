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
    paid: {
      color: 'success',
      text: 'Paid'
    },
    unpaid: {
      color: 'warning',
      text: 'UnPaid'
    },
    due: {
      color: 'error',
      text: 'Over Due'
    },
    new: {
        color: 'primary',
        text: 'New'
    },
    active: {
        color: 'success',
        text: 'Active'
    },
    completed: {
        color: 'success',
        text: 'Completed'
    },
    stopped: {
        color: 'error',
        text: 'Stopped'
    }
  };

  const { text, color } = map[paymentStatus];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const SquareInfo = (props) => {
    const { order, ...other } = props;
    return (
      <Card {...other}>
        <CardHeader title="Square Payment Info" />
        <Divider />
        <Table>
        <TableBody>

        <TableRow>
        <TableCell>
        <Typography
            color="textPrimary"
            variant="subtitle2"
        >
            Square Payment Status
        </Typography>
        </TableCell>
        <TableCell>
        {order.payment_square.square_payment_status}
        </TableCell>
        </TableRow>
        <TableRow>
        <TableCell>
        <Typography
            color="textPrimary"
            variant="subtitle2"
        >
            Square Approved Amount
        </Typography>
        </TableCell>
        <TableCell>
        {numeral(order.payment_square.square_approved_amount / 100)
            .format(`${order.currency}0,0.00`)}
        </TableCell>
        </TableRow>
        <TableRow>
        <TableCell>
        <Typography
            color="textPrimary"
            variant="subtitle2"
        >
            Square Payment ID
        </Typography>
        </TableCell>
        <TableCell>
        {order.payment_square.square_payment_id}
        </TableCell>
        </TableRow>
        </TableBody>
        </Table>
        <SendReceipt />
      </Card>
    );
};

const SendReceipt = () => (
        <div>
            <CardActions>
            <Button
            color="primary"
            startIcon={<ReceiptIcon fontSize="small" />}
            variant="text"
            >
            Send Customer Receipt
            </Button>
            </CardActions>
            <CardActions>
            <Button
            color="primary"
            startIcon={<ReceiptIcon fontSize="small" />}
            variant="text"
            >
            Download Customer Receipt
            </Button>
            </CardActions>
        </div>
);

const SendReminder = () => (
        <Button
          color="primary"
          startIcon={<ReceiptIcon fontSize="small" />}
          variant="text"
        >
          Send Payment Reminder
        </Button>
);

const OrderSummary = (props) => {
  const { order, ...other } = props;
  console.log(order);

  return (
    <div>
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
                Order ID
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
                Order Date
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
                Order Status
              </Typography>
            </TableCell>
            <TableCell>
              {getStatusLabel(order.orderStatus)}
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
                {order.vendor.organization}
              </div>
              <div>
                {order.vendor.address1}
                {' '}
                {order.vendor.address2}
              </div>
              <div>
                {order.vendor.city}
                {', '}
                {order.vendor.state}
                {' '}
                {order.vendor.zipCode}
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
                {order.customer.title}
                {' '}
                {order.customer.firstName}
                {' '}
                {order.customer.middleInitial}
                {' '}
                {order.customer.lastName}
              </div>
              <div>
                {order.customer.address1}
                {' '}
                {order.customer.address2}
              </div>
              <div>
                {order.customer.city}
                {', '}
                {order.customer.state}
                {' '}
                {order.customer.zipCode}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Subscription Rate
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
                Discount
              </Typography>
            </TableCell>
            <TableCell>
            <Typography
                color="red"
                variant="subtitle2"
            >
              {numeral(order.salesDiscount / 100)
                .format(`${order.currency}0,0.00`)}
            </Typography>
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
              {order.paymentMethod.toUpperCase()}
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
        </TableBody>
      </Table>
      <CardActions>
        {order.paymentStatus === 'paid' ? <div> </div> : <SendReminder /> }
      </CardActions>
    </Card>
    <Card {...other}>
      {order.paymentStatus === 'paid' ? <SquareInfo order={order} /> : <div> </div> }
    </Card>
    </div>
  );
};

OrderSummary.propTypes = {
  order: PropTypes.object.isRequired
};

SquareInfo.propTypes = {
    order: PropTypes.object.isRequired
  };

export default OrderSummary;
