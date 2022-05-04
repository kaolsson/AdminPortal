// import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  AvatarGroup,
  Box,
//  IconButton,
//  ListItemIcon,
//  ListItemText,
//  Menu,
//  MenuItem,
//  Tooltip,
  Typography
} from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
// import ArchiveIcon from '../../../icons/Archive';
// import BellIcon from '../../../icons/Bell';
// import BanIcon from '../../../icons/Ban';
// import CameraIcon from '../../../icons/Camera';
// import PhoneIcon from '../../../icons/Phone';
// import DotsHorizontalIcon from '../../../icons/DotsHorizontal';
// import TrashIcon from '../../../icons/Trash';
import useAuth from '../../../hooks/useAuth';

const ParticipantAvatar = experimentalStyled(Avatar)(({ styleProps }) => {
  if (styleProps.small) {
    return {
      height: 30,
      width: 30,
      '&:nth-of-type(2)': {
        mt: '10px'
      }
    };
  }

  return {};
});

const ChatThreadToolbar = (props) => {
  const { participants, ...other } = props;
  const { user } = useAuth();
//  const moreRef = useRef(null);
//  const [openMenu, setOpenMenu] = useState(false);

  // We hardcode the current user ID because the mocked that is not in sync with the auth provider.
  // When implementing this app with a real database, replace this ID with the ID from Auth Context.
  const otherParticipants = participants.filter((participant) => (participant.id
    !== user.id));
  const displayNames = otherParticipants.reduce((names, participant) => [
    ...names,
    participant.name
  ], []).join(', ');

//  const handleMenuOpen = () => {
//    setOpenMenu(true);
//  };

//  const handleMenuClose = () => {
//    setOpenMenu(false);
//  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.paper',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexShrink: 0,
        minHeight: 64,
        px: 2,
        py: 1
      }}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          '& .MuiAvatar-root': otherParticipants.length > 1 && {
            height: 30,
            width: 30,
            '&:nth-of-type(2)': {
              mt: '10px'
            }
          }
        }}
      >
        <AvatarGroup max={2}>
          {otherParticipants.map((participant) => (
            <ParticipantAvatar
              key={participant.id}
              src={participant.avatar}
              styleProps={{ small: otherParticipants.length > 1 }}
            />
          ))}
        </AvatarGroup>
        <Typography
          color="textPrimary"
          sx={{ ml: 2 }}
          variant="subtitle2"
        >
          {displayNames}
        </Typography>
      </Box>
    </Box>
  );
};

ChatThreadToolbar.propTypes = {
  participants: PropTypes.array
};

ChatThreadToolbar.defaultProps = {
  participants: []
};

export default ChatThreadToolbar;
