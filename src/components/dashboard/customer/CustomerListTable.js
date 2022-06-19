import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Avatar,
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
  Typography
} from '@material-ui/core';
// import ArrowRightIcon from '../../../icons/ArrowRight';
// import PencilAltIcon from '../../../icons/PencilAlt';
import SearchIcon from '../../../icons/Search';
import getInitials from '../../../utils/getInitials';
import Scrollbar from '../../Scrollbar';

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
    label: 'Closed',
    value: 'closed'
  }
];

const sortOptions = [
  {
    label: 'Name (A-Z)',
    value: 'firstName|desc'
  },
  {
    label: 'Name (Z-A)',
    value: 'firstName|asc'
  },
  {
    label: 'Total Amount',
    value: 'totalAmount|desc'
  },
  {
    label: 'Active Cases',
    value: 'activeCasesCount|desc'
  }
];

const applyFilters = (customers, query, filters) => customers
  .filter((customer) => {
    let matches = true;

    if (query) {
      const properties = ['email', 'firstName'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (customer[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value && customer[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });

const applyPagination = (customers, page, limit) => customers
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

const applySort = (customers, sort) => {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

const CustomerListTable = (props) => {
  const { customers, ...other } = props;
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    active: null,
    completed: null,
    new: null,
    closed: null
  });

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      active: null,
      completed: null,
      new: null,
      closed: null
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setSelectedCustomers([]);
    setCurrentTab(value);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleSelectAllCustomers = (event) => {
    setSelectedCustomers(event.target.checked
      ? customers.map((customer) => customer.id)
      : []);
  };

//  const handleSelectOneCustomer = (event, customerId) => {
//    if (!selectedCustomers.includes(customerId)) {
//      setSelectedCustomers((prevSelected) => [...prevSelected, customerId]);
//    } else {
//      setSelectedCustomers((prevSelected) => prevSelected.filter((id) => id !== customerId));
//    }
//  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const filteredCustomers = applyFilters(customers, query, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(sortedCustomers, page, limit);
  const enableBulkActions = selectedCustomers.length > 0;
  const selectedSomeCustomers = selectedCustomers.length > 0
    && selectedCustomers.length < customers.length;
  const selectedAllCustomers = selectedCustomers.length === customers.length;

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
            placeholder="Search Name and Email"
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
              checked={selectedAllCustomers}
              color="primary"
              indeterminate={selectedSomeCustomers}
              onChange={handleSelectAllCustomers}
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
                  Name
                </TableCell>
                <TableCell>
                  Contact
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Total Amount
                </TableCell>
                <TableCell>
                  Active Cases
                </TableCell>
                <TableCell>
                  Complete Cases
                </TableCell>
                <TableCell>
                  Current CPA
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer) => {
                const isCustomerSelected = selectedCustomers.includes(customer.id);

                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isCustomerSelected}
                    style={{ textDecoration: 'none' }}
                    component={RouterLink}
                    to={['/clients/details/?cid=', customer.customerID].join('')}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Avatar
                          src={customer.avatar}
                          sx={{
                            height: 42,
                            width: 42
                          }}
                        >
                          {getInitials(`${customer.firstName}, ${customer.lastName}`)}
                        </Avatar>
                        <Box sx={{ ml: 1 }}>
                          <Typography
                            color="textPrimary"
                            variant="h6"
                          >
                            {customer.title}
                            {' '}
                            {customer.firstName}
                            {' '}
                            {customer.lastName}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            variant="body2"
                          >
                            {customer.userName}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="body2"
                      >
                        {customer.phone}
                      </Typography>
                      <Typography
                          color="textSecondary"
                          variant="body2"
                      >
                          {customer.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="body2"
                      >
                      {`${customer.city}, ${customer.state}, ${customer.country}`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {numeral(customer.totalAmount / 100)
                        .format(`${customer.currency}0,0.00`)}
                    </TableCell>
                    <TableCell>
                      {customer.activeCasesCount}
                    </TableCell>
                    <TableCell>
                      {customer.completedCasesCount}
                    </TableCell>
                    <TableCell>
                      {customer.currentCpa}
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
        count={filteredCustomers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListTable.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListTable;
