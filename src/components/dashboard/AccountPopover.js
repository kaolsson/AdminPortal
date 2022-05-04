import { useRef, useEffect, useState, useCallback } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography
} from '@material-ui/core';
import useAuth from '../../hooks/useAuth';
import CogIcon from '../../icons/Cog';
import ChatAltIcon from '../../icons/ChatAlt';
// import UserIcon from '../../icons/User';
import useMounted from '../../hooks/useMounted';
import { authApi } from '../../__fakeApi__/authApi';

const AccountPopover = () => {
  const anchorRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const mounted = useMounted();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Unable to logout.');
    }
  };

  const getAvatar = useCallback(async () => {
    try {
        const data = await authApi.getAvatar();
        if (mounted.current) {
            setAvatar(data);
        }
    } catch (err) {
        console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getAvatar();
  }, [getAvatar]);

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpen}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          gap: 1,
        }}
      >
        <Avatar
          src={avatar}
          sx={{
            height: 32,
            width: 32
          }}
        />
          <Typography
            color="white"
            variant="subtitle1"
          >
            {user.firstName}
            {' '}
            {user.middleInitial}
            {' '}
            {user.lastName}
          </Typography>
      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 240 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            color="textPrimary"
            variant="h6"
          >
            {user.firstName}
            {' '}
            {user.middleInitial}
            {' '}
            {user.lastName}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <MenuItem
            component={RouterLink}
            to="/account"
          >
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={(
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Account
                </Typography>
              )}
            />
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/chat"
          >
            <ListItemIcon>
              <ChatAltIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={(
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Messages
                </Typography>
              )}
            />
          </MenuItem>
        </Box>
        <Box sx={{ p: 2 }}>
          <Button
            color="primary"
            fullWidth
            onClick={handleLogout}
            variant="outlined"
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default AccountPopover;
