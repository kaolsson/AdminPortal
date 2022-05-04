import { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Typography } from '@material-ui/core';
// import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@material-ui/core';
import { orderApi } from '../../__fakeApi__/orderApi';
import { OrderListTable } from '../../components/dashboard/order';
import useMounted from '../../hooks/useMounted';
import ChevronRightIcon from '../../icons/ChevronRight';
// import DownloadIcon from '../../icons/Download';
import PlusIcon from '../../icons/Plus';
// import UploadIcon from '../../icons/Upload';
import useSettings from '../../hooks/useSettings';
import gtm from '../../lib/gtm';
import useAuth from '../../hooks/useAuth';

const OrderList = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getOrders = useCallback(async () => {
    try {
      const data = await orderApi.getOrders(user.accountID);

      if (mounted.current) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      <Helmet>
        <title>Order List | Smartmaster Admin Portal</title>
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
                Order List
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
                  Engagements
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Orders
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  List
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  to="/templates/new"
                  variant="contained"
                >
                  Create Order Template
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <OrderListTable orders={orders} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OrderList;
