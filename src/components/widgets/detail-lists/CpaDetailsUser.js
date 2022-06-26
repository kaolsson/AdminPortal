import {
  Box,
  Button,
  Card,
  // CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core';
// import Label from '../../Label';
// import LockIcon from '../../../icons/Lock';
import UserIcon from '../../../icons/User';
import BanIcon from '../../../icons/Ban';
// import useAuth from '../../../hooks/useAuth';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

const CpaDetailsUser = (props) => {
    const { cpaUser } = props;

  return (
    <Box
      sx={{
        backgroundColor: 'background.widget',
        minHeight: '100%',
        p: 3
      }}
    >
      <Card>
        <Divider />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {cpaUser.title}
                  {' '}
                  {cpaUser.firstName}
                  {' '}
                  {cpaUser.lastName}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Job Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {cpaUser.jobTitle}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  User Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {cpaUser.userName}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {cpaUser.emailAddress}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Phone
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {cpaUser.phoneNumber}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Address
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {cpaUser.address1}
                  {', '}
                  {cpaUser.address2}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {cpaUser.city}
                  {', '}
                  {cpaUser.state}
                  {', '}
                  {cpaUser.country}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Active Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {cpaUser.activeStatus.toUpperCase()}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  User Level
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {cpaUser.userRole.toUpperCase()}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Date Created
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {cpaUser.createDate.substring(0, 10)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Date Last Login
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {cpaUser.lastLogin.substring(0, 10)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  NOTE
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {cpaUser.note}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Org UUID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {cpaUser.accountID}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  CPA UUID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {cpaUser.id}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            p: 1
          }}
        >
          <Button
            color="inherit"
            startIcon={<UserIcon fontSize="small" />}
            sx={{ mt: 1 }}
            variant="outlined"
            component={RouterLink}
            to={['/cpa/update/?eId=', cpaUser.id].join('')}
          >
            Update Details
          </Button>
        </Box>
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            p: 1
          }}
        >
          <Button
            color="error"
            startIcon={<BanIcon fontSize="small" />}
            sx={{ mt: 1 }}
            variant="contained"
            component={RouterLink}
            to={['/cpa/update/?eId=', cpaUser.id].join('')}
          >
            Delete User
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

CpaDetailsUser.propTypes = {
    cpaUser: PropTypes.object.isRequired
  };

export default CpaDetailsUser;
