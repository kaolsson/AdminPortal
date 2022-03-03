import { useRef, useState, useEffect, useCallback } from 'react';
// import { subDays, subHours } from 'date-fns';
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Tooltip,
  Typography
} from '@material-ui/core';
import BellIcon from '../../icons/Bell';
import ChatAltIcon from '../../icons/ChatAlt';
import CreditCardIcon from '../../icons/CreditCard';
import CheckCircleIcon from '../../icons/CheckCircle';
import ShoppingCartIcon from '../../icons/ShoppingCart';
import useMounted from '../../hooks/useMounted';
import { notificationApi } from '../../__fakeApi__/notificationApi';
import useAuth from '../../hooks/useAuth';

// const now = new Date();

// const notificationsOld = [
//  {
//    id: '5e8883f1b51cc1956a5a1ec0',
//    createdAt: subHours(now, 2).getTime(),
//    description: 'Dummy text',
//    title: 'Your order is placed',
//    type: 'order_placed'
//  },
//  {
//    id: '5e8883f7ed1486d665d8be1e',
//    createdAt: subDays(now, 1).getTime(),
//    description: 'You have 32 unread messages',
//    title: 'New message received',
//    type: 'new_message'
//  },
//  {
//   id: '5e8883fca0e8612044248ecf',
//    createdAt: subDays(now, 3).getTime(),
//    description: 'Dummy text',
//    title: 'Your item is shipped',
//    type: 'item_shipped'
//  },
//  {
//    id: '5e88840187f6b09b431bae68',
//    createdAt: subDays(now, 7).getTime(),
//    description: 'You have 32 unread messages',
//    title: 'New message received',
//    type: 'new_message'
//  }
// ];

const iconsMap = {
  item_shipped: ShoppingCartIcon,
  new_message: ChatAltIcon,
  open_action: CheckCircleIcon,
  order_placed: CreditCardIcon
};

const NotificationsPopover = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const mounted = useMounted();
  const { user } = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getNotifications = useCallback(async () => {
    try {
      const data = await notificationApi.getNotifications(user.customerID);
      if (mounted.current) {
      setNotifications(data);
      console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <>
      <Tooltip title="Messages">
        <IconButton
          color="inherit"
          ref={anchorRef}
          onClick={handleOpen}
        >
          <Badge
            color="error"
            badgeContent={notifications.length}
          >
            <BellIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 320 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            color="textPrimary"
            variant="h6"
          >
            Notifications
          </Typography>
        </Box>
        {notifications.length === 0
          ? (
            <Box sx={{ p: 2 }}>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                There are no Messages
              </Typography>
            </Box>
          )
          : (
            <>
              <List disablePadding>
                {notifications.map((notification) => {
                  const Icon = iconsMap[notification.type];

                  return (
                    <ListItem
                      divider
                      key={notification.id}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText'
                          }}
                        >
                          <Icon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={(
                          <Link
                            color="textPrimary"
                            sx={{ cursor: 'pointer' }}
                            underline="none"
                            variant="subtitle2"
                          >
                            {notification.title}
                          </Link>
                        )}
                        secondary={notification.description}
                      />
                    </ListItem>
                  );
                })}
              </List>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 1
                }}
              >
                <Button
                  color="primary"
                  size="small"
                  variant="text"
                >
                  Please check
                </Button>
              </Box>
            </>
          )}
      </Popover>
    </>
  );
};

export default NotificationsPopover;
