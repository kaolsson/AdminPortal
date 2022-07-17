import PropTypes from 'prop-types';
import { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { parse } from 'query-string';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import { customerApi } from '../../__fakeApi__/customerApi';
import {
  CustomerContactDetails,
  CustomerDataManagement,
  CustomerOrders,
//  CustomerCases,
  CustomerInvoicesSummary,
  CustomerNotes
} from '../../components/dashboard/customer';
import { ProjectListTable } from '../../components/dashboard/project';
import useMounted from '../../hooks/useMounted';
import ChevronRightIcon from '../../icons/ChevronRight';
// import PencilAltIcon from '../../icons/PencilAlt';
import ArrowLeftIcon from '../../icons/ArrowLeft';
import gtm from '../../lib/gtm';
import useSettings from '../../hooks/useSettings';
import PlusIcon from '../../icons/Plus';

const tabs = [
  { label: 'Details', value: 'details' },
//  { label: 'Orders', value: 'orders' },
  { label: 'Cases', value: 'cases' },
  { label: 'Notes', value: 'notes' }
];

const ActionButton = (props) => {
    const { tab } = props;
    if (tab === 'orders') {
        return (
            <Button
                color="primary"
                component={RouterLink}
                startIcon={<ArrowLeftIcon fontSize="small" />}
                sx={{ m: 1 }}
                to="/templates/browse"
                variant="contained"
            >
                Select Order Template to Send
            </Button>
        );
    }
    if (tab === 'cases') {
        return (
            <Button
                color="primary"
                component={RouterLink}
                startIcon={<PlusIcon fontSize="small" />}
                sx={{ m: 1 }}
                to="/projects/new"
                variant="contained"
            >
                Add Case
            </Button>
        );
    }
    return (
        <Button
            color="primary"
            component={RouterLink}
            startIcon={<ArrowLeftIcon fontSize="small" />}
            sx={{ m: 1 }}
            to="/clients/browse"
            variant="outlined"
        >
            Back
        </Button>
    );
};

const CustomerDetails = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [customer, setCustomer] = useState(null);
  const [cases, setCases] = useState([]);
  const [currentTab, setCurrentTab] = useState('details');
  const [customerId] = useState(parse(window.location.search).cid);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      const data = await customerApi.getCustomer(customerId);

      if (mounted.current) {
        setCustomer(data.user);
        setCases(data.cases);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!customer) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard: Customer Details | Material Kit Pro</title>
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
                {customer.title}
                {' '}
                {customer.firstName}
                {' '}
                {customer.middleInitial}
                {' '}
                {customer.lastName}
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/clients/browse"
                  variant="subtitle2"
                >
                  Engagements
                </Link>
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/clients/browse"
                  variant="subtitle2"
                >
                  Clients
                </Link>
                <Link
                  color="textSecondary"
                  component={RouterLink}
                  to="#"
                  variant="subtitle2"
                >
                  Details
                </Link>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <ActionButton tab={currentTab} />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'details' && (
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  lg={settings.compact ? 6 : 4}
                  md={6}
                  xl={settings.compact ? 6 : 3}
                  xs={12}
                >
                  <CustomerContactDetails
                    customer={customer}
                    isVerified={customer.emailVerified === 'yes' ? 1 : 0}
                  />
                </Grid>
                <Grid
                  item
                  lg={settings.compact ? 6 : 4}
                  md={6}
                  xl={settings.compact ? 6 : 3}
                  xs={12}
                >
                  <CustomerInvoicesSummary />
                </Grid>
                <Grid
                  item
                  lg={settings.compact ? 6 : 4}
                  md={6}
                  xl={settings.compact ? 6 : 3}
                  xs={12}
                >
                  <CustomerDataManagement
                    customerID={customerId}
                    clientStatus={customer.status}
                  />
                </Grid>
              </Grid>
            )}
            {currentTab === 'orders' && <CustomerOrders orders={customer.orders} />}
            {currentTab === 'cases' && <ProjectListTable projects={cases} />}
            {currentTab === 'notes' && <CustomerNotes customer={customer} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

ActionButton.propTypes = {
    tab: PropTypes.string.isRequired
  };

export default CustomerDetails;
