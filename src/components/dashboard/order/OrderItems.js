import PropTypes from 'prop-types';
import numeral from 'numeral';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import Scrollbar from '../../Scrollbar';

const OrderItems = (props) => {
  const { ordercarts, ...other } = props;
  return (
    <Card {...other}>
      <CardHeader title="Order items" />
      <Divider />
      <Scrollbar>
        <Box sx={{ minWidth: 100 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    color="textPrimary"
                    variant="subtitle1"
                  >
                    Product
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textPrimary"
                    variant="subtitle1"
                  >
                    Description
                  </Typography>
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordercarts.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      variant="subtitle2"
                    >
                      {item.product[0].productQuantity}
                      {' '}
                      x
                      {' '}
                      {item.product[0].productName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {item.product[0].productDescription}
                  </TableCell>
                  <TableCell>
                    {numeral(item.salesAmount / 100)
                      .format(`${item.product[0].priceCurrency}0,0.00`)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={ordercarts.length}
        onPageChange={() => { }}
        onRowsPerPageChange={() => { }}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OrderItems.propTypes = {
  ordercarts: PropTypes.array.isRequired
};

export default OrderItems;
