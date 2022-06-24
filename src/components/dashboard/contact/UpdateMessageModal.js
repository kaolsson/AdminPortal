import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Box, Button, Dialog, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { useDispatch } from '../../../store';
import { updateMessage } from '../../../slices/message';
import parse from 'html-react-parser';

const statusOptions = [
    {
        label: 'New',
        value: 'new'
    },
    {
        label: 'Answered',
        value: 'answered'
    },
    {
        label: 'Complete',
        value: 'complete'
    }
];

const initalModalState = {
    values: {
        note: '',
        status: ''
    }
};

const UpdateMessageModal = (props) => {
    const { message, onApply, onClose, open, ...other } = props;
    const [, setState] = useState();
    const [modalState, setModalState] = useState(initalModalState);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        setState(event.target.value);
        setModalState(
            {
                values: {
                    ...modalState.values,
                    [event.target.name]: event.target.value,
                },
            }
        );
    };

    const onModalClose = (event) => {
        setState(event.target.value);
        setModalState(initalModalState);
        onClose();
    };

    const handleApply = async () => {
        if (onApply) {
            try {
                await dispatch(updateMessage(message.messageID, modalState.values));
                toast.success('Message status updated!');
            } catch (err) {
                console.error(err);
                toast.error('Something went wrong!');
            }
        }
        setModalState(initalModalState);
        onApply();
    };

  if (!message.dateAdded) {
      return <p> </p>;
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onModalClose}
      open={open}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
            {message.firstName}
            {' '}
            {message.lastName}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h6"
        >
            {`${message.dateAdded.substring(0, 10)} at ${message.dateAdded.substring(11, 16)}`}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography
            color="textSecondary"
            variant="h7"
          >
            MESSAGE:
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            {message.messageText}
          </Typography>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            {message.messageText2}
          </Typography>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            {message.messageText3}
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography
            color="textSecondary"
            variant="h7"
          >
            INFO:
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            <b>
              {'Email: '}
            </b>
            {message.email}
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            <b>
              {'Phone: '}
            </b>
            {message.phone}
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            <b>
              {'User Name: '}
            </b>
            {message.userName}
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            <b>
              {'Client ID: '}
            </b>
            {message.customerID}
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography
            color="textSecondary"
            variant="h7"
          >
            STATUS & NOTES:
          </Typography>
        </Box>
            <Box sx={{ mt: 3 }}>
                <RadioGroup
                    name="status"
                    defaultValue={message.status}
                    onChange={handleChange}
                    sx={{ flexDirection: 'row' }}
                >
                    {statusOptions.map((statusOption) => (
                        <FormControlLabel
                            control={<Radio color="primary" />}
                            key={statusOption.value}
                            label={(
                                <Typography
                                    color="textPrimary"
                                    variant="body1"
                                >
                                    {statusOption.label}
                                </Typography>
                            )}
                            value={statusOption.value}
                        />
                    ))}
                </RadioGroup>
            </Box>
        <Box sx={{ mt: 3 }}>
          <Typography
            color="textSecondary"
            variant="h7"
          >
            Notes:
          </Typography>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            {parse(message.note)}
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Box sx={{ mt: 3 }}>
            <TextField
              FormHelperTextProps={{
                sx: {
                  textAlign: 'right',
                  mr: 0
                }
              }}
              fullWidth
              helperText={`${200 - modalState.values.note.length} characters left`}
              label="Add to notes"
              name="note"
              multiline
              onChange={handleChange}
              placeholder=""
              rows={5}
              value={modalState.values.note}
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
              UPDATE STATUS
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

UpdateMessageModal.propTypes = {
  message: PropTypes.object.isRequired,
  onApply: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

UpdateMessageModal.defaultProps = {
  open: false
};

export default UpdateMessageModal;
