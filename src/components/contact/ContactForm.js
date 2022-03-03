import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import useAuth from '../../hooks/useAuth';

const ContactForm = () => {
  const { user } = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [formState] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            First Name *
          </Typography>
          <TextField
            fullWidth
            name="name"
            required
            variant="outlined"
            value={formState.firstName}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Last Name *
          </Typography>
          <TextField
            fullWidth
            name="name"
            required
            variant="outlined"
            value={formState.lastName}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Email *
          </Typography>
          <TextField
            fullWidth
            name="email"
            type="email"
            required
            variant="outlined"
            value={formState.email}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Phone Number *
          </Typography>
          <TextField
            fullWidth
            name="phone"
            required
            type="tel"
            variant="outlined"
            value={formState.phone}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Topic *
          </Typography>
          <Select
            fullWidth
            variant="outlined"
          >
            <MenuItem value="Profile">Profile</MenuItem>
            <MenuItem value="Messages">Messages</MenuItem>
            <MenuItem value="Case List">Case List</MenuItem>
            <MenuItem value="Order">Order List</MenuItem>
            <MenuItem value="Calendar">Calendar</MenuItem>
            <MenuItem value="My Actions">My Actions</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Type *
          </Typography>
          <Select
            fullWidth
            variant="outlined"
          >
            <MenuItem value="Question">Question</MenuItem>
            <MenuItem value="Issue">Issue</MenuItem>
            <MenuItem value="Feedback">Feedback</MenuItem>
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            You are
          </Typography>
          <Select
            fullWidth
            variant="outlined"
          >
            <MenuItem value="Individual">Individual</MenuItem>
            <MenuItem value="Company">Company</MenuItem>
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Message
          </Typography>
          <TextField
            fullWidth
            name="message"
            required
            multiline
            rows={6}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3
        }}
      >
        <Button
          color="primary"
          fullWidth
          size="large"
          variant="contained"
        >
          Send
        </Button>
      </Box>
      <Typography
        color="textSecondary"
        sx={{ mt: 3 }}
        variant="body2"
      >
        By submitting this, you agree to the
        {' '}
        <Link
          color="textPrimary"
          href="#"
          underline="always"
          variant="subtitle2"
        >
          Privacy Policy
        </Link>
        {' '}
        and
        {' '}
        <Link
          color="textPrimary"
          href="#"
          underline="always"
          variant="subtitle2"
        >
          Cookie Policy
        </Link>
        .
      </Typography>
    </form>
  );
};

export default ContactForm;
