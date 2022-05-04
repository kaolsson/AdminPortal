import { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Typography } from '@material-ui/core';
import { templateApi } from '../../__fakeApi__/templateApi';
import { TemplateListTable } from '../../components/dashboard/template';
import useMounted from '../../hooks/useMounted';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
// import DownloadIcon from '../../icons/Download';
// import UploadIcon from '../../icons/Upload';
import PlusIcon from '../../icons/Plus';
import gtm from '../../lib/gtm';
import useAuth from '../../hooks/useAuth';

const TemplateList = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [templates, setTemplates] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getTemplates = useCallback(async () => {
    try {
      const data = await templateApi.getTemplates(user.accountID);

      if (mounted.current) {
        setTemplates(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getTemplates();
  }, [getTemplates]);
  return (
    <>
      <Helmet>
        <title>Dashboard: Template List | Smartmaster</title>
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
                Template List
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
                  Templates
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
            <TemplateListTable templates={templates} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default TemplateList;
