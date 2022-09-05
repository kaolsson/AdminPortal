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
import ReceiptIcon from '@material-ui/icons/Receipt';
import CurrencyDollarIcon from '../../../icons/CurrencyDollar';

const totalSum = (projects) => {
    let total = 0;
    let i = 0;
    for (i = 0; i < projects.length; i++) {
        total += projects[i].customerSaving;
    }
    return (total);
};

const CustomerInvoicesSummary = (props) => {
  const { projects, ...other } = props;
  const totalSaved = totalSum(projects);

  return (
   <Card {...other}>
    <CardHeader title="Projects" />
    <Divider />
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              Total Savings for Customer
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {totalSaved}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              Paid Invoices
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              4 ($5500.00)
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              Unpaid Invoices
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              1 ($5612.00)
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              Refunded
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              0 ($0.00)
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              Gross Income
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              $1,200.00
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
        startIcon={<CurrencyDollarIcon fontSize="small" />}
        variant="text"
      >
        Create Order
      </Button>
      <Button
        color="inherit"
        startIcon={<ReceiptIcon fontSize="small" />}
        sx={{ mt: 1 }}
        variant="text"
      >
        Send Due Order Reminders
      </Button>
    </Box>
   </Card>
);
};

CustomerInvoicesSummary.propTypes = {
  projects: PropTypes.object.isRequired
};

export default CustomerInvoicesSummary;
