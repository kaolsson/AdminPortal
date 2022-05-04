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
import UserIcon from '../../../icons/User';

const ProjectMembers = (props) => {
  const { owner, client, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader
        sx={{ pb: 0 }}
        title="Client"
        titleTypographyProps={{ variant: 'overline' }}
      />
      <CardContent sx={{ pt: 0 }}>
        <List>
          {client.map((member) => (
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
                  </Typography>
                )}
                secondary={(
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    {member.city}
                    {', '}
                    {member.state}
                  </Typography>
                )}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          startIcon={<ChatIcon fontSize="small" />}
          variant="outlined"
          href={['/chat/?cid=', client[0].userName].join('')}
        >
          Send Message
        </Button>
        <Button
          color="primary"
          startIcon={<UserIcon fontSize="small" />}
          variant="outlined"
          href={['/clients/details/?cid=', client[0].customerID].join('')}
        >
          Client Info
        </Button>
      </CardActions>
      <Divider />
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
                  </Typography>
                )}
                secondary={(
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    {member.jobTitle}
                    {', '}
                    {member.city}
                    {', '}
                    {member.state}
                  </Typography>
                )}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          startIcon={<ChatIcon fontSize="small" />}
          variant="outlined"
          href={['/chat/?cid=', owner[0].userName].join('')}
        >
          Send Message
        </Button>
        <Button
          color="primary"
          startIcon={<UserIcon fontSize="small" />}
          variant="outlined"
          href={['/cpas/details/?cid=', owner[0].cpaID].join('')}
        >
          CPA Info
        </Button>
      </CardActions>
    </Card>
  );
};

ProjectMembers.propTypes = {
  owner: PropTypes.array.isRequired,
  client: PropTypes.array.isRequired
};

export default ProjectMembers;
