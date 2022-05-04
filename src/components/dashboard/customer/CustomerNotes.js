import { useState, useCallback } from 'react';
import { format } from 'date-fns';
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
import MoreMenu from '../../MoreMenu';
import Scrollbar from '../../Scrollbar';
import PropTypes from 'prop-types';
import PlusIcon from '../../../icons/Plus';

const CustomerNotes = (props) => {
    const { customer } = props;

  const mounted = useMounted();
  const [notes, setNotes] = useState(customer.notes);

  const saveNotes = useCallback(async () => {
    try {
      const data = await customerApi.saveCustomerNote();

      if (mounted.current) {
        setNotes(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  return (
    <Card {...props}>
      <CardHeader
        action={<MoreMenu />}
        title="Logs"
      />
      <Divider />
      <Scrollbar>
        <Box sx={{ minWidth: 1150 }}>
          <Table>
            <TableBody>
              {notes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell width="500">
                    <Typography
                      color="textPrimary"
                      variant="subtitle2"
                    >
                      {format(note.createdAt, 'yyyy/MM/dd | HH:mm:ss')}
                    </Typography>
                  </TableCell>
                  <TableCell width="300">
                    <Typography
                      color="textPrimary"
                      variant="subtitle2"
                    >
                      {note.createdBy}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {note.text}
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
              onclick={saveNotes}
            >
              Send Password Reset
            </Button>
          </Box>
        </Box>
      </Scrollbar>
    </Card>
  );
};

CustomerNotes.propTypes = {
    customer: PropTypes.object.isRequired
  };

export default CustomerNotes;
