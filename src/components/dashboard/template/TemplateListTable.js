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
  IconButton,
  InputAdornment,
  Link,
//  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from '@material-ui/core';
import ArrowRightIcon from '../../../icons/ArrowRight';
// import ImageIcon from '../../../icons/Image';
import PencilAltIcon from '../../../icons/PencilAlt';
import SearchIcon from '../../../icons/Search';
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';

const categoryOptions = [
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

const availabilityOptions = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Active',
    value: 'active'
  }
];

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
    inactive: {
      text: 'In Active',
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

const applyFilters = (products, query, filters) => products
  .filter((product) => {
    let matches = true;

    if (query && !product.productName.toLowerCase().includes(query.toLowerCase())) {
      matches = false;
    }

    if (filters.category && product.productCategory !== filters.category) {
      matches = false;
    }

    if (filters.availability && ![
        'active'
       ].includes(product.productStatus)) {
        matches = false;
    }

    // if (filters.availability) {
    //   if (filters.availability === 'available' && !product.productStatus === 'active') {
    //    matches = false;
    //  }

    //  if (filters.availability === 'unavailable' && product.productStatus !== 'active') {
    //    matches = false;
    //  }
    // }

    // if (filters.isShippable && !product.isShippable) {
    //  matches = false;
    // }

    return matches;
  });

const applyPagination = (products, page, limit) => products
  .slice(page * limit, page * limit + limit);

const TemplateListTable = (props) => {
  const { products, ...other } = props;
//  const [selectedProducts, setSelectedProducts] = useState([]);
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

  const handleAvailabilityChange = (event) => {
    let value = null;

    if (event.target.value !== 'all') {
      value = event.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      availability: value
    }));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

//  const handleSelectAllProducts = (event) => {
//    setSelectedProducts(event.target.checked
//      ? products.map((product) => product.productID)
//      : []);
//  };

//  const handleSelectOneProduct = (event, productId) => {
//    if (!selectedProducts.includes(productId)) {
//     setSelectedProducts((prevSelected) => [...prevSelected, productId]);
//    } else {
//      setSelectedProducts((prevSelected) => prevSelected.filter((id) => id !== productId));
//    }
//  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredProducts = applyFilters(products, query, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, limit);
  // const enableBulkActions = selectedProducts.length > 0;
  // const selectedSomeProducts = selectedProducts.length > 0
  //  && selectedProducts.length < products.length;
  // const selectedAllProducts = selectedProducts.length === products.length;

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
            placeholder="Search products"
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
            label="Category"
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
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 240
          }}
        >
          <TextField
            fullWidth
            label="Availability"
            name="availability"
            onChange={handleAvailabilityChange}
            select
            SelectProps={{ native: true }}
            value={filters.availability || 'all'}
            variant="outlined"
          >
            {availabilityOptions.map((availabilityOption) => (
              <option
                key={availabilityOption.value}
                value={availabilityOption.value}
              >
                {availabilityOption.label}
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
                  Product Name
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Product Owner
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.map((product) => {
                const isProductSelected = false;
//                const isProductSelected = selectedProducts.includes(product.productID);

                return (
                  <TableRow
                    hover
                    key={product.productID}
                    selected={isProductSelected}
                  >
                    <TableCell>
                        <Link
                          color="textPrimary"
                          component={RouterLink}
                          to="#"
                          underline="none"
                          sx={{ ml: 2 }}
                          variant="subtitle2"
                        >
                          {product.productName}
                        </Link>
                    </TableCell>
                    <TableCell>
                      {getInventoryLabel(product.productStatus)}
                    </TableCell>
                    <TableCell>
                      {product.productDescription}
                    </TableCell>
                    <TableCell>
                      {product.productOwner}
                    </TableCell>
                    <TableCell>
                      {numeral(product.productPrice)
                        .format(`${product.priceCurrency}0,0.00`)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                      <IconButton>
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredProducts.length}
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
  products: PropTypes.array.isRequired
};

export default TemplateListTable;
