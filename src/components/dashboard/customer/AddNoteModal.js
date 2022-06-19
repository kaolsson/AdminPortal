import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Dialog, TextField, Typography } from '@material-ui/core';

const initalModalState = {
    values: {
        note: ''
    }
};

const AddNoteModal = (props) => {
    const { onApply, onClose, open, ...other } = props;
    const [, setState] = useState();
    const [modalState, setModalState] = useState(initalModalState);

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
        setModalState(initalModalState);
        onApply(modalState.values.note);
    };

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
            Add New Note
        </Typography>
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
              label="Add to note"
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
              SAVE
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

AddNoteModal.propTypes = {
  onApply: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

AddNoteModal.defaultProps = {
  open: false
};

export default AddNoteModal;
