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
import TrashIcon from '../../../icons/Trash';
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import FileDropzone from '../../FileDropzone';
import { projectApi } from '../../../__fakeApi__/projectApi';
import ConfirmDialog from '../../popups/ConfirmDialog';

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

const ProjectFileList = (props) => {
  const { files, caseID, projectStatus, ...other } = props;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

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
            console.log(response);
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

  const onDelete = (documentID) => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    });
    try {
        projectApi.fileDelete(documentID)
          .then((response) => {
            console.log(response);
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
        toast.error('Upload failed!');
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
      if (projectStatus === 'new' || projectStatus === 'ongoing') {
          return (
            <Card>
              <CardContent>
                <FileDropzone
                  onDrop={onDrop}
                />
              </CardContent>
            </Card>
          );
      }
      return <h6> </h6>;
  }

  const paginatedFiles = applyPagination(files, page, limit);

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
                <TableRow>
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
                  <TableCell align="right">
                    Status
                  </TableCell>
                  <TableCell align="right">
                    Download
                  </TableCell>
                  <TableCell align="right">
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
                      <TableCell align="right">
                        {getStatusLabel(file.status)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => {
                              handleDownload(file.documentID);
                          }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
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
    </>
  );
};

ProjectFileList.propTypes = {
  files: PropTypes.array.isRequired,
  caseID: PropTypes.array.isRequired,
  projectStatus: PropTypes.array.isRequired
};

export default ProjectFileList;
