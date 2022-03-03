import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
//  Button,
//  Card,
//  CardActions,
//  CardContent,
//  CardHeader,
  Container,
  Grid,
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
import CpaDetails from '../../components/widgets/detail-lists/CpaDetails';
import OrgDetails from '../../components/widgets/detail-lists/OrgDetails';
// import ActiveProjectDashboard from '../../components/widgets/grouped-lists/ActiveProjectDashboard';
// import NotPaidOrderDashboard from '../../components/widgets/grouped-lists/NotPaidOrderDashboard';
import WidgetPreviewer from '../../components/WidgetPreviewer';

const Overview = () => {
  const { settings } = useSettings();
  const { user } = useAuth();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>MySmartMaster | Overview</title>
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
                  Dashboard
                </Typography>
                <Typography
                  color="textPrimary"
                  variant="h5"
                >
                  {user.firstName}
                  {' ' }
                  {user.lastName}
                  {', '}
                  {user.userRole.toUpperCase()}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Last login
                  {': '}
                  {user.lastLogin.substring(0, 10)}
                  {' at '}
                  {user.lastLogin.substring(11, 16)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <WidgetPreviewer
                element={<CpaDetails />}
                name="My Account"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <WidgetPreviewer
                element={<OrgDetails />}
                name="Organization Account"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Overview;
