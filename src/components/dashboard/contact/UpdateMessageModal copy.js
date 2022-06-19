import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';
import {
    Box,
    Dialog,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@material-ui/core';
// import { useDispatch } from '../../../store';
import { messageApi } from '../../../__fakeApi__/messageApi';

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

const UpdateMessageModal = (props) => {
  const { message, onApply, onClose, open, ...other } = props;
//  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleDetailsUpdate = debounce(async (update) => {
    console.log(message);
    try {
      await messageApi.updateMessage(message.messageID, update);
      toast.success('Message updated!');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  }, 1000);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={onClose}
      open={open}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Grid
          container
          spacing={5}
        >
          <Grid
            item
            sm={8}
            xs={12}
          >
            <TextField
              defaultValue={message.note}
              fullWidth
              label="Note"
              onChange={(event) => handleDetailsUpdate({ note: event.target.value })}
              variant="outlined"
            />
            <Box sx={{ mt: 3 }}>
                <RadioGroup
                    name="status"
                    defaultValue={message.status}
                    onChange={(event) => handleDetailsUpdate({ status: event.target.value })}
                    sx={{ flexDirection: 'row' }}
                    value={message.status}
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
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

UpdateMessageModal.propTypes = {
  message: PropTypes.object.isRequired,
  onApply: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

UpdateMessageModal.defaultProps = {
  open: false
};

export default UpdateMessageModal;
