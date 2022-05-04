import PropTypes from 'prop-types';
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
import LockIcon from '../../../icons/Lock';
import UserIcon from '../../../icons/User';
import Label from '../../Label';

const CustomerContactDetails = (props) => {
  const { customer, isVerified, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader title="Contact Details" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {customer.email}
              </Typography>
              <Label color={isVerified ? 'success' : 'error'}>
                {isVerified ? 'Email verified' : 'Email not verified'}
              </Label>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Phone
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {customer.phone}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                User Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {customer.userName}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Address
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {customer.address1}
                {' '}
                {customer.address2}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {customer.city}
                {', '}
                {customer.state}
                {' '}
                {customer.zipCode}
                {' '}
                {customer.country}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Signup Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {customer.dateAdded}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Last Login
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {customer.lastLoginDate}
                {' at '}
                {customer.lastLoginTime}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Client Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {customer.status.toUpperCase()}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          p: 1
        }}
      >
        <Button
          color="inherit"
          startIcon={<LockIcon fontSize="small" />}
          variant="text"
        >
          Send Password Reset
        </Button>
        <Button
          color="inherit"
          startIcon={<UserIcon fontSize="small" />}
          sx={{ mt: 1 }}
          variant="text"
        >
          Login as Customer
        </Button>
      </Box>
    </Card>
  );
};

CustomerContactDetails.propTypes = {
  customer: PropTypes.object.isRequired,
  isVerified: PropTypes.bool.isRequired
};

export default CustomerContactDetails;
