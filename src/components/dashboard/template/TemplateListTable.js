import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Box,
//  Button,
  Card,
//  Checkbox,
//  FormControlLabel,
//  IconButton,
  InputAdornment,
//  Link,
//  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from '@material-ui/core';
// import ArrowRightIcon from '../../../icons/ArrowRight';
// import ImageIcon from '../../../icons/Image';
// import PencilAltIcon from '../../../icons/PencilAlt';
import SearchIcon from '../../../icons/Search';
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';

const categoryOptions = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Active',
    value: 'active'
  },
  {
    label: 'On Hold',
    value: 'onhold'
  },
  {
    label: 'Inactive',
    value: 'inactive'
  },
  {
    label: 'Obsolete',
    value: 'obsolete'
  }
];

// const availabilityOptions = [
//  {
//    label: 'All',
//    value: 'all'
//  },
//  {
//    label: 'Active',
//    value: 'active'
//  }
// ];

const sortOptions = [
  {
    label: 'Last update (newest first)',
    value: 'updatedAt|desc'
  },
  {
    label: 'Last update (oldest first)',
    value: 'updatedAt|asc'
  },
  {
    label: 'Creation date (newest first)',
    value: 'createdAt|desc'
  },
  {
    label: 'Creation date (oldest first)',
    value: 'createdAt|asc'
  }
];

const getInventoryLabel = (inventoryType) => {
  const map = {
    active: {
      text: 'Active',
      color: 'success'
    },
    onhold: {
      text: 'On Hold',
      color: 'warning'
    },
    inactive: {
        text: 'Inactive',
        color: 'warning'
      },
      obsolete: {
      text: 'Obsolete',
      color: 'error'
    }
  };

  const { text, color } = map[inventoryType];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const applyFilters = (templates, query, filters) => templates
  .filter((template) => {
    let matches = true;

    if (query && !template.templateName.toLowerCase().includes(query.toLowerCase())) {
      matches = false;
    }

    if (filters.category && template.templateStatus !== filters.category) {
      matches = false;
    }

    if (filters.availability && ![
        'active'
       ].includes(template.templateStatus)) {
        matches = false;
    }

    // if (filters.availability) {
    //   if (filters.availability === 'available' && !template.templateStatus === 'active') {
    //    matches = false;
    //  }

    //  if (filters.availability === 'unavailable' && template.templateStatus !== 'active') {
    //    matches = false;
    //  }
    // }

    // if (filters.isShippable && !template.isShippable) {
    //  matches = false;
    // }

    return matches;
  });

const applyPagination = (templates, page, limit) => templates
  .slice(page * limit, page * limit + limit);

const TemplateListTable = (props) => {
  const { templates, ...other } = props;
//  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    category: null,
    availability: null,
//    inStock: null,
//    isShippable: null
  });

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    let value = null;

    if (event.target.value !== 'all') {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      category: value
    }));
  };

//  const handleAvailabilityChange = (event) => {
//    let value = null;

//    if (event.target.value !== 'all') {
//      value = event.target.value;
//    }

//    setFilters((prevFilters) => ({
//      ...prevFilters,
//      availability: value
//    }));
//  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

//  const handleSelectAllTemplates = (event) => {
//    setSelectedTemplates(event.target.checked
//      ? templates.map((template) => template.templateID)
//      : []);
//  };

//  const handleSelectOneTemplate = (event, templateId) => {
//    if (!selectedTemplates.includes(templateId)) {
//     setSelectedTemplates((prevSelected) => [...prevSelected, templateId]);
//    } else {
//      setSelectedTemplates((prevSelected) => prevSelected.filter((id) => id !== templateId));
//    }
//  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredTemplates = applyFilters(templates, query, filters);
  const paginatedTemplates = applyPagination(filteredTemplates, page, limit);
  // const enableBulkActions = selectedTemplates.length > 0;
  // const selectedSomeTemplates = selectedTemplates.length > 0
  //  && selectedTemplates.length < templates.length;
  // const selectedAllTemplates = selectedTemplates.length === templates.length;

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
            placeholder="Search templates (Name)"
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
            label="Status"
            name="category"
            onChange={handleCategoryChange}
            select
            SelectProps={{ native: true }}
            value={filters.category || 'all'}
            variant="outlined"
          >
            {categoryOptions.map((categoryOption) => (
              <option
                key={categoryOption.value}
                value={categoryOption.value}
              >
                {categoryOption.label}
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
                  Name
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                 Created By
                </TableCell>
                <TableCell>
                  Product Name
                </TableCell>
                <TableCell>
                 Product Price
                </TableCell>
                <TableCell>
                 Quanity
                </TableCell>
                <TableCell>
                  Sales Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTemplates.map((template) => {
                const isTemplateSelected = false;

                return (
                  <TableRow
                    hover
                    key={template.templateID}
                    selected={isTemplateSelected}
                    style={{ textDecoration: 'none' }}
                    component={RouterLink}
                    to={['/templates/details/?tid=', template.templateID].join('')}
                  >
                    <TableCell>
                      {template.templateName}
                    </TableCell>
                    <TableCell>
                      {getInventoryLabel(template.templateStatus)}
                    </TableCell>
                    <TableCell>
                      {template.templateDescription}
                    </TableCell>
                    <TableCell>
                      {template.templateCreator}
                    </TableCell>
                    <TableCell>
                      {template.productName}
                    </TableCell>
                    <TableCell>
                      {numeral(template.productPrice / 100)
                        .format(`${template.Currency}0,0.00`)}
                    </TableCell>
                    <TableCell>
                      {template.productQuantity}
                    </TableCell>
                    <TableCell>
                      {numeral(template.salesAmount / 100)
                        .format(`${template.Currency}0,0.00`)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredTemplates.length}
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

TemplateListTable.propTypes = {
  templates: PropTypes.array.isRequired
};

export default TemplateListTable;
