import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
//  Avatar,
  Box,
//  Button,
  Card,
//  CardActions,
  CardContent,
//  CardHeader,
  Container,
  CardMedia,
  Grid,
  Divider,
  Typography
} from '@material-ui/core';
import useSettings from '../../hooks/useSettings';
// import ArrowRightIcon from '../../icons/ArrowRight';
// import BriefcaseIcon from '../../icons/Briefcase';
// import DownloadIcon from '../../icons/Download';
// import ExternalLinkIcon from '../../icons/ExternalLink';
// import InformationCircleIcon from '../../icons/InformationCircle';
// import PlusIcon from '../../icons/Plus';
// import UsersIcon from '../../icons/Users';
import gtm from '../../lib/gtm';
import useAuth from '../../hooks/useAuth';
// import CpaDetails from '../../components/widgets/detail-lists/CpaDetails';
import OrgDetails from '../../components/widgets/detail-lists/OrgDetails';
// import ActiveProjectDashboard from '../../components/widgets/grouped-lists/ActiveProjectDashboard';
// import NotPaidOrderDashboard from '../../components/widgets/grouped-lists/NotPaidOrderDashboard';
import WidgetPreviewer from '../../components/WidgetPreviewer';
import useMounted from '../../hooks/useMounted';
import { vendorApi } from '../../__fakeApi__/vendorApi';

const OverviewOrg = () => {
    const { settings } = useSettings();
    const mounted = useMounted();
    const [vendor, setVendor] = useState(null);
    const { user } = useAuth();
    const [logo, setLogo] = useState(null);

    const getVendor = useCallback(async () => {
      try {
        const data = await vendorApi.getVendor(user.accountID);

        if (mounted.current) {
          setVendor(data.vendor);
          setLogo(data.logo);
        }
      } catch (err) {
        console.error(err);
      }
    }, [mounted]);

    useEffect(() => {
      getVendor();
    }, [getVendor]);

    useEffect(() => {
        gtm.push({ event: 'page_view' });
      }, []);

  if (!vendor) {
      return null;
  }

  return (
    <>
      <Helmet>
        <title>MySmartMaster | Overview Org</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              alignItems="center"
              container
              justifyContent="space-between"
              spacing={3}
              item
              xs={12}
            >
              <Grid item>
                <Typography
                  color="textSecondary"
                  variant="overline"
                >
                  Organization
                </Typography>
                <Typography
                  color="textPrimary"
                  variant="h5"
                >
                  {vendor.organization}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
            >
        <Card>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                p: 2
              }}
            >

              <CardMedia
                component="img"
                image={logo}
                alt="green iguana"
              />
            </Box>
          <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                sx={{ mt: 1 }}
                variant="subtitle2"
              >
                {' '}
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                alignItems: 'left',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left'
              }}
            >
              <Typography
                color="textPrimary"
                sx={{ mt: 1 }}
                variant="subtitle2"
              >
                {' '}
              </Typography>
                  <table>
                    <tr>
                        <td>Org No:</td>
                        <td>{vendor.orgNumber}</td>
                    </tr>
                    <tr>
                        <td>Created:</td>
                        <td>{vendor.dateAdded.substring(0, 10)}</td>
                    </tr>
                  </table>
            </Box>
          </CardContent>
        </Card>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <WidgetPreviewer
                element={<OrgDetails vendor={vendor} />}
                name="Account Details"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default OverviewOrg;
