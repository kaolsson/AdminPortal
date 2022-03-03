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
import useAuth from '../../../hooks/useAuth';

const UserDetails = () => {
  const { user } = useAuth();

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
                  {user.title}
                  {' '}
                  {user.firstName}
                  {' '}
                  {user.lastName}
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
                  {user.email}
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
                  {user.phone}
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
                  {user.address1}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {user.city}
                  {', '}
                  {user.state}
                  {', '}
                  {user.country}
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
            variant="text"
            href="/account"
          >
            Update Details
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default UserDetails;
