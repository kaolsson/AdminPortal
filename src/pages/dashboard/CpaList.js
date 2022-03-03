import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Typography } from '@material-ui/core';
import { CpaListTable } from '../../components/dashboard/cpa';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import PlusIcon from '../../icons/Plus';
import gtm from '../../lib/gtm';
import useAuth from '../../hooks/useAuth';
import { getCpas } from '../../slices/cpa';
import { useDispatch, useSelector } from '../../store';

const CpaList = () => {
  const { settings } = useSettings();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { cpas } = useSelector((state) => state.cpa);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    dispatch(getCpas(user.cpaID));
  }, []);

  return (
    <>
      <Helmet>
        <title>MySmartMaster | Cpas</title>
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
                CPA Users for Account
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
                  Account
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  All CPA Users
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                  href="/toBedone"
                >
                  Add New CPA User
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <CpaListTable cpas={cpas} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CpaList;
