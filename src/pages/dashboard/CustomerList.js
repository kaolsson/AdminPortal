import { useState, useEffect, useCallback } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@material-ui/core';
// import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@material-ui/core';
import { customerApi } from '../../__fakeApi__/customerApi';
import { CustomerListTable } from '../../components/dashboard/customer';
import useMounted from '../../hooks/useMounted';
import ChevronRightIcon from '../../icons/ChevronRight';
// import DownloadIcon from '../../icons/Download';
import PlusIcon from '../../icons/Plus';
// import UploadIcon from '../../icons/Upload';
import useSettings from '../../hooks/useSettings';
import gtm from '../../lib/gtm';
import useAuth from '../../hooks/useAuth';
import { Link as RouterLink } from 'react-router-dom';

const CustomerList = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [customers, setCustomers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomers = useCallback(async () => {
    try {
      const data = await customerApi.getCustomers(user.accountID);

      if (mounted.current) {
        setCustomers(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  return (
    <>
      <Helmet>
        <title>Client List | Smartmaster Admin Portal</title>
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
                Client List
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="#"
                  variant="subtitle2"
                >
                  Engagements
                </Link>
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="#"
                  variant="subtitle2"
                >
                  Clients
                </Link>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  to="/clients/new"
                  variant="contained"
                >
                  Add Client
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <CustomerListTable customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
