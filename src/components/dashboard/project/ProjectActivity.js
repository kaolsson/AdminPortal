// import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { Avatar, Button, Card, Typography } from '@material-ui/core';
import CreditCardIcon from '../../../icons/CreditCard';
import UploadIcon from '../../../icons/Upload';
import PhoneIcon from '../../../icons/Phone';
import InformationCircleIcon from '../../../icons/InformationCircle';

const avatarsMap = {
  upload_file: UploadIcon,
  information: InformationCircleIcon,
  price_change: CreditCardIcon,
  contest_created: PhoneIcon
};

const ProjectActivity = (props) => {
  const { createdAt, description, status, type, ...other } = props;

  const Icon = avatarsMap[type];

  return (
    <Card
      sx={{
        alignItems: 'center',
        display: 'flex',
        p: 2,
        '& + &': {
          mt: 2
        }
      }}
      {...other}
    >
      <Avatar
        sx={{
          backgroundColor: 'primary.main',
          color: 'common.white'
        }}
      >
        <Icon fontSize="small" />
      </Avatar>
      <Typography
        color="textPrimary"
        sx={{ ml: 2 }}
        variant="body2"
      >
        {description}
      </Typography>
      <Typography
        color="textPrimary"
        sx={{ mr: 0 }}
        variant="body2"
      >
        {status}
      </Typography>
      <Typography
        color="textPrimary"
        sx={{ ml: 'auto' }}
        variant="caption"
      >
        {formatDistanceToNowStrict(createdAt)}
        {' '}
        ago
      </Typography>
      <Button
        color="primary"
        sx={{ m: 1 }}
        variant="contained"
      >
        Send Message
      </Button>
    </Card>
  );
};

ProjectActivity.propTypes = {
  createdAt: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default ProjectActivity;
