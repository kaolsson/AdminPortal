import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import {
  CpaAdd
} from '../../components/dashboard/cpa';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import useAuth from '../../hooks/useAuth';

const tabs = [
  { label: 'Profile', value: 'profile' },
];

const CpaUserAdd = () => {
  const { settings } = useSettings();
  const [currentTab, setCurrentTab] = useState('profile');
  const { user } = useAuth();
  const [add] = useState(true);
  const [initialValues] = useState({
    accountID: user.accountID || '',
    title: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    zipCode: '',
    city: '',
    state: '',
    country: '',
    countryCode: '',
    jobTitle: '',
    activeStatus: 'inactive',
    userRole: 'regular',
    note: '',
    submit: null
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>SmartMaster Admin | New Customer</title>
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
                Add CPA
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
                  CPA
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Add New
                </Typography>
              </Breadcrumbs>
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
            {console.log(initialValues)}
            {console.log(currentTab)}
            {currentTab === 'profile' && <CpaAdd cpa={initialValues} add={add} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CpaUserAdd;
