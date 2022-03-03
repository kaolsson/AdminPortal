import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Alert, Box, Card, Divider, CardContent, Container, Link, Typography } from '@material-ui/core';
// import AuthBanner from '../../components/authentication/AuthBanner';
import { PasswordRecoveryAmplify } from '../../components/authentication/password-recovery';
// import Logo from '../../components/Logo';
import SmartMasterAdminLogoBlueLarge from '../../components/SmartMasterAdminLogoBlueLarge';
// import useAuth from '../../hooks/useAuth';
import gtm from '../../lib/gtm';

const platformIcons = {
  Amplify: '/static/icons/amplify.svg',
  Auth0: '/static/icons/auth0.svg',
  Firebase: '/static/icons/firebase.svg',
  JWT: '/static/icons/jwt.svg'
};

const PasswordRecovery = () => {
  // const { platform } = useAuth();
  const pl = 'Auth0';

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Password Recovery | MySmartMaster</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ py: 10 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <RouterLink to="/">
              <SmartMasterAdminLogoBlueLarge
                sx={{
                  height: 40,
                  width: 40
                }}
              />
            </RouterLink>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 8
            }}
          />
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 4
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3
                }}
              >
                <div>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                  >
                    Password Recovery
                  </Typography>
                </div>
                <Box
                  sx={{
                    height: 32,
                    '& > img': {
                      maxHeight: '100%',
                      width: 'auto'
                    }
                  }}
                >
                  <img
                    alt="Auth platform"
                    src={platformIcons[pl]}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3
                }}
              >
                <PasswordRecoveryAmplify />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Alert severity="info">
                  <div>
                    A email will be sent to your registerd email address with reset link.
                  </div>
                </Alert>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Link
                color="textSecondary"
                component={RouterLink}
                sx={{ mt: 1 }}
                to="/authentication/login"
                variant="body2"
              >
                Log in to MySmartMaster
              </Link>

            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default PasswordRecovery;
