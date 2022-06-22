import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Box, Button, Dialog, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { useDispatch } from '../../../store';
import { updateSignup } from '../../../slices/signup';
import parse from 'html-react-parser';

const statusOptions = [
    {
        label: 'New',
        value: 'new'
      },
      {
        label: 'Contacted',
        value: 'contacted'
      },
      {
        label: 'Client',
        value: 'client'
      }
];

const initalModalState = {
    values: {
        note: '',
        status: ''
    }
};

const UpdateSignupModal = (props) => {
    const { signup, onApply, onClose, open, ...other } = props;
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
                await dispatch(updateSignup(signup.messageID, modalState.values));
                toast.success('Signup status updated!');
            } catch (err) {
                console.error(err);
                toast.error('Something went wrong!');
            }
        }
        setModalState(initalModalState);
        onApply();
    };

  if (!signup.dateAdded) {
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
            CLIENT SIGN-UP
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h6"
        >
            {`${signup.dateAdded.substring(0, 10)} at ${signup.dateAdded.substring(11, 16)}`}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography
            color="textSecondary"
            variant="h7"
          >
            CLIENT INFORMATION:
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            <b>
              {'Name: '}
            </b>
            {signup.title}
            {' '}
            {signup.firstName}
            {' '}
            {signup.lastName}
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
            {signup.email}
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
            {signup.phone}
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
            {signup.userName}
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
            {signup.customerID}
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography
            color="textSecondary"
            variant="h7"
          >
            DATA:
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            <b>
              {'Date/Time: '}
            </b>
            {`${signup.dateAdded.substring(0, 10)} at ${signup.dateAdded.substring(11, 16)}`}
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            <b>
              {'Origin: '}
            </b>
            {signup.siteOrigin}
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
                    defaultValue={signup.status}
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
            {parse(signup.note)}
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

UpdateSignupModal.propTypes = {
  signup: PropTypes.object.isRequired,
  onApply: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

UpdateSignupModal.defaultProps = {
  open: false
};

export default UpdateSignupModal;
