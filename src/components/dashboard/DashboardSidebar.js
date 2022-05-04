import { useState, useEffect, useCallback } from 'react';
// import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, CardMedia } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useAuth from '../../hooks/useAuth';
import BriefcaseIcon from '../../icons/Briefcase';
// import CalendarIcon from '../../icons/Calendar';
// import ChartSquareBarIcon from '../../icons/ChartSquareBar';
import ChatAltIcon from '../../icons/ChatAlt';
// import ClipboardListIcon from '../../icons/ClipboardList';
import FolderOpenIcon from '../../icons/FolderOpen';
import UserIcon from '../../icons/User';
import UsersIcon from '../../icons/Users';
import UserAdd from '../../icons/UserAdd';
import ProductIcon from '../../icons/Product';
import TemplateIcon from '../../icons/Template';
import MailIcon from '../../icons/Mail';
import HomeIcon from '../../icons/Home';
// import Logo from '../Logo';
import NavSection from '../NavSection';
import Scrollbar from '../Scrollbar';
import { vendorApi } from '../../__fakeApi__/vendorApi';

const sections = [
  {
    title: 'Account',
    items: [
      {
        title: 'My Profile',
        path: '/account',
        icon: <UserIcon fontSize="small" />
      },
      {
        title: 'Organization Account',
        path: '/orgaccount',
        icon: <HomeIcon fontSize="small" />
      },
      {
        title: 'CPA List',
        path: '/cpas/browse',
        icon: <UsersIcon fontSize="small" />
      },
    ]
  },
  {
    title: 'Products',
    items: [
      {
        title: 'Products',
        path: '/products/browse',
        icon: <ProductIcon fontSize="small" />,
      },
      {
        title: 'Order Templates',
        path: '/templates/browse',
        icon: <TemplateIcon fontSize="small" />,
      },
    ]
  },
  {
    title: 'Engagements',
    items: [
        {
            title: 'Clients',
            path: '/clients/browse',
            icon: <UsersIcon fontSize="small" />
        },
        {
            title: 'Client Orders',
            path: '/orders/browse',
            icon: <FolderOpenIcon fontSize="small" />
        },
        {
            title: 'Client Cases',
            path: '/projects/browse',
            icon: <BriefcaseIcon fontSize="small" />,
        },
//        {
//            title: 'My Actions',
//            path: '/kanban',
//            icon: <ClipboardListIcon fontSize="small" />
//        },
        {
            title: 'My Chats',
            path: '/chat',
            icon: <ChatAltIcon fontSize="small" />
        },
    ]
  },
  {
    title: 'Prospects',
    items: [
      {
        title: 'Contact Us',
        path: '/error/501',
        icon: <MailIcon fontSize="small" />,
      },
      {
        title: 'Sign Up',
        path: '/error/501',
        icon: <UserAdd fontSize="small" />,
      },
    ]
  }
];

const DashboardSidebar = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const { user } = useAuth();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const getLogo = useCallback(async () => {
    try {
        const data = await vendorApi.getLogo(user.accountID);
        setLogo(data);
    } catch (err) {
        console.error(err);
    }
  }, []);

  useEffect(() => {
    getLogo();
  }, [getLogo]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        <Box
          sx={{
            display: {
              lg: 'flex',
              xs: 'flex'
            },
            justifyContent: 'center',
            p: 2
          }}
        >
          <RouterLink to="/">
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                p: 2
              }}
            >

              <CardMedia
                component="img"
                image={logo}
                alt="Logo Image"
              />
            </Box>
          </RouterLink>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {sections.map((section) => (
            <NavSection
              key={section.title}
              pathname={location.pathname}
              sx={{
                '& + &': {
                  mt: 3
                }
              }}
              {...section}
            />
          ))}
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography
            color="textPrimary"
            variant="subtitle2"
          >
            Need Technical Assistance?
          </Typography>
          <Button
            color="primary"
            component={RouterLink}
            sx={{ mt: 2 }}
            to="/contact"
            variant="outlined"
          >
            Contact Support
          </Button>
        </Box>
      </Scrollbar>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            height: 'calc(100% - 64px) !important',
            top: '64px !Important',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          width: 280
        }
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default DashboardSidebar;
