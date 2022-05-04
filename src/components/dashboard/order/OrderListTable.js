import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
//  Avatar,
  Box,
//  Button,
  Card,
  Checkbox,
  Divider,
//  IconButton,
  InputAdornment,
//  Link,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
//  Typography
} from '@material-ui/core';
// import ArrowRightIcon from '../../../icons/ArrowRight';
// import PencilAltIcon from '../../../icons/PencilAlt';
import SearchIcon from '../../../icons/Search';
// import getInitials from '../../../utils/getInitials';
import Scrollbar from '../../Scrollbar';
import Label from '../../Label';

const tabs = [
  {
    label: 'All',
    value: 'all'
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

const sortOptions = [
  {
    label: 'Last Added (newest)',
    value: 'orderDate|desc'
  },
  {
    label: 'Last added (oldest)',
    value: 'orderDate|asc'
  }
];

const paymentStatusOptions = [
    {
      label: 'All',
      value: 'all'
    },
    {
      label: 'Paid',
      value: 'paid'
    },
    {
      label: 'Unpaid',
      value: 'unpaid'
    },
    {
      label: 'Over Due',
      value: 'due'
    }
];

const paymentMethodOptions = [
    {
      label: 'All',
      value: 'all'
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
      value: 'bank'
    },
    {
      label: 'Cash',
      value: 'cash'
    }
];

const getPaymentStatusLabel = (paymentStatusType) => {
    const map = {
      paid: {
        text: 'Paid',
        color: 'success'
      },
      unpaid: {
        text: 'Unpaid',
        color: 'warning'
      },
      due: {
        text: 'Over Due',
        color: 'error'
      }
    };

    const { text, color } = map[paymentStatusType];

    return (
      <Label color={color}>
        {text}
      </Label>
    );
  };

const applyFilters = (orders, query, filters) => orders
  .filter((order) => {
    let matches = true;
    let containsQuery = false;

    if (order.customer.firstName.toLowerCase().includes(query.toLowerCase())) {
        containsQuery = true;
    }
    if (order.customer.lastName.toLowerCase().includes(query.toLowerCase())) {
        containsQuery = true;
    }
    if (!containsQuery) {
        matches = false;
    }

    if (filters.paymentStatus && order.paymentStatus !== filters.paymentStatus) {
        matches = false;
    }

    if (filters.paymentMethod && order.paymentMethod !== filters.paymentMethod) {
        matches = false;
    }

    if (filters.orderStatus && order.orderStatus !== filters.orderStatus) {
        matches = false;
    }

//    if (query) {
//      const properties = ['email', 'name'];
//      let containsQuery = false;
//
//      properties.forEach((property) => {
//        if (order[property].toLowerCase().includes(query.toLowerCase())) {
//          containsQuery = true;
//        }
//      });
//
//      if (!containsQuery) {
//        matches = false;
//      }
//   }

    return matches;
  });

const applyPagination = (orders, page, limit) => orders
  .slice(page * limit, page * limit + limit);

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (order, orderBy) => (order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy));

const applySort = (orders, sort) => {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = orders.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

const OrderListTable = (props) => {
  const { orders, ...other } = props;
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    orderStatus: null,
    paymentStatus: null,
    paymentMethod: null
  });

  const handleTabsChange = (event, value) => {
    let newValue = null;

    if (value !== 'all') {
      newValue = value;
    }

    setFilters((prevFilters) => ({
        ...prevFilters,
        orderStatus: newValue
      }));

    setSelectedOrders([]);
    setCurrentTab(value);
  };

  const handlePaymentStatusChange = (event) => {
    let value = null;

    if (event.target.value !== 'all') {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      paymentStatus: value
    }));
  };

  const handlePaymentMethodChange = (event) => {
    let value = null;

    if (event.target.value !== 'all') {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      paymentMethod: value
    }));
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleSelectAllOrders = (event) => {
    setSelectedOrders(event.target.checked
      ? orders.map((order) => order.id)
      : []);
  };

//  const handleSelectOneOrder = (event, orderId) => {
//    if (!selectedOrders.includes(orderId)) {
//      setSelectedOrders((prevSelected) => [...prevSelected, orderId]);
//    } else {
//      setSelectedOrders((prevSelected) => prevSelected.filter((id) => id !== orderId));
//    }
//  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const filteredOrders = applyFilters(orders, query, filters);
  const sortedOrders = applySort(filteredOrders, sort);
  const paginatedOrders = applyPagination(sortedOrders, page, limit);
  const enableBulkActions = selectedOrders.length > 0;
  const selectedSomeOrders = selectedOrders.length > 0
    && selectedOrders.length < orders.length;
  const selectedAllOrders = selectedOrders.length === orders.length;

  return (
    <Card {...other}>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          m: -1,
          p: 2
        }}
      >
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 500
          }}
        >
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onChange={handleQueryChange}
            placeholder="Search First or Last Name"
            value={query}
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            m: 1,
            width: 240
          }}
        >
          <TextField
            label="Sort By"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 240
          }}
        >
          <TextField
            fullWidth
            label="Payment Status"
            name="paymentStatus"
            onChange={handlePaymentStatusChange}
            select
            SelectProps={{ native: true }}
            value={filters.paymentStatus || 'all'}
            variant="outlined"
          >
            {paymentStatusOptions.map((paymentStatusOption) => (
              <option
                key={paymentStatusOption.value}
                value={paymentStatusOption.value}
              >
                {paymentStatusOption.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 240
          }}
        >
          <TextField
            fullWidth
            label="Payment Method"
            name="paymentMethod"
            onChange={handlePaymentMethodChange}
            select
            SelectProps={{ native: true }}
            value={filters.paymentMethod || 'all'}
            variant="outlined"
          >
            {paymentMethodOptions.map((paymentMethodOption) => (
              <option
                key={paymentMethodOption.value}
                value={paymentMethodOption.value}
              >
                {paymentMethodOption.label}
              </option>
            ))}
          </TextField>
        </Box>
      </Box>
      {enableBulkActions && (
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              backgroundColor: 'background.paper',
              mt: '6px',
              position: 'absolute',
              px: '4px',
              width: '100%',
              zIndex: 2
            }}
          >
            <Checkbox
              checked={selectedAllOrders}
              color="primary"
              indeterminate={selectedSomeOrders}
              onChange={handleSelectAllOrders}
            />
          </Box>
        </Box>
      )}
      <Scrollbar>
        <Box sx={{ minWidth: 700 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Product
                </TableCell>
                <TableCell>
                  Client Name
                </TableCell>
                <TableCell>
                  Order Status
                </TableCell>
                <TableCell>
                  Payment Status
                </TableCell>
                <TableCell>
                  Payment Method
                </TableCell>
                <TableCell align="right">
                  Prodcut Price
                </TableCell>
                <TableCell align="right">
                  Sales Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map((order) => {
                const isOrderSelected = selectedOrders.includes(order.id);

                return (
                  <TableRow
                    hover
                    key={order.id}
                    selected={isOrderSelected}
                    style={{ textDecoration: 'none' }}
                    component={RouterLink}
                    to={['/orders/details/?oid=', order.id].join('')}
                  >
                    <TableCell>
                      {order.orderDate.substring(0, 10)}
                    </TableCell>
                    <TableCell>
                      {order.carts[0].product[0].productName}
                    </TableCell>
                    <TableCell>
                      {`${order.customer.title} ${order.customer.firstName} ${order.customer.lastName}`}
                    </TableCell>
                    <TableCell>
                      {order.orderStatus.toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {getPaymentStatusLabel(order.paymentStatus)}
                    </TableCell>
                    <TableCell>
                      {order.paymentMethod.toUpperCase()}
                    </TableCell>
                    <TableCell align="right">
                      {numeral(order.carts[0].product[0].productPrice / 100)
                        .format(`${order.currency}0,0.00`)}
                    </TableCell>
                    <TableCell align="right">
                      {numeral(order.salesAmount / 100)
                        .format(`${order.currency}0,0.00`)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={filteredOrders.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OrderListTable.propTypes = {
  orders: PropTypes.array.isRequired
};

export default OrderListTable;
