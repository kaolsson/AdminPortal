import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from '@material-ui/core';
import SearchIcon from '../../../icons/Search';
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';

const casetypeOptions = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Tax',
    value: 'tax'
  },
  {
    label: 'Payroll',
    value: 'payroll'
  },
  {
    label: 'Accounting',
    value: 'accounting'
  },
  {
    label: 'Other',
    value: 'other'
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
    label: 'Active',
    value: 'active'
  },
  {
    label: 'Complete',
    value: 'complete'
  },
  {
    label: 'Stopped',
    value: 'stopped'
  }
];

const actionOptions = [
    {
      label: 'All',
      value: 'all'
    },
    {
      label: 'Client',
      value: 'client'
    },
    {
      label: 'CPA',
      value: 'cpa'
    },
    {
      label: 'No Action',
      value: 'noaction'
    }
  ];

  const sortOptions = [
  {
    label: 'Client (A-Z)',
    value: 'clientFirstName|desc'
  },
  {
    label: 'Client (Z-A)',
    value: 'clientFirstName|asc'
  },
  {
    label: 'CPA (A-Z)',
    value: 'cpaFirstName|desc'
  },
  {
    label: 'CPA (Z-A)',
    value: 'cpaFirstName|asc'
  },
  {
    label: 'Last update (newest first)',
    value: 'dateUpdated|desc'
  },
  {
    label: 'Last update (oldest first)',
    value: 'dateUpdated|asc'
  },
  {
    label: 'Start date (newest first)',
    value: 'dateStarted|desc'
  },
  {
    label: 'Start date (oldest first)',
    value: 'dateStarted|asc'
  }
];

const getActionLabel = (actionType) => {
  const map = {
    client: {
      text: 'client',
      color: 'warning'
    },
    noaction: {
      text: 'no action',
      color: 'success'
    },
    cpa: {
      text: 'cpa',
      color: 'error'
    }
  };

  const { text, color } = map[actionType];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const applyFilters = (projects, query, filters) => projects
  .filter((project) => {
    let matches = true;

    if (query && !project.title.toLowerCase().includes(query.toLowerCase())) {
      matches = false;
    }

    if (filters.casetype && project.caseType !== filters.casetype) {
      matches = false;
    }

    if (filters.status && project.status !== filters.status) {
        matches = false;
    }

    if (filters.action && project.action !== filters.action) {
        matches = false;
    }
    return matches;
  });

const applyPagination = (projects, page, limit) => projects
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

  const applySort = (projects, sort) => {
    const [orderBy, order] = sort.split('|');
    const comparator = getComparator(order, orderBy);
    const stabilizedThis = projects.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const newOrder = comparator(a[0], b[0]);

      if (newOrder !== 0) {
        return newOrder;
      }

      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  };

const ProjectListTable = (props) => {
  const { projects, ...other } = props;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    casetype: null,
    status: null,
    action: null,
  });

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCaseTypeChange = (event) => {
    let value = null;

    if (event.target.value !== 'all') {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      casetype: value
    }));
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

  const handleActionChange = (event) => {
    let value = null;

    if (event.target.value !== 'all') {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      action: value
    }));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const filteredProjects = applyFilters(projects, query, filters);
  const sortedProjects = applySort(filteredProjects, sort);
  const paginatedProjects = applyPagination(sortedProjects, page, limit);

  return (
    <Card {...other}>
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
            placeholder="Search Cases"
            value={query}
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
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
            label="Case Type"
            name="casetype"
            onChange={handleCaseTypeChange}
            select
            SelectProps={{ native: true }}
            value={filters.casetype || 'all'}
            variant="outlined"
          >
            {casetypeOptions.map((casetypeOption) => (
              <option
                key={casetypeOption.value}
                value={casetypeOption.value}
              >
                {casetypeOption.label}
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
            label="Status"
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
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 240
          }}
        >
          <TextField
            fullWidth
            label="Action"
            name="action"
            onChange={handleActionChange}
            select
            SelectProps={{ native: true }}
            value={filters.action || 'all'}
            variant="outlined"
          >
            {actionOptions.map((actionOption) => (
              <option
                key={actionOption.value}
                value={actionOption.value}
              >
                {actionOption.label}
              </option>
            ))}
          </TextField>
        </Box>
      </Box>
      <Scrollbar>
        <Box sx={{ minWidth: 1200 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Case Type
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
                <TableCell>
                  Client
                </TableCell>
                <TableCell>
                  CPA
                </TableCell>
                <TableCell>
                  Date Started
                </TableCell>
                <TableCell>
                  Date Updated
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProjects.map((project) => {
                const isProjectselected = false;

                return (
                  <TableRow
                    hover
                    key={project.caseID}
                    selected={isProjectselected}
                    style={{ textDecoration: 'none' }}
                    component={RouterLink}
                    to={['/projects/details/?cid=', project.caseID].join('')}
                  >
                    <TableCell>
                      {project.title}
                    </TableCell>
                    <TableCell>
                      {project.description}
                    </TableCell>
                    <TableCell>
                      {project.caseType.toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {project.status.toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {getActionLabel(project.action)}
                    </TableCell>
                    <TableCell>
                      {project.client.firstName}
                      {' '}
                      {project.client.lastName}
                    </TableCell>
                    <TableCell>
                      {project.owner.firstName}
                      {' '}
                      {project.owner.lastName}
                    </TableCell>
                    <TableCell>
                      {project.dateStarted}
                    </TableCell>
                    <TableCell>
                      {project.dateUpdated}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredProjects.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </Scrollbar>
    </Card>
  );
};

ProjectListTable.propTypes = {
  projects: PropTypes.array.isRequired
};

export default ProjectListTable;
