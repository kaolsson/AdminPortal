import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Dialog,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import Scrollbar from '../../Scrollbar';

const ActivityLogModal = (props) => {
    const { activityLog, thisDocument, onClose, open, ...other } = props;

    const onModalClose = () => {
        onClose();
    };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
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
            Activity Log
        </Typography>
            <Card {...other}>
              <CardHeader
                title={thisDocument.fileName}
              />
                <Divider />
                <Scrollbar>
                <Box sx={{ minWidth: 1150 }}>
                    <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>
                            Date
                        </TableCell>
                        <TableCell>
                            Unique Log ID
                        </TableCell>
                        <TableCell>
                            Artifact
                        </TableCell>
                        <TableCell>
                            Activity
                        </TableCell>
                        <TableCell>
                            By User
                        </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activityLog.map((logEntry) => (
                            <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {logEntry.logDate}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textSecondary"
                                variant="body2"
                                >
                                {logEntry.logID}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {logEntry.itemType[0].toUpperCase() + logEntry.itemType.slice(1)}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {logEntry.logType.toUpperCase()}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {logEntry.fullName}
                                </Typography>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </Box>
                </Scrollbar>
            </Card>
        <Box sx={{ mt: 3 }} align="right">
            <Button
              color="primary"
              onClick={onModalClose}
              variant="contained"
            >
              CLOSE
            </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

ActivityLogModal.propTypes = {
  activityLog: PropTypes.array.isRequired,
  thisDocument: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

ActivityLogModal.defaultProps = {
  open: false
};

export default ActivityLogModal;
