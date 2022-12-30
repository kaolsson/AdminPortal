import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
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
import Label from '../../Label';
import { projectApi } from '../../../__fakeApi__/projectApi';

const getESignStatusLabel = (eSignStatus) => {
    if (eSignStatus) {
        const map = {
            none: {
              color: 'NoBackground',
              text: 'Start eSign Request'
            },
            sent: {
              color: 'ongoing',
              text: 'Sent to Client'
            },
            created: {
              color: 'warning',
              text: 'Created but not Sent'
            },
            due: {
              color: 'error',
              text: 'Due'
            },
            completed: {
              color: 'success',
              text: 'eSign Completed'
            },
            aborted: {
              color: 'error',
              text: 'Aborted'
            },
            unknown: {
                color: 'error',
                text: 'Unknown'
            }
        };
        const { text, color } = map[eSignStatus];
        return (
            <Label color={color}>
                {text}
            </Label>
        );
    }
    return (
        <Label color="success">
            {' '}
        </Label>
    );
};

const EsignModal = (props) => {
  const { eSignRecord, thisDocument, onClose, openEsign, ...other } = props;

  const onModalClose = () => {
    onClose();
  };

  const onDocumentDownload = (type) => {
    try {
        projectApi.eSignDownload(thisDocument.documentID)
          .then((response) => {
            const link = document.createElement('a');
            if (type === 'document') {
                link.href = response.document;
            } else {
                link.href = response.certificate;
            }
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((response) => {
            toast.error('Download failed');
            console.error(response);
          });
      } catch (err) {
        toast.error('Download failed!');
        console.error(err);
      }
  };

  const DownloadDoc = () => (
    <Button
      color="primary"
      variant="outlined"
      onClick={() => {
            onDocumentDownload('document');
        }}
    >
      Download
    </Button>
  );

  const DownloadCert = () => (
    <Button
      color="primary"
      variant="outlined"
      onClick={() => {
            onDocumentDownload('certificate');
        }}
    >
      Download
    </Button>
  );

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={onModalClose}
      open={openEsign}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
            eSignature Status
        </Typography>
            <Card {...other}>
              <CardHeader
                title={thisDocument.fileName}
              />
                <Divider />
                <Scrollbar>
                <Box sx={{ minWidth: 500 }}>
                    <Table>
                    <TableHead>
                        <TableRow sx={{ '& th': { fontSize: '1rem' } }}>
                            <TableCell>
                                Data
                            </TableCell>
                            <TableCell>
                                Value
                            </TableCell>
                            <TableCell>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Status
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {getESignStatusLabel(eSignRecord.eSignStatus)}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Button
                                    color="primary"
                                    onClick={onModalClose}
                                    variant="outlined"
                                >
                                    Send Reminder
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Requester
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignRequestorName}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Signer of Document
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignSignerName}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Signer Email
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignSignerEmail}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Date Requested
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignDateRequested}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Date Due
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignDateDue}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Date Completed
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignDateCompleted}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Date Certificate Expire
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignDateExpire}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Date eSingature Declined
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignDateDecline}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Date eSinature Request Deleted
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignDateDeleted}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Date eSignature Voided
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignDateVoided}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                Voided Reason
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignVoidedReason}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                DocuSign Envelope ID
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignEnvelope_id}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {' '}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                eSignature Document
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {'ID: '}
                                {eSignRecord.eSignDocument_id}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {eSignRecord.eSignStatus !== 'completed' ? <div> </div> : <DownloadDoc /> }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                eSignature Certificate
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                >
                                {eSignRecord.eSignCertDocument_id}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {eSignRecord.eSignStatus !== 'completed' ? <div> </div> : <DownloadCert /> }
                            </TableCell>
                        </TableRow>
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

EsignModal.propTypes = {
  eSignRecord: PropTypes.object.isRequired,
  thisDocument: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  openEsign: PropTypes.bool
};

EsignModal.defaultProps = {
    openEsign: false
};

export default EsignModal;
