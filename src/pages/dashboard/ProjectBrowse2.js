import { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  // Link,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import { ProjectListTable } from '../../components/dashboard/project';
import useSettings from '../../hooks/useSettings';
import useMounted from '../../hooks/useMounted';
import ChevronRightIcon from '../../icons/ChevronRight';
import PlusIcon from '../../icons/Plus';
import gtm from '../../lib/gtm';
import { projectApi } from '../../__fakeApi__/projectApi';
// import useAuth from '../../hooks/useAuth';

const tabs = [
  { label: 'My Cases', value: 'cpa' },
  { label: 'Org Cases', value: 'account' },
];

const ProjectBrowse2 = () => {
//  const { user } = useAuth();
  const mounted = useMounted();
  const { settings } = useSettings();
  const [currentTab, setCurrentTab] = useState('cpa');
  const [cpaProjects, setCpaProjects] = useState([]);
  const [acccountProjects, setAccountProjects] = useState([]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getProjects = useCallback(async () => {
    try {
      const data = await projectApi.getProjects();

      if (mounted.current) {
        setCpaProjects(data.projects.cpa);
        setAccountProjects(data.projects.account);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <>
      <Helmet>
        <title>MySmartMaster | Cases</title>
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
                Cases
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
                  Cases
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
                  to="/projects/new"
                  variant="contained"
                >
                  Create Work Case
                </Button>
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
          <Box sx={{ mt: 6 }}>
            {currentTab === 'cpa' && <ProjectListTable projects={cpaProjects} />}
            {currentTab === 'account' && <ProjectListTable projects={acccountProjects} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProjectBrowse2;
