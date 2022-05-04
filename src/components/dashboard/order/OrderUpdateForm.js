import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';
import { orderApi } from '../../../__fakeApi__/orderApi';
import PropTypes from 'prop-types';

const orderStatusOptions = [
    {
        value: '',
        label: ''
    },
    {
        label: 'New',
        value: 'new'
    },
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Completed',
        value: 'completed'
    },
    {
        label: 'Stopped',
        value: 'stopped'
    }
];

const paymentStatusOptions = [
    {
        value: '',
        label: ''
    },
    {
        label: 'Paid',
        value: 'paid'
    },
    {
        label: 'UnPaid',
        value: 'unpaid'
    },
    {
        label: 'Over Due',
        value: 'due'
    }
];

const paymentMethodOptions = [
    {
        value: '',
        label: ''
    },
    {
        label: 'Card',
        value: 'card'
    },
    {
        label: 'Check',
        value: 'check'
    },
    {
        label: 'Bank Deposit',
        value: 'Bank'
    },
    {
        label: 'Cash',
        value: 'cash'
    }
];

const tableStyle = {
    border: '0px solid'
};

const OrderUpdateForm = (props) => {
  const { order } = props;
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        orderID: order.id,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        firstName: order.customer.firstName,
        note: order.note,
        submit: null
      }}
      validationSchema={Yup
        .object()
        .shape({
          orderStatus: Yup.string().max(20).required(),
          paymentStatus: Yup.string().max(20).required(),
          paymentMethod: Yup.string().max(20).required(),
          note: Yup.string().max(200),
        })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await orderApi.updateOrder(values);
          setStatus({ success: true });
          setSubmitting(false);
          toast.success('Order updated!');
          navigate(['/orders/details/?oid=', order.id].join(''));
        } catch (err) {
          console.error(err);
          toast.error('Something went wrong!');
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          {...props}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <Card>
                <CardHeader title="Order Data" />
                <CardContent>
                <Table style={tableStyle}>
                    <TableBody>
                        <TableRow style={tableStyle}>
                            <TableCell style={tableStyle}>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                            >
                                Order ID
                            </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                {order.id}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableStyle}>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                            >
                                Vendor
                            </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                {order.vendor.organization}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableStyle}>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                            >
                                Customer
                            </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                {order.customer.firstName}
                                {' '}
                                {order.customer.lastName}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableStyle}>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                            >
                                Order Date
                            </Typography>
                            </TableCell>
                            <TableCell style={tableStyle}>
                                {order.orderDate}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </CardContent>
              </Card>
              <Box sx={{ mt: 3 }}>
              <Card>
                <CardHeader title="Notes" />
                <CardContent>
                  <TextField
                    error={Boolean(touched.note && errors.note)}
                    fullWidth
                    helperText={touched.note && errors.note}
                    label="Internal Product Note"
                    name="note"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.note}
                    variant="outlined"
                  />
                </CardContent>
              </Card>
              </Box>
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <Card>
                <CardHeader title="Update Order and Payment Status" />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Order Status"
                    name="orderStatus"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.orderStatus}
                    variant="outlined"
                  >
                    {orderStatusOptions.map((orderStatus) => (
                      <option
                        key={orderStatus.value}
                        value={orderStatus.value}
                      >
                        {orderStatus.label}
                      </option>
                    ))}
                  </TextField>
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="Payment Status"
                    name="paymentStatus"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.paymentStatus}
                    variant="outlined"
                  >
                    {paymentStatusOptions.map((paymentStatus) => (
                      <option
                        key={paymentStatus.value}
                        value={paymentStatus.value}
                      >
                        {paymentStatus.label}
                      </option>
                    ))}
                  </TextField>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="Payment Method"
                    name="paymentMethod"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.paymentMethod}
                    variant="outlined"
                  >
                    {paymentMethodOptions.map((paymentMethod) => (
                      <option
                        key={paymentMethod.value}
                        value={paymentMethod.value}
                      >
                        {paymentMethod.label}
                      </option>
                    ))}
                  </TextField>
                  </Box>
                </CardContent>
              </Card>
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt: 3
                }}
              >
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                >
                  Save Order Update
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

OrderUpdateForm.propTypes = {
    order: PropTypes.array.isRequired
  };

export default OrderUpdateForm;
