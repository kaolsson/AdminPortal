// import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { format } from 'date-fns';
// import numeral from 'numeral';
import {
  Avatar,
  Box,
  Card,
  // CardMedia,
  Divider,
  Grid,
  // IconButton,
  // Link,
  // Rating,
  // Tooltip,
  CardHeader,
  Button,
  Typography
} from '@material-ui/core';
// import red from '@material-ui/core/colors/red';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import BriefcaseIcon from '../../../icons/Briefcase';
import ArrowRightIcon from '../../../icons/ArrowRight';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import ChatAlt from '../../../icons/ChatAlt';
import getInitials from '../../../utils/getInitials';
import Label from '../../Label';
// import useCid from '../../../hooks/useCid';
import { Link as RouterLink } from 'react-router-dom';

const getStatusLabel = (actionStatus) => {
  const map = {
    canceled: {
      color: 'error',
      text: 'Canceled'
    },
    noAction: {
      color: 'success',
      text: 'No Client Action'
    },
    client: {
      color: 'warning',
      text: 'Action Required'
    },
    rejected: {
      color: 'error',
      text: 'Rejected'
    },
    closed: {
      color: 'invisible',
      text: 'completed'
    }
  };

  const { text, color } = map[actionStatus];

  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const ProjectCard = (props) => {
  const { project, ...other } = props;

  // const [isLiked, setIsLiked] = useState(project.isLiked);
  // const [likes, setLikes] = useState(project.likes);

  // const handleLike = () => {
  //  setIsLiked(true);
  //  setLikes((prevLikes) => prevLikes + 1);
  // };

  // const handleUnlike = () => {
  //   setIsLiked(false);
  //  setLikes((prevLikes) => prevLikes - 1);
  // };

//  const baseLInk = '/projects/details/?cid=1';
//  const myLink = `${baseLInk}${project.caseID}`;

//  const handleGoToDetails = () => {
//    const myLink3 = ['/projects/details/?cid=', project.caseID].join('');
//    window.location.href = myLink3;
//  };

  return (
    <Card {...other}>
      <CardHeader
        disableTypography
        title={(
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              pb: 2
            }}
          >
            <BriefcaseIcon color="primary" />
            <Typography
              color="textPrimary"
              sx={{ pl: 1 }}
              variant="h6"
            >
              {project.title}
            </Typography>
          </Box>
        )}
        sx={{ pb: 0 }}
      />
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            mt: 0
          }}
        >
          <Avatar
            alt="Author"
            src={project.owner.avatar}
          >
            {getInitials(project.owner.firstName)}
          </Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Case Owner
              {' '}
              {project.owner.firstName}
              {' '}
              {project.owner.lastName}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          pb: 2,
          px: 3
        }}
      >
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {project.description}
        </Typography>
      </Box>
      <Box
        sx={{
          px: 3,
          py: 2
        }}
      >
        <Grid
          alignItems="center"
          container
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              {project.status}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Status
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              {project.location}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Location
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              {project.caseType}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Type
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pl: 2,
          pr: 3,
          py: 2
        }}
        style={{ textDecoration: 'none' }}
        hover
        component={RouterLink}
        to={['/projects/details/?cid=', project.caseID].join('')}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Button
            color="primary"
            variant="text"
            component={RouterLink}
            to={['/projects/details/?cid=', project.caseID].join('')}
            startIcon={<ArrowRightIcon fontSize="small" />}
          >
            Go to Case
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {getStatusLabel(project.action)}
      </Box>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectCard;
