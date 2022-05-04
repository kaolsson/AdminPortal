import { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Typography } from '@material-ui/core';
import { ProductCreateForm } from '../../components/dashboard/product';
import useSettings from '../../hooks/useSettings';
import ArrowLeftIcon from '../../icons/ArrowLeft';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import { parse } from 'query-string';
import useAuth from '../../hooks/useAuth';
import useMounted from '../../hooks/useMounted';
import { productApi } from '../../__fakeApi__/productApi';

function findArrayElementById(array, id) {
    return array.find((element) => (element.productID === id));
}

const ProductCreate = () => {
  const { settings } = useSettings();
  const [prodcutId] = useState(parse(window.location.search).pid);
  const [product, setProduct] = useState(null);
  const { user } = useAuth();

  const mounted = useMounted();

  const getProducts = useCallback(async () => {
    try {
      const data = await productApi.getProducts(user.accountID);
      if (mounted.current) {
        const thisProduct = findArrayElementById(data, prodcutId);
        setProduct(thisProduct);
        console.log(thisProduct);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    if (prodcutId) {
        getProducts();
    } else {
        const initProduct = {
            productID: null,
            accountID: user.accountID,
            productStatus: '',
            productCategory: '',
            productDescription: '',
            productName: '',
            productPrice: '',
            productQuantity: '',
            productSubCategory: '',
            productOwner: user.id,
            note: '',
            dateAdded: '',
            dateUpdated: ''
        };
        setProduct(initProduct);
        console.log(initProduct);
    }
  }, [getProducts]);

  if (!product) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard: Product Create | Material Kit Pro</title>
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
                Create/Update Product
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
                  Products
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Products
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Create/Update
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
                  to="/products/browse"
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <ProductCreateForm product={product} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductCreate;
