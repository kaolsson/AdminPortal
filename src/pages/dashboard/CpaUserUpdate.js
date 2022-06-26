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
  CpaAdd,
  CpaAddAccount
} from '../../components/dashboard/cpa';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import { parse } from 'query-string';
import { useDispatch, useSelector } from '../../store';
import { getCpas } from '../../slices/cpa';
import useAuth from '../../hooks/useAuth';

const tabs = [
  { label: 'Profile', value: 'profile' },
  { label: 'Account', value: 'account' }
];

const CpaUserUpdate = () => {
  const { settings } = useSettings();
  const [currentTab, setCurrentTab] = useState('profile');
  const { user } = useAuth();
  const [cpaId] = useState(parse(window.location.search).eId);
  const { cpas } = useSelector((state) => state.cpa);
  const [cpaUser, setCpaUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCpas(user.accountID));
  }, []);

  useEffect(() => {
    setCpaUser(cpas.byId[cpaId]);
  }, [cpas]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!cpaUser) {
    console.log(cpaId);
    return <div> </div>;
  }

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
                Update CPA
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
                  Update
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
            {currentTab === 'profile' && <CpaAdd cpa={cpaUser} add={false} />}
            {currentTab === 'account' && <CpaAddAccount cpa={cpaUser} add={false} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CpaUserUpdate;
