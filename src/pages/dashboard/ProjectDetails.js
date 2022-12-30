import { useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { parse } from 'query-string';
import { Badge, Box, Button, Container, Divider, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import BriefcaseIcon from '../../icons/Briefcase';
import { projectApi } from '../../__fakeApi__/projectApi';
import {
  ProjectActivities2,
  ProjectOverview,
  ProjectFileList,
  ProjectFileListVendor,
} from '../../components/dashboard/project';
import useMounted from '../../hooks/useMounted';
import useSettings from '../../hooks/useSettings';
import gtm from '../../lib/gtm';
import Label from '../../components/Label';
import { Link as RouterLink } from 'react-router-dom';

const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Documents To Client', value: 'mydocuments' },
  { label: 'Documents From Client', value: 'documentstome' },
  { label: 'Actions', value: 'actions' }
];

const getCpaStatusLabel = (count1, count2) => {
  let myText = '';
  let myColor = '';
  if (count1 > 0) {
    myText = 'cpa';
    myColor = 'error';
  } else if (count1 === 0 && count2 === 0) {
        myText = 'No Action';
        myColor = 'success';
  } else {
    return (
        <></>
    );
  }

  return (
    <Label color={myColor}>
      {myText}
    </Label>
  );
};

const getClientStatusLabel = (count1, count2) => {
    let myText = '';
    let myColor = '';
    if (count2 > 0) {
      myText = 'client';
      myColor = 'warning';
    } else {
        return (
            <></>
        );
    }

    return (
      <Label color={myColor}>
        {myText}
      </Label>
    );
};

const ProjectDetails = () => {
  const { settings } = useSettings();
  const [currentTab, setCurrentTab] = useState('overview');
  const [project, setProject] = useState(null);
  const [caseId] = useState(parse(window.location.search).cid);

  const mounted = useMounted();

  const getProject = useCallback(async () => {
    try {
      const data = await projectApi.getProject(caseId);

      if (mounted.current) {
        setProject(data.project);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    if (caseId) {
        getProject();
    }
  }, [getProject]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!project) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard: Case Details | MySmartMaster</title>
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
                {project.title}
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  color: 'text.secondary',
                  display: 'flex',
                  flexWrap: 'wrap',
                  mb: -2,
                  mx: -2
                }}
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    m: 2
                  }}
                >
                  <Typography
                    color="inherit"
                    sx={{ ml: 1 }}
                    variant="subtitle2"
                  >
                    {getCpaStatusLabel(project.actionCountCpa, project.actionCountClient)}
                  </Typography>
                  <Typography
                    color="inherit"
                    sx={{ ml: 1 }}
                    variant="subtitle2"
                  >
                    {getClientStatusLabel(project.actionCountCpa, project.actionCountClient)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  startIcon={<BriefcaseIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                  component={RouterLink}
                  to={['/project/details/?pid=', project.caseID].join('')}
                >
                  Update Case
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
                  value={tab.value}
                  // eslint-disable-next-line
                  label={<Badge badgeContent={tab.messageCount} color="warning"> {tab.label} </Badge>}
                />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'overview'
            && <ProjectOverview project={project} />}
            {currentTab === 'mydocuments'
            && (
              <ProjectFileList
                files={project.vendorFiles}
                caseID={project.caseID}
                projectStatus={project.status}
              />
              )}
            {currentTab === 'documentstome'
            && <ProjectFileListVendor files={project.clientFiles} />}
            {currentTab === 'actions'
            && <ProjectActivities2 caseID={project.caseID} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProjectDetails;
