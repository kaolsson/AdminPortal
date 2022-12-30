import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {
  Box,
  Card,
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
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import { projectApi } from '../../../__fakeApi__/projectApi';
import { activityLogApi } from '../../../__fakeApi__/activityLogApi';
import ConfirmDialog from '../../popups/ConfirmDialog';
import ActivityLogModal from './ActivityLogModal';

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

const applyPagination = (files, page, limit) => files
  .slice(page * limit, page * limit + limit);

const ProjectFileListVendor = (props) => {
  const { files, ...other } = props;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const [open, setOpen] = useState(false);
  const [activityLog, setActivityLog] = useState([]);
  const [thisDocument, setThisDocument] = useState({});

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

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

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

  return (
    <>
      <Card {...other}>
        <CardHeader
          title="Documents to Me"
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
                    Description / Action
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
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <ActivityLogModal
        activityLog={activityLog}
        thisDocument={thisDocument}
        onClose={handleCloseModal}
        open={open}
      />
    </>
  );
};

ProjectFileListVendor.propTypes = {
  files: PropTypes.array.isRequired
};

export default ProjectFileListVendor;
