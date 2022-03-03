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

const tabs = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Active',
    value: 'hasAcceptedMarketing'
  },
  {
    label: 'Completed',
    value: 'isReturning'
  },
  {
    label: 'Prospect',
    value: 'isProspect'
  }
];

const sortOptions = [
  {
    label: 'Last Added (newest)',
    value: 'updatedAt|desc'
  },
  {
    label: 'Last added (oldest)',
    value: 'updatedAt|asc'
  },
  {
    label: 'Total cases (highest)',
    value: 'orders|desc'
  },
  {
    label: 'Total cases (lowest)',
    value: 'orders|asc'
  }
];

const applyFilters = (orders, query, filters) => orders
  .filter((order) => {
    let matches = true;

    if (query) {
      const properties = ['email', 'name'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (order[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && order[key] !== value) {
        matches = false;
      }
    });

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
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null
  });

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      hasAcceptedMarketing: null,
      isProspect: null,
      isReturning: null
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setSelectedOrders([]);
    setCurrentTab(value);
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
            placeholder="Search orders"
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
                  Title
                </TableCell>
                <TableCell>
                  Client Name
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
                <TableCell align="right">
                  Order Status
                </TableCell>
                <TableCell align="right">
                  Payment Status
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
                      {`${order.city}, ${order.state}, ${order.country}`}
                    </TableCell>
                    <TableCell>
                      {`${order.title} ${order.firstName} ${order.lastName}`}
                    </TableCell>
                    <TableCell>
                      {order.totalOrders}
                    </TableCell>
                    <TableCell>
                      {numeral(order.salesAmount / 100)
                        .format(`${order.currency}0,0.00`)}
                    </TableCell>
                    <TableCell>
                      {order.totalOrders}
                    </TableCell>
                    <TableCell>
                      {order.name}
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
