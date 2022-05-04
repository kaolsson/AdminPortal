import { useEffect, useState, useCallback } from 'react';
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
  Typography,
  Breadcrumbs
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
// import useAuth from '../../hooks/useAuth';
// import CpaDetails from '../../components/widgets/detail-lists/CpaDetails';
// import OrgDetails from '../../components/widgets/detail-lists/OrgDetails';
// import ActiveProjectDashboard from '../../components/widgets/grouped-lists/ActiveProjectDashboard';
// import NotPaidOrderDashboard from '../../components/widgets/grouped-lists/NotPaidOrderDashboard';
import WidgetPreviewer from '../../components/WidgetPreviewer';
import TemplateDetailsWidget from '../../components/widgets/detail-lists/TemplateDetailsWidget';
import ProductDetailsWidget from '../../components/widgets/detail-lists/ProductDetailsWidget';
import { parse } from 'query-string';
import useMounted from '../../hooks/useMounted';
import { templateApi } from '../../__fakeApi__/templateApi';
import ChevronRightIcon from '../../icons/ChevronRight';

const TemplateDetails = () => {
  const { settings } = useSettings();
  const [template, setTemplate] = useState(null);
  const [templateId] = useState(parse(window.location.search).tid);

  const mounted = useMounted();

  const getTemplate = useCallback(async () => {
    try {
      const data = await templateApi.getTemplate(templateId);
      if (mounted.current) {
        setTemplate(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    if (templateId) {
        getTemplate();
    }
  }, [getTemplate]);

  if (!template) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>MySmartMaster | Template Details</title>
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
                  color="textPrimary"
                  variant="h5"
                >
                  Template
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
                  Details
                </Typography>
                </Breadcrumbs>
              </Grid>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <WidgetPreviewer
                element={<TemplateDetailsWidget template={template} />}
                name="Template Info"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <WidgetPreviewer
                element={<ProductDetailsWidget template={template} />}
                name="Product"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default TemplateDetails;
