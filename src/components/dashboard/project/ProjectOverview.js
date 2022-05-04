import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
// import ProjectBrief from './ProjectBrief';
import ProjectMembers from './ProjectMembers';
import ProjectDetailsWidget from '../../widgets/detail-lists/ProjectDetailsWidget';
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
        <ProjectDetailsWidget project={project} />
      </Grid>
      <Grid
        item
        lg={4}
        xl={3}
        xs={12}
      >
        <ProjectMembers
          owner={project.owner}
          client={project.client}
        />
      </Grid>
    </Grid>
  );
};

ProjectOverview.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectOverview;
