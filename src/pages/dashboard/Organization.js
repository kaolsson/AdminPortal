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
    OrgGeneralSettings,
    OrgPhoneEmailSettinngs,
    OrgAddressSettinngs,
    OrgFinanceSettinngs
} from '../../components/dashboard/account';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';

const tabs = [
  { label: 'General', value: 'general' },
  { label: 'Phone & Email', value: 'phone' },
  { label: 'Address', value: 'address' },
  { label: 'Finance', value: 'finance' }
];

const Organization = () => {
  const { settings } = useSettings();
  const [currentTab, setCurrentTab] = useState('general');

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>MySmartMaster | Organization</title>
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
                Organization
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
                  Organization
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Account
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
            {currentTab === 'general' && <OrgGeneralSettings />}
            {currentTab === 'phone' && <OrgPhoneEmailSettinngs />}
            {currentTab === 'address' && <OrgAddressSettinngs />}
            {currentTab === 'finance' && <OrgFinanceSettinngs />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Organization;
