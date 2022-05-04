import { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Typography } from '@material-ui/core';
import { OrderUpdateForm } from '../../components/dashboard/order';
import useSettings from '../../hooks/useSettings';
import ArrowLeftIcon from '../../icons/ArrowLeft';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import { parse } from 'query-string';
import useAuth from '../../hooks/useAuth';
import useMounted from '../../hooks/useMounted';
import { orderApi } from '../../__fakeApi__/orderApi';

function findArrayElementById(array, id) {
    console.log(array);
    return array.find((element) => (element.id === id));
}

const OrderUpdate = () => {
  const { settings } = useSettings();
  const [orderId] = useState(parse(window.location.search).oid);
  const [order, setOrder] = useState(null);
  const { user } = useAuth();

  const mounted = useMounted();

  const getOrders = useCallback(async () => {
    try {
      const data = await orderApi.getOrders(user.accountID);
      if (mounted.current) {
        console.log(data.orders);
        console.log(orderId);
        const thisOrder = findArrayElementById(data.orders, orderId);
        setOrder(thisOrder);
        console.log(thisOrder);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    if (orderId) {
        getOrders();
    } else {
        const initOrder = {
            orderID: null,
            accountID: user.accountID,
            orderStatus: '',
            paymentStatus: '',
            note: '',
        };
        setOrder(initOrder);
        console.log(initOrder);
    }
  }, [getOrders]);

  if (!order) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Order Update | Smartmaster</title>
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
                Update Order
                {': '}
                {order.id}
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
                  Update Order
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<ArrowLeftIcon fontSize="small" />}
                  sx={{ mt: 1 }}
                  to={['/orders/details/?oid=', order.id].join('')}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <OrderUpdateForm order={order} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OrderUpdate;
