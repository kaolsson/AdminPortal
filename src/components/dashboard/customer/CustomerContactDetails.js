import PropTypes from 'prop-types';
import {
//  Box,
//  Button,
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

const getStatusLabel = (clientStatus) => {
    const map = {
      active: {
        color: 'success',
        text: 'Active'
      },
      new: {
        color: 'primary',
        text: 'New'
      },
      complete: {
        color: 'warning',
        text: 'Complete'
      },
      closed: {
          color: 'error',
          text: 'Closed'
      }
    };

    const { text, color } = map[clientStatus];

    return (
      <Label color={color}>
        {text}
      </Label>
    );
  };

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
              {getStatusLabel(customer.status)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                UUID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {customer.customerID}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

CustomerContactDetails.propTypes = {
  customer: PropTypes.object.isRequired,
  isVerified: PropTypes.bool.isRequired
};

export default CustomerContactDetails;
