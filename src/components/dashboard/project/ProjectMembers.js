import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core';
import getInitials from '../../../utils/getInitials';
import ChatIcon from '@material-ui/icons/Chat';

const ProjectMembers = (props) => {
  const { owner, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader
        sx={{ pb: 0 }}
        title="Case Owner"
        titleTypographyProps={{ variant: 'overline' }}
      />
      <CardContent sx={{ pt: 0 }}>
        <List>
          {owner.map((member) => (
            <ListItem
              disableGutters
              key={member.id}
            >
              <ListItemAvatar>
                <Avatar src={member.avatar}>
                  {getInitials(member.name)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={(
                  <Typography
                    color="textPrimary"
                    variant="subtitle2"
                  >
                    {member.firstName}
                    {' '}
                    {member.lastName}
                    {',   Phone: '}
                    {member.phoneNumber}
                  </Typography>
                )}
                secondary={(
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    {member.jobTitle}
                  </Typography>
                )}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          startIcon={<ChatIcon fontSize="small" />}
          fullWidth
          variant="text"
        >
          Send Message
        </Button>
      </CardActions>
    </Card>
  );
};

ProjectMembers.propTypes = {
  owner: PropTypes.array.isRequired
};

export default ProjectMembers;
