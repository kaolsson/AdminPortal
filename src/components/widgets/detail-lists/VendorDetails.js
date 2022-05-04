import { useCallback, useState, useEffect } from 'react';
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
import UsersIcon from '../../../icons/Users';
import useMounted from '../../../hooks/useMounted';
import { vendorApi } from '../../../__fakeApi__/vendorApi';

const VendorDetails = () => {
  const mounted = useMounted();
  const [vendor, setVendor] = useState([]);

  const getVendor = useCallback(async () => {
    try {
      const data = await vendorApi.getVendor();

      if (mounted.current) {
        setVendor(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getVendor();
  }, [getVendor]);

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
                  {vendor.name}
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
                  {vendor.email}
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
                  {vendor.phone}
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
                  {vendor.address1}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.city}
                  {', '}
                  {vendor.state}
                  {', '}
                  {vendor.country}
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
            startIcon={<HomeIcon fontSize="small" />}
            sx={{ mt: 1 }}
            variant="text"
            href="/organization"
          >
            Update Details
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default VendorDetails;
