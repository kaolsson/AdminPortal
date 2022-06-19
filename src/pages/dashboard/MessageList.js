import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Container, Grid, Typography } from '@material-ui/core';
import { MessageListTable } from '../../components/dashboard/contact';
import ChevronRightIcon from '../../icons/ChevronRight';
import useSettings from '../../hooks/useSettings';
import gtm from '../../lib/gtm';
import useAuth from '../../hooks/useAuth';
import { getMessages } from '../../slices/message';
import { useDispatch, useSelector } from '../../store';

const MessageList = () => {
  const { settings } = useSettings();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(getMessages(user.accountID));
  }, []);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Message List | Smartmaster Admin Portal</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Messages
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Prospects
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Message
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  List
                </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <MessageListTable messages={messages.array} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MessageList;
