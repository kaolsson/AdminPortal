import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Container, Grid, Typography } from '@material-ui/core';
import { SignupListTable } from '../../components/dashboard/signup';
import ChevronRightIcon from '../../icons/ChevronRight';
import useSettings from '../../hooks/useSettings';
import gtm from '../../lib/gtm';
import useAuth from '../../hooks/useAuth';
import { getSignups } from '../../slices/signup';
import { useDispatch, useSelector } from '../../store';

const SignupList = () => {
  const { settings } = useSettings();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { signups } = useSelector((state) => state.signup);

  useEffect(() => {
    dispatch(getSignups(user.accountID));
  }, []);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>SignUp List | Smartmaster Admin Portal</title>
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
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Sign Up List
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Prospects
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  SignUp
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  List
                </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <SignupListTable signups={signups.array} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SignupList;
