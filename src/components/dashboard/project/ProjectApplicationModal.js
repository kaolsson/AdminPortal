import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Box, Button, Dialog, TextField, Typography } from '@material-ui/core';
// import getInitials from '../../../utils/getInitials';

const ProjectApplicationModal = (props) => {
  const { authorAvatar, authorName, onApply, onClose, open, ...other } = props;
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleApply = () => {
    toast.success('Request sent!');

    if (onApply) {
      onApply();
    }
  };

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          Tell us what you need help with
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          variant="subtitle2"
        >
          Write down a short note with your needs and we will come back
          to you shortly with a proposal.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Box sx={{ mt: 3 }}>
            <TextField
              autoFocus
              FormHelperTextProps={{
                sx: {
                  textAlign: 'right',
                  mr: 0
                }
              }}
              fullWidth
              label="Tax Year"
              onChange={handleChange}
              placeholder="Please give tax year"
              value={value}
              variant="outlined"
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <TextField
              FormHelperTextProps={{
                sx: {
                  textAlign: 'right',
                  mr: 0
                }
              }}
              fullWidth
              helperText={`${200 - value.length} characters left`}
              label="Short Description"
              multiline
              onChange={handleChange}
              placeholder="Tell us what you need help with?"
              rows={5}
              value={value}
              variant="outlined"
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button
              color="primary"
              fullWidth
              onClick={handleApply}
              variant="contained"
            >
              Send Request
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

ProjectApplicationModal.propTypes = {
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  onApply: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

export default ProjectApplicationModal;
