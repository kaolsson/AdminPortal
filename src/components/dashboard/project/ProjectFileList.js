import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import DownloadIcon from '../../../icons/Download';
import EyeIcon from '../../../icons/Eye';
import TrashIcon from '../../../icons/Trash';
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import FileDropzone from '../../FileDropzone';
import { projectApi } from '../../../__fakeApi__/projectApi';
import { activityLogApi } from '../../../__fakeApi__/activityLogApi';
import ConfirmDialog from '../../popups/ConfirmDialog';
import ConfirmEsign from '../../popups/ConfirmEsign';
import ActivityLogModal from './ActivityLogModal';
import EsignModal from './EsignModal';

const getStatusLabel = (fileStatus) => {
  const map = {
    removed: {
      color: 'error',
      text: 'Removed'
    },
    available: {
      color: 'success',
      text: 'Active'
    },
    replaced: {
      color: 'warning',
      text: 'Replaced'
    },
    rejected: {
      color: 'error',
      text: 'Rejected'
    }
  };
  const { text, color } = map[fileStatus];
  return (
    <Label color={color}>
      {text}
    </Label>
  );
};

const getESignStatusLabel = (eSignStatus) => {
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
//    if (eSignStatus === 'none') {
//        return (
//            <Label color={color}>
//                {text}
//            </Label>
//          );
//    }
    return (
      <Label color={color} style={{ cursor: 'pointer' }}>
        {text}
      </Label>
    );
  };

  const applyPagination = (files, page, limit) => files
  .slice(page * limit, page * limit + limit);

const ProjectFileList = (props) => {
  const { files, caseID, projectStatus, ...other } = props;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const [confirmEsign, setConfirmEsign] = useState({ isOpen: false, title: '', subTitle: '', document: {} });
  const [open, setOpen] = useState(false);
  const [openEsign, setOpenEsign] = useState(false);
  const [activityLog, setActivityLog] = useState([]);
  const [eSignRecord, setESignRecord] = useState([]);
  const [thisDocument, setThisDocument] = useState({});

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0].name) {
        toast.loading('File upload, please wait....');
      try {
        projectApi.fileUpload(acceptedFiles[0], caseID)
          .then((response) => {
            if (response.status === 201) {
                toast.dismiss();
                toast.success('File uploaded!');
            } else {
                toast.dismiss();
                toast.error('Upload failed');
                console.error(response);
            }
          })
          .catch((response) => {
            toast.dismiss();
            toast.error('Upload failed');
            console.error(response);
          });
      } catch (err) {
        toast.dismiss();
        toast.error('Upload failed!');
        console.error(err);
      }
    }
  }, []);

  const handleDownload = (documentID) => {
    try {
        projectApi.fileDownload(documentID)
          .then((response) => {
            if (response.status === 200) {
                const link = document.createElement('a');
                link.href = response.data;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                toast.error('Download failed');
                console.error(response);
            }
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

  const onEsign = (file) => {
    console.log(file.eSignStatus);
    setConfirmEsign({
        ...confirmEsign,
        isOpen: false
    });
    try {
        toast.success('CREATING eSinature request, please wait.....');
        projectApi.eSignRequest(file)
          .then((response) => {
            toast.dismiss();
            toast.success('eSinature request sent!');
            window.open(response.redirect_url, '_blank', 'noopener,noreferrer');
          })
          .catch((response) => {
            toast.dismiss();
            toast.error('eSinature request  failed - 2');
            console.error(response);
          });
      } catch (err) {
        toast.dismiss();
        toast.error('eSinature request  failed! - 3');
        console.error(err);
      }
  };

  const onDelete = (documentID) => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    });
    try {
        projectApi.fileDelete(documentID)
          .then((response) => {
            if (response.status === 204) {
                toast.dismiss();
                toast.success('File deleted!');
            } else {
                toast.dismiss();
                toast.error('Delete failed');
                console.error(response);
            }
          })
          .catch((response) => {
            toast.dismiss();
            toast.error('Delete failed');
            console.error(response);
          });
      } catch (err) {
        toast.dismiss();
        toast.error('Delete failed!');
        console.error(err);
      }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  function MyDropZone() {
      if (projectStatus === 'new' || projectStatus === 'active') {
          return (
            <Card>
              <CardContent>
                <FileDropzone
                  maxFiles={1}
                  onDrop={onDrop}
                />
              </CardContent>
            </Card>
          );
      }
      return <h6> </h6>;
  }

  const paginatedFiles = applyPagination(files, page, limit);

  const handleOpenModal = (document) => {
    try {
        activityLogApi.getActivityLog(document.documentID)
          .then((response) => {
            console.log(response.log);
            setActivityLog(response.log);
            setThisDocument(document);
            setOpen(true);
          })
          .catch((response) => {
            toast.dismiss();
            toast.error('Get activity log failed - 2');
            console.error(response);
          });
    } catch (err) {
        toast.dismiss();
        toast.error('Get activity log failed! - 3');
        console.error(err);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenEsignModal = (document) => {
    try {
        activityLogApi.getActivityLog(document.documentID)
          .then((response) => {
            console.log(response.log);
            setActivityLog(response.log);
            setESignRecord(document.eSignature);
            setThisDocument(document);
            setOpenEsign(true);
          })
          .catch((response) => {
            toast.dismiss();
            toast.error('Get activity log failed - 2');
            console.error(response);
          });
    } catch (err) {
        toast.dismiss();
        toast.error('Get activity log failed! - 3');
        console.error(err);
    }
  };

  const handleCloseEsignModal = () => {
    setOpenEsign(false);
  };

  return (
    <>
      <Card {...other}>
        <CardHeader
          title="My Documents"
        />
        <Divider />
        <Scrollbar>
          <Box sx={{ minWidth: 1150 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ '& th': { fontSize: '1rem' } }}>
                  <TableCell>
                    Document Name
                  </TableCell>
                  <TableCell>
                    Upload Date
                  </TableCell>
                  <TableCell>
                    Uploaded By
                  </TableCell>
                  <TableCell>
                    Description
                  </TableCell>
                  <TableCell>
                    Unique File ID
                  </TableCell>
                  <TableCell align="center">
                    Status
                  </TableCell>
                  <TableCell align="center">
                    Activity Log
                  </TableCell>
                  <TableCell align="center">
                    Download
                  </TableCell>
                  <TableCell align="center">
                    eSignature
                  </TableCell>
                  <TableCell align="center">
                    Remove
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedFiles.map((file) => (
                    <TableRow>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                          {file.fileName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {file.dateAdded}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                          {file.uploadedName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                          {file.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                            color="textPrimary"
                            variant="subtitle2"
                        >
                          {file.documentID}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {getStatusLabel(file.status)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            handleOpenModal(file);
                          }}
                        >
                          <EyeIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                              handleDownload(file.documentID);
                          }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell
                         align="center"
                         onClick={() => {
                            if (file.eSignature.eSignStatus === 'none') {
                                setConfirmEsign({
                                    isOpen: true,
                                    title: 'Create a eSignature request to the client.',
                                    document: file,
                                    subTitle: 'A new window will open in DocuSign.',
                                    onConfirm: () => { onEsign(file); }
                                });
                            } else {
                                handleOpenEsignModal(file);
                            }
                         }}
                      >
                        {getESignStatusLabel(file.eSignature.eSignStatus)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: 'Are you sure to delete this document?',
                              subTitle: "You can't undo this operation.",
                              onConfirm: () => { onDelete(file.documentID); }
                            });
                          }}
                        >
                          <TrashIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          component="div"
          count={files.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <Card>
        <MyDropZone />
      </Card>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <ConfirmEsign
        confirmEsign={confirmEsign}
        setConfirmEsign={setConfirmEsign}
      />
      <ActivityLogModal
        activityLog={activityLog}
        thisDocument={thisDocument}
        onClose={handleCloseModal}
        open={open}
      />
      <EsignModal
        eSignRecord={eSignRecord}
        thisDocument={thisDocument}
        onClose={handleCloseEsignModal}
        openEsign={openEsign}
      />
    </>
  );
};

ProjectFileList.propTypes = {
  files: PropTypes.array.isRequired,
  caseID: PropTypes.array.isRequired,
  projectStatus: PropTypes.array.isRequired
};

export default ProjectFileList;
