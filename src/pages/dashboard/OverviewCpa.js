import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Avatar,
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
// import OrgDetails from '../../components/widgets/detail-lists/OrgDetails';
// import ActiveProjectDashboard from '../../components/widgets/grouped-lists/ActiveProjectDashboard';
// import NotPaidOrderDashboard from '../../components/widgets/grouped-lists/NotPaidOrderDashboard';
import WidgetPreviewer from '../../components/WidgetPreviewer';
import useMounted from '../../hooks/useMounted';
import { authApi } from '../../__fakeApi__/authApi';

const Overview = () => {
  const { settings } = useSettings();
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const mounted = useMounted();

  const getAvatar = useCallback(async () => {
    try {
        const data = await authApi.getAvatar();
        if (mounted.current) {
            setAvatar(data);
        }
    } catch (err) {
        console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getAvatar();
  }, [getAvatar]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>SmartMaster Admin | My Profile</title>
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
                  My Profile
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
              md={3}
              xs={12}
            >
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center'
              }}
            >
              <Box
                sx={{
                  p: 1,
                  border: (theme) => `1px dashed ${theme.palette.divider}`,
                  borderRadius: '50%'
                }}
              >
                <Avatar
                  src={avatar}
                  sx={{
                    height: 200,
                    width: 200
                  }}
                />
              </Box>
              <Typography
                color="textPrimary"
                sx={{ mt: 1 }}
                variant="subtitle2"
              >
                {user.firstName}
                {' '}
                {user.lastName}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {user.city}
                {', '}
                {user.state}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {'User Level: '}
                {user.userRole.toUpperCase()}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth
              variant="text"
            >
                {
                    // Upload Picture
                }
            </Button>
          </CardActions>
        </Card>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <WidgetPreviewer
                element={<CpaDetails />}
                name="Profile Details"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Overview;
