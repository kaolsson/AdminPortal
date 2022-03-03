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
// import UsersIcon from '../../../icons/Users';
import HomeIcon from '../../../icons/Home';
import useMounted from '../../../hooks/useMounted';
import { vendorApi } from '../../../__fakeApi__/vendorApi';
import useAuth from '../../../hooks/useAuth';

const OrgDetails = () => {
  const mounted = useMounted();
  const [vendor, setVendor] = useState(null);
  const { user } = useAuth();

  const getVendor = useCallback(async () => {
    try {
      const data = await vendorApi.getVendor(user.accountID);

      if (mounted.current) {
        setVendor(data.vendor);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getVendor();
  }, [getVendor]);

  if (!vendor) {
    return null;
  }

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
                  Org Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.organization}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Org Number
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.orgNumber}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.orgDescription}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Admin Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.adminEmail}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Contact Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.orderEmail}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Admin Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.miscEmail}
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
                  {vendor.phoneNumber}
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
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Web Potal
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.webPortal}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Secure Potal
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.securePortal}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                 Logo Url
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.logoUrl}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                 Payment Ref
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {vendor.paymentRef}
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
                  {vendor.dateAdded.substring(0, 10)}
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
            href="/account"
          >
            Update Details
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default OrgDetails;
