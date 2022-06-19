import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import numeral from 'numeral';
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
import UpdateMessageModal from './UpdateMessageModal';

const tabs = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Web Portal',
    value: 'contactus'
  },
  {
    label: 'Smatmaster',
    value: 'inapp'
  },
  {
    label: 'Tech Support',
    value: 'techsupport'
  }
];

const sortOptions = [
  {
    label: 'Latest Message (Desc)',
    value: 'dateAdded|desc'
  },
  {
    label: 'Oldest Message (Asc)',
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
      label: 'Answered',
      value: 'answered'
    },
    {
      label: 'Complete',
      value: 'complete'
    }
];

const getStatusLabel = (statusType) => {
    const map = {
      new: {
        text: 'New',
        color: 'error'
      },
      answered: {
        text: 'Answered',
        color: 'primary'
      },
      complete: {
        text: 'Complete',
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

const applyFilters = (messages, query, filters) => messages
  .filter((message) => {
    let matches = true;
    let containsQuery = false;

    if (message.firstName.toLowerCase().includes(query.toLowerCase())) {
        containsQuery = true;
    }
    if (message.lastName.toLowerCase().includes(query.toLowerCase())) {
        containsQuery = true;
    }
    if (!containsQuery) {
        matches = false;
    }

    if (filters.status && message.status !== filters.status) {
        matches = false;
    }

    if (filters.typeOrigin && message.typeOrigin !== filters.typeOrigin) {
        matches = false;
    }

    return matches;
  });

const applyPagination = (messages, page, limit) => messages
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

const applySort = (messages, sort) => {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = messages.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

const MessageListTable = (props) => {
  const { messages, ...other } = props;
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    status: null
  });
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const handleTabsChange = (event, value) => {
    let newValue = null;

    if (value !== 'all') {
      newValue = value;
    }

    setFilters((prevFilters) => ({
        ...prevFilters,
        typeOrigin: newValue
      }));

    setSelectedMessages([]);
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

  const handleSelectAllMessages = (event) => {
    setSelectedMessages(event.target.checked
      ? messages.map((message) => message.id)
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(messages);

  const filteredMessages = applyFilters(messages, query, filters);
  const sortedMessages = applySort(filteredMessages, sort);
  const paginatedMessages = applyPagination(sortedMessages, page, limit);
  const enableBulkActions = selectedMessages.length > 0;
  const selectedSomeMessages = selectedMessages.length > 0
    && selectedMessages.length < messages.length;
  const selectedAllMessages = selectedMessages.length === messages.length;

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
            label="Message Status"
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
              checked={selectedAllMessages}
              color="primary"
              indeterminate={selectedSomeMessages}
              onChange={handleSelectAllMessages}
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
                  Message
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
              {paginatedMessages.map((message) => {
                const isMessageSelected = selectedMessages.includes(message.messageID);

                return (
                  <TableRow
                    hover
                    key={message.messageID}
                    selected={isMessageSelected}
                    style={{ textDecoration: 'none' }}
                    onClick={() => {
                        setModalMessage(message);
                        handleOpen();
                    }}
                  >
                    <TableCell>
                      {`${message.dateAdded.substring(0, 10)} at ${message.dateAdded.substring(11, 16)}`}
                    </TableCell>
                    <TableCell>
                      {`${message.firstName} ${message.lastName}`}
                    </TableCell>
                    <TableCell>
                      {message.phone}
                    </TableCell>
                    <TableCell>
                      {message.email}
                    </TableCell>
                    <TableCell>
                      {message.messageText}
                    </TableCell>
                    <TableCell>
                      {message.siteOrigin.toUpperCase()}
                    </TableCell>
                    <TableCell align="right">
                      {getStatusLabel(message.status)}
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
        count={filteredMessages.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
     </Card>
       <UpdateMessageModal
            message={modalMessage}
            onApply={handleClose}
            onClose={handleClose}
            open={open}
       />
    </box>
  );
};

MessageListTable.propTypes = {
  messages: PropTypes.array.isRequired
};

export default MessageListTable;
