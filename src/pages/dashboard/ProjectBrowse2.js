import { useCallback, useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  // Link,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import {
  ProjectBrowseResults
} from '../../components/dashboard/project';
import useSettings from '../../hooks/useSettings';
import useMounted from '../../hooks/useMounted';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import { projectApi } from '../../__fakeApi__/projectApi';
import useAuth from '../../hooks/useAuth';

const tabs = [
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

const ProjectBrowse2 = () => {
  const { user } = useAuth();
  const mounted = useMounted();
  const { settings } = useSettings();
  const [currentTab, setCurrentTab] = useState('active');
  const [activeProjects, setActiveProjects] = useState([]);
  const [completeProjects, setCompleteProjects] = useState([]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getProjects = useCallback(async () => {
    try {
      const data = await projectApi.getProjects(user.customerID);

      if (mounted.current) {
        setActiveProjects(data.projects.active);
        setCompleteProjects(data.projects.complete);
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
                  Engagement
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Cases
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
          <Box sx={{ mt: 6 }}>
            {currentTab === 'active' && <ProjectBrowseResults projects={activeProjects} />}
            {currentTab === 'completed' && <ProjectBrowseResults projects={completeProjects} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProjectBrowse2;
