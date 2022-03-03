import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';

const AccountNotificationsSettings = (props) => {
  const { user } = useAuth();
  const { update } = useAuth();

  console.log(user.notifications);

  const [noteTypes, setNoteTypes] = useState({
    notifyEventEmail: user.notifications.notifyEventEmail,
    notifyEventNote: user.notifications.notifyEventNote,
    notifyEventText: user.notifications.notifyEventText,
    notifyMsgEmail: user.notifications.notifyMsgEmail,
    notifyMsgNote: user.notifications.notifyMsgNote
  });

  const { notifyEventEmail, notifyEventNote, notifyEventText, notifyMsgEmail, notifyMsgNote } = noteTypes;

  const handleChange = (event) => {
    setNoteTypes({ ...noteTypes, [event.target.name]: event.target.checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateType = 2; // update type 2 == notifications
    try {
        await update(updateType, noteTypes);
        toast.success('Notifications updated!');
      } catch (err) {
        console.log(err);
        toast.error('Something went wrong!');
      }
  };

  return (
    <form
      onSubmit={handleSubmit}
      {...props}
    >
      <Card>
        <CardHeader title="Notifications" />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="subtitle1"
              >
                Updates and Actions on your Case
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Receive on your profile email and phone number
              </Typography>
              <div>
                <FormControlLabel
                  control={(
                    <Checkbox
                      color="primary"
                      checked={notifyEventEmail}
                      onChange={handleChange}
                      name="notifyEventEmail"
                    />
                  )}
                  label="Email alerts"
                />
              </div>
              <div>
                <FormControlLabel
                  control={(
                    <Checkbox
                      color="primary"
                      checked={notifyEventNote}
                      onChange={handleChange}
                      name="notifyEventNote"
                    />
                  )}
                  label="Push notifications"
                />
              </div>
              <div>
                <FormControlLabel
                  control={(
                    <Checkbox
                      color="primary"
                      checked={notifyEventText}
                      onChange={handleChange}
                      name="notifyEventText"
                    />
                  )}
                  label="Text message"
                />
              </div>
            </Grid>
            <Grid
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="subtitle1"
              >
                New Messages
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Receive on your profile email
              </Typography>
              <div>
                <FormControlLabel
                  control={(
                    <Checkbox
                      color="primary"
                      checked={notifyMsgEmail}
                      onChange={handleChange}
                      name="notifyMsgEmail"
                    />
                  )}
                  label="Email alerts"
                />
              </div>
              <div>
                <FormControlLabel
                  control={(
                    <Checkbox
                      color="primary"
                      checked={notifyMsgNote}
                      onChange={handleChange}
                      name="notifyMsgNote"
                    />
                  )}
                  label="Push notifications"
                />
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            type="submit"
            variant="contained"
          >
            Save Settings
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountNotificationsSettings;
