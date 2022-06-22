import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { format } from 'date-fns';
// import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
//  Checkbox,
  Divider,
//  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
// import ArrowRightIcon from '../../../icons/ArrowRight';
// import PencilAltIcon from '../../../icons/PencilAlt';
import Label from '../../Label';
// import MoreMenu from '../../MoreMenu';
import Scrollbar from '../../Scrollbar';
// import OrderListBulkActions from './OrderListBulkActions';
import { Link as RouterLink } from 'react-router-dom';
import getInitials from '../../../utils/getInitials';

const getStatusLabel = (cpaStatus) => {
  const map = {
    inactive: {
      color: 'error',
      text: 'InActive'
    },
    active: {
      color: 'success',
      text: 'Active'
    },
    admin: {
        color: 'success',
        text: 'Active'
      }
    };

  const { text, color } = map[cpaStatus];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const getRoleLabel = (cpaRole) => {
    const map = {
      cpa: {
        color: 'primary',
        text: 'CPA'
      },
      admin: {
        color: 'success',
        text: 'Admin'
      },
      staff: {
          color: 'error',
          text: 'Staff'
        }
      };

    const { text, color } = map[cpaRole];

    return (
      <Label color={color}>
        {text}
      </Label>
    );
  };

// const applyPagination = (orders, page, limit) => orders
//   .slice(page * limit, page * limit + limit);

const CpaListTable = (props) => {
  const { cpas, ...other } = props;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  return (
    <>
      <Card {...other}>
        <CardHeader
          title="CPA List"
        />
        <Divider />
        <Scrollbar>
          <Box sx={{ minWidth: 1150 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    CPA Name
                  </TableCell>
                  <TableCell>
                    Role
                  </TableCell>
                  <TableCell>
                    Contact Details
                  </TableCell>
                  <TableCell>
                    Address
                  </TableCell>
                  <TableCell>
                    Location
                  </TableCell>
                  <TableCell align="right">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cpas.allIds.map((cpaId) => {
                  const cpa = cpas.byId[cpaId];
                  return (
                    <TableRow
                      hover
                      key={cpaId}
                      style={{ textDecoration: 'none' }}
                      component={RouterLink}
                      to={['/cpas/details/?cid=', cpa.id].join('')}
                    >
                      <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Avatar
                          src={cpa.avatar}
                          sx={{
                            height: 42,
                            width: 42
                          }}
                        >
                          {getInitials(`${cpa.firstName}, ${cpa.lastName}`)}
                        </Avatar>
                        <Box sx={{ ml: 1 }}>
                          <Link
                            color="inherit"
                            component={RouterLink}
                            to="/dashboard/customers/1"
                            variant="subtitle2"
                          >
                            {cpa.firstName}
                            {' '}
                            {cpa.lastName}
                          </Link>
                          <Typography
                            color="textPrimary"
                            variant="subtitle2"
                          >
                            {cpa.userName}
                          </Typography>
                        </Box>
                      </Box>
                      </TableCell>
                      <TableCell>
                        {getRoleLabel(cpa.userRole)}
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                          {cpa.phoneNumber}
                        </Typography>
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                        {cpa.emailAddress}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                            {cpa.address1}
                        </Typography>
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                            {cpa.address2}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                            {cpa.city}
                        </Typography>
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                            {cpa.state}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {getStatusLabel(cpa.activeStatus)}
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
          count={cpas.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

CpaListTable.propTypes = {
  cpas: PropTypes.array.isRequired
};

export default CpaListTable;
