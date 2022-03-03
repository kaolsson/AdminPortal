import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import ProjectBrief from './ProjectBrief';
import ProjectMembers from './ProjectMembers';
// import ProjectMetadata from './ProjectMetadata';

const ProjectOverview = (props) => {
  const { project, ...other } = props;

  return (
    <Grid
      container
      spacing={3}
      {...other}
    >
      <Grid
        item
        lg={8}
        xl={9}
        xs={12}
      >
        <ProjectBrief
          title={project.title}
          description={project.description}
          tags={project.tags}
        />
      </Grid>
      <Grid
        item
        lg={4}
        xl={3}
        xs={12}
      >
        <ProjectMembers owner={project.owner} />
      </Grid>
    </Grid>
  );
};

ProjectOverview.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectOverview;
