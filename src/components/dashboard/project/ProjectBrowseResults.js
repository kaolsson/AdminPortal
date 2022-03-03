import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@material-ui/core';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ProjectCard from './ProjectCard';

const ProjectBrowseResults = (props) => {
  const { projects, ...other } = props;
  const [mode, setMode] = useState('grid');

  const handleModeChange = (event, value) => {
    setMode(value);
  };

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          mb: 2
        }}
      >
        <Typography
          color="textPrimary"
          sx={{
            position: 'relative',
            '&:after': {
              backgroundColor: 'primary.main',
              bottom: '-8px',
              content: '" "',
              height: '3px',
              left: 0,
              position: 'absolute',
              width: '48px'
            }
          }}
          variant="h5"
        >
          Showing
          {' '}
          {projects.length}
          {' '}
          Cases
        </Typography>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <ToggleButtonGroup
            exclusive
            onChange={handleModeChange}
            size="small"
            value={mode}
          >
            <ToggleButton value="grid">
              <ViewModuleIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Grid
        container
        spacing={3}
      >
        {projects.map((project) => (
          <Grid
            item
            key={project.caseID}
            md={mode === 'grid' ? 4 : 12}
            sm={mode === 'grid' ? 6 : 12}
            xs={12}
          >
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 6
        }}
      >
        <Pagination count={1} />
      </Box>
    </div>
  );
};

ProjectBrowseResults.propTypes = {
  projects: PropTypes.array.isRequired
};

export default ProjectBrowseResults;
