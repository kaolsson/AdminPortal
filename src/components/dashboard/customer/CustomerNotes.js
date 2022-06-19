import { useState, useCallback } from 'react';
// import { format } from 'date-fns';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';
import { customerApi } from '../../../__fakeApi__/customerApi';
import useMounted from '../../../hooks/useMounted';
// import Label from '../../Label';
// import MoreMenu from '../../MoreMenu';
import Scrollbar from '../../Scrollbar';
import PropTypes from 'prop-types';
import PlusIcon from '../../../icons/Plus';
// import UpdateMessageModal from './UpdateMessageModal';
import AddNoteModal from './AddNoteModal';
import toast from 'react-hot-toast';

const CustomerNotes = (props) => {
  const { customer } = props;
  const mounted = useMounted();
  const [notes, setNotes] = useState(customer.notes);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addNote = useCallback(async (newNote) => {
    setOpen(false);
    try {
      const data = await customerApi.updateCustomer(customer.customerID, { note: newNote });

      if (mounted.current) {
        setNotes(data.notes);
        toast.success('Note added!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  }, [mounted]);

  return (
    <box>
    <Card {...props}>
      <CardHeader
//        action={<MoreMenu />}
        title="Notes on Client"
      />
      <Divider />
      <Scrollbar>
        <Box sx={{ minWidth: 1150 }}>
          <Table>
            <TableBody>
              {notes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell width="300">
                    <Typography
                      color="textPrimary"
                      variant="subtitle2"
                    >
                      {note}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box
            sx={{
              alignItems: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
              p: 1
            }}
          >
            <Button
              color="inherit"
              startIcon={<PlusIcon fontSize="small" />}
              variant="text"
              onClick={() => {
                handleOpen();
              }}
            >
              Add Note
            </Button>
          </Box>
        </Box>
      </Scrollbar>
    </Card>
    <AddNoteModal
            onApply={addNote}
            onClose={handleClose}
            open={open}
    />
    </box>
  );
};

CustomerNotes.propTypes = {
    customer: PropTypes.object.isRequired
  };

export default CustomerNotes;
