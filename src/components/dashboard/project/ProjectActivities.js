import PropTypes from 'prop-types';
import { isSameDay } from 'date-fns';
import { Box, Typography } from '@material-ui/core';
import ProjectActivity from './ProjectActivity';

const ProjectActivities = (props) => {
  const { activities, ...other } = props;
  const todoAction = [];
  const doneAction = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const activity of activities) {
    if (isSameDay(activity.createdAt, new Date())) {
      todoAction.push(activity);
    } else {
      doneAction.push(activity);
    }
  }

  return (
    <div {...other}>
      <Typography
        color="textPrimary"
        variant="h6"
      >
        Pending Actions
      </Typography>
      <Box sx={{ mt: 3 }}>
        {todoAction.map((activity) => (
          <ProjectActivity
            createdAt={activity.createdAt}
            description={activity.description}
            key={activity.id}
            status={activity.status}
            type={activity.type}
          />
        ))}
      </Box>
      <Typography
        color="textPrimary"
        sx={{ mt: 3 }}
        variant="h6"
      >
        Completed Actions
      </Typography>
      <Box sx={{ mt: 3 }}>
        {doneAction.map((activity) => (
          <ProjectActivity
            createdAt={activity.createdAt}
            description={activity.description}
            key={activity.id}
            activityStatus={activity.activityStatus}
            type={activity.type}
          />
        ))}
      </Box>
    </div>
  );
};

ProjectActivities.propTypes = {
  activities: PropTypes.array.isRequired
};

export default ProjectActivities;
