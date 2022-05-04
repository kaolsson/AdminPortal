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

const CustomerInvoicesSummary = (props) => (
  <Card {...props}>
    <CardHeader title="Orders/Invoices" />
    <Divider />
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              Paid
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              2 ($50.00)
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              Unpaid
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              1 ($12.00)
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              Expired/Over Due
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              1 ($12.00)
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

export default CustomerInvoicesSummary;
