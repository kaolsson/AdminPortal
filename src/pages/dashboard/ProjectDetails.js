import { useCallback, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { parse } from 'query-string';
// import { formatDistanceToNowStrict } from 'date-fns';
import { Badge, Box, Button, Container, Divider, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import { projectApi } from '../../__fakeApi__/projectApi';
import {
  ProjectActivities2,
  ProjectApplicationModal,
  ProjectOverview,
  ProjectFileList,
  ProjectFileListVendor,
} from '../../components/dashboard/project';
import useMounted from '../../hooks/useMounted';
import useSettings from '../../hooks/useSettings';
// import CalendarIcon from '../../icons/Calendar';
// import CheckIcon from '../../icons/Check';
// import ExclamationIcon from '../../icons/Exclamation';
// import ShareIcon from '../../icons/Share';
import gtm from '../../lib/gtm';
import Label from '../../components/Label';

const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'My Documnets', value: 'mydocuments' },
  { label: 'Documents to Me', value: 'documentstome' },
  { label: 'Actions', value: 'actions' }
];

const getStatusLabel = (actionStatus) => {
  const map = {
    urgent: {
      color: 'error',
      text: 'Urgent Action'
    },
    ongoing: {
      color: 'success',
      text: 'Active'
    },
    noAction: {
        color: 'success',
        text: 'No Action'
      },
      active: {
        color: 'success',
        text: 'Active'
      },
    new: {
        color: 'success',
        text: 'New'
    },
    complete: {
      color: 'success',
      text: 'Completed'
    },
    stopped: {
      color: 'error',
      text: 'Stopped'
    },
    client: {
      color: 'warning',
      text: 'Action Required',
    }
  };

  const { text, color } = map[actionStatus];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const ProjectDetails = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [currentTab, setCurrentTab] = useState('overview');
  const [project, setProject] = useState(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [caseId] = useState(parse(window.location.search).cid);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getProject = useCallback(async () => {
    try {
      console.log(caseId);
      const data = await projectApi.getProject(caseId);

      if (mounted.current) {
        setProject(data.project);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getProject();
  }, [getProject]);

  const handleApplyModalOpen = () => {
    setIsApplicationOpen(true);
  };

  const handleApplyModalClose = () => {
    setIsApplicationOpen(false);
  };

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
                    {getStatusLabel(project.status)}
                  </Typography>
                </Box>
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
                    {getStatusLabel(project.action)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  onClick={handleApplyModalOpen}
                  startIcon={<ChatIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  New Case Inquiry
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
                files={project.clientFiles}
                caseID={project.caseID}
                projectStatus={project.status}
              />
              )}
            {currentTab === 'documentstome'
            && <ProjectFileListVendor files={project.vendorFiles} />}
            {currentTab === 'actions'
            && <ProjectActivities2 caseID={project.caseID} />}
          </Box>
        </Container>
      </Box>
      <ProjectApplicationModal
        authorAvatar={project.owner.avatar}
        authorName={project.owner.name}
        onApply={handleApplyModalClose}
        onClose={handleApplyModalClose}
        open={isApplicationOpen}
      />
    </>
  );
};

export default ProjectDetails;
