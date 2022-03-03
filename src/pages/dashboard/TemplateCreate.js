import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Typography } from '@material-ui/core';
import { TemplateCreateForm } from '../../components/dashboard/template';
import useSettings from '../../hooks/useSettings';
import ArrowLeftIcon from '../../icons/ArrowLeft';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';

const TemplateCreate = () => {
  const { settings } = useSettings();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard: Template Create | Smartmaster</title>
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
                Create a new Template
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
                  Order Templates
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Create Template
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
                  to="/templates/browse"
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <TemplateCreateForm />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default TemplateCreate;
