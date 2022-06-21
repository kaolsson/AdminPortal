import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Checkbox,
  Divider,
  InputAdornment,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField
} from '@material-ui/core';
import SearchIcon from '../../../icons/Search';
import Scrollbar from '../../Scrollbar';
import Label from '../../Label';
import UpdateSignupModal from './UpdateSignupModal';

const tabs = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Web Portal',
    value: 'webportal'
  },
  {
    label: 'Smatmaster',
    value: 'inapp'
  }
];

const sortOptions = [
  {
    label: 'Latest Signup (Desc)',
    value: 'dateAdded|desc'
  },
  {
    label: 'Oldest Signup (Asc)',
    value: 'dateAdded|asc'
  }
];

const statusOptions = [
    {
      label: 'All',
      value: 'all'
    },
    {
      label: 'New',
      value: 'new'
    },
    {
      label: 'Contacted',
      value: 'contacted'
    },
    {
      label: 'Client',
      value: 'client'
    }
];

const getStatusLabel = (statusType) => {
    const map = {
      new: {
        text: 'New',
        color: 'error'
      },
      contacted: {
        text: 'Contacted',
        color: 'primary'
      },
      client: {
        text: 'Client',
        color: 'success'
      }
    };

    const { text, color } = map[statusType];

    return (
      <Label color={color}>
        {text}
      </Label>
    );
  };

const applyFilters = (signups, query, filters) => signups
  .filter((signup) => {
    let matches = true;
    let containsQuery = false;

    if (signup.firstName.toLowerCase().includes(query.toLowerCase())) {
        containsQuery = true;
    }
    if (signup.lastName.toLowerCase().includes(query.toLowerCase())) {
        containsQuery = true;
    }
    if (!containsQuery) {
        matches = false;
    }

    if (filters.status && signup.status !== filters.status) {
        matches = false;
    }

    if (filters.typeOrigin && signup.typeOrigin !== filters.typeOrigin) {
        matches = false;
    }

    return matches;
  });

const applyPagination = (signups, page, limit) => signups
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

const applySort = (signups, sort) => {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = signups.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

const SignupListTable = (props) => {
  const { signups, ...other } = props;
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedSignups, setSelectedSignups] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    status: null
  });
  const [open, setOpen] = useState(false);
  const [modalSignup, setModalSignup] = useState({});
  const handleTabsChange = (event, value) => {
    let newValue = null;

    if (value !== 'all') {
      newValue = value;
    }

    setFilters((prevFilters) => ({
        ...prevFilters,
        typeOrigin: newValue
      }));

    setSelectedSignups([]);
    setCurrentTab(value);
  };

  const handleStatusChange = (event) => {
    let value = null;

    if (event.target.value !== 'all') {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleSelectAllSignups = (event) => {
    setSelectedSignups(event.target.checked
      ? signups.map((signup) => signup.id)
      : []);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(signups);

  const filteredSignups = applyFilters(signups, query, filters);
  const sortedSignups = applySort(filteredSignups, sort);
  const paginatedSignups = applyPagination(sortedSignups, page, limit);
  const enableBulkActions = selectedSignups.length > 0;
  const selectedSomeSignups = selectedSignups.length > 0
    && selectedSignups.length < signups.length;
  const selectedAllSignups = selectedSignups.length === signups.length;

  return (
    <box>
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
            label="Signup Status"
            name="status"
            onChange={handleStatusChange}
            select
            SelectProps={{ native: true }}
            value={filters.status || 'all'}
            variant="outlined"
          >
            {statusOptions.map((statusOption) => (
              <option
                key={statusOption.value}
                value={statusOption.value}
              >
                {statusOption.label}
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
              checked={selectedAllSignups}
              color="primary"
              indeterminate={selectedSomeSignups}
              onChange={handleSelectAllSignups}
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
                  Date and Time
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  User Name
                </TableCell>
                <TableCell>
                  Site Origin
                </TableCell>
                <TableCell align="right">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSignups.map((signup) => {
                const isSignupSelected = selectedSignups.includes(signup.messageID);

                return (
                  <TableRow
                    hover
                    key={signup.messageID}
                    selected={isSignupSelected}
                    style={{ textDecoration: 'none' }}
                    onClick={() => {
                        setModalSignup(signup);
                        handleOpen();
                    }}
                  >
                    <TableCell>
                      {`${signup.dateAdded.substring(0, 10)} at ${signup.dateAdded.substring(11, 16)}`}
                    </TableCell>
                    <TableCell>
                      {`${signup.firstName} ${signup.lastName}`}
                    </TableCell>
                    <TableCell>
                      {signup.phone}
                    </TableCell>
                    <TableCell>
                      {signup.email}
                    </TableCell>
                    <TableCell>
                      {signup.userName}
                    </TableCell>
                    <TableCell>
                      {signup.siteOrigin}
                    </TableCell>
                    <TableCell align="right">
                      {getStatusLabel(signup.status)}
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
        count={filteredSignups.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
     </Card>
       <UpdateSignupModal
            signup={modalSignup}
            onApply={handleClose}
            onClose={handleClose}
            open={open}
       />
    </box>
  );
};

SignupListTable.propTypes = {
  signups: PropTypes.array.isRequired
};

export default SignupListTable;
