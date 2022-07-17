import { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Typography } from '@material-ui/core';
import { ProjectCreateForm } from '../../components/dashboard/project';
import useSettings from '../../hooks/useSettings';
import ArrowLeftIcon from '../../icons/ArrowLeft';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import { parse } from 'query-string';
import useAuth from '../../hooks/useAuth';
import useMounted from '../../hooks/useMounted';
import { projectApi } from '../../__fakeApi__/projectApi';
import { customerApi } from '../../__fakeApi__/customerApi';

const ProjectCreate = () => {
  const { settings } = useSettings();
  const [projectId] = useState(parse(window.location.search).pid);
  const [project, setProject] = useState(null);
  const { user } = useAuth();
  const [clients, setClients] = useState([]);
  const [cpas, setCpas] = useState([]);

  const mounted = useMounted();

  const getPickLists = useCallback(async () => {
    try {
      const data = await customerApi.getCustomerCpaPickList(user.accountID);

      if (mounted.current) {
        setClients(data.clients);
        setCpas(data.cpas);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    const initClientOptions = [
        {
            value: '',
            label: ''
        }
    ];
    const initCpaOptions = [
        {
            value: '',
            label: ''
        }
    ];
    setClients(initClientOptions);
    setCpas(initCpaOptions);
    getPickLists();
  }, [getPickLists]);

  const getProject = useCallback(async () => {
    try {
      const data = await projectApi.getProject(projectId);
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
    if (projectId) {
        getProject();
    } else {
        const initProject = {
            caseID: '',
            customerID: '',
            accountID: user.accountID,
            cpaID: '',
            status: '',
            title: '',
            description: '',
            caseOutcome: '',
            tags: '',
            location: '',
            action: 'noaction',
            caseType: '',
            createdBy: user.id,
            note: '',
            dateCreated: '',
            dateStarted: '',
            dateUpdated: '',
            dateCompleted: '',
        };
        setProject(initProject);
    }
  }, [getProject]);

  if (!project || !clients) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard: Project Create | Smartmaster</title>
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
                Create/Update Project
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
                  Projects
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Create/Update
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<ArrowLeftIcon fontSize="small" />}
                  sx={{ mt: 1 }}
                  to="/projects/browse"
                  variant="outlined"
                >
                  Back
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <ProjectCreateForm
                project={project}
                clientoptions={clients}
                cpaoptions={cpas}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProjectCreate;
