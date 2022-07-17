import { useState, useCallback } from 'react';
import { Box, Card, CardHeader, CardContent, Button, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import BanIcon from '../../../icons/Ban';
import DownloadIcon from '../../../icons/Download';
import TrashIcon from '../../../icons/Trash';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import useMounted from '../../../hooks/useMounted';
import { useNavigate } from 'react-router-dom';
import { customerApi } from '../../../__fakeApi__/customerApi';

const CustomerDataManagement = (props) => {
  const { customerID, clientStatus } = props;
  const [open, setOpen] = useState(false);
  const [openAccontClose, setOpenAccountClose] = useState(false);
  const [openAccountReactivate, setOpenAccountReactivate] = useState(false);
  const mounted = useMounted();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    setOpenAccountClose(false);
    setOpenAccountReactivate(false);
  };

  const handleCloseAccount = useCallback(async () => {
    setOpenAccountClose(false);
    setOpenAccountReactivate(false);
    try {
        await customerApi.updateCustomer(customerID, { status: 'closed' });
        if (mounted.current) {
            toast.success('Client account closed!');
            navigate(`/clients/details/?cid=${customerID}`);
        }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  }, [mounted]);

  const handleReactivateAccount = useCallback(async () => {
    setOpenAccountClose(false);
    setOpenAccountReactivate(false);
    try {
        await customerApi.updateCustomer(customerID, { status: 'active' });
        if (mounted.current) {
            toast.success('Client account re-activated!');
            navigate(`/clients/details/?cid=${customerID}`);
        }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  }, [mounted]);

  const handleExportData = () => {
    toast.error('Function not available!');
  };

  const handleDeleteAccount = useCallback(async () => {
    setOpen(false);
    try {
      await customerApi.deleteCustomer(customerID);

      if (mounted.current) {
        toast.error('Account has been removed!');
        navigate('/clients/browse');
      }
    } catch (err) {
      if (err === 404) {
        toast.error('Client not found');
      }
      if (err === 409) {
        toast.error('Can not remove client, project exist');
      }
      if (err === 500) {
        toast.error('Server Error, try again later!');
      }
      if (err === 666) {
        toast.error('Network or client problem!');
      }
      if (err === 777) {
          toast.error('Something went wrong!');
      } else {
//          toast.error('Something went wrong!');
      }
    }
  }, [mounted]);

  return (
  <box>
  <Card {...props}>
    <CardHeader title="Data Management" />
    <Divider />
    <CardContent>
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <closeButton status={clientStatus} />
        <Button
          color="inherit"
          startIcon={<BanIcon fontSize="small" />}
          variant="text"
          onClick={() => {
            if (clientStatus !== 'closed') {
                setOpenAccountClose(true);
            } else {
                setOpenAccountReactivate(true);
            }
          }}
        >
         {clientStatus === 'closed' ? 'Reactivate Account' : 'Close Account' }
        </Button>
        <Button
          color="inherit"
          startIcon={<DownloadIcon fontSize="small" />}
          sx={{ mt: 1 }}
          variant="text"
          onClick={() => {
                handleExportData(customerID);
              }}
        >
          Export Data
        </Button>
      </Box>
      <Box
        sx={{
          mb: 2,
          mt: 1
        }}
      >
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Remove this customer’s chart if he requested that, if not
          please be aware that what has been deleted can never brought
          back
        </Typography>
      </Box>
      <Button
        startIcon={<TrashIcon fontSize="small" />}
        sx={{
          backgroundColor: 'error.main',
          color: 'error.contrastText',
          '&:hover': {
            backgroundColor: 'error.dark'
          }
        }}
        variant="contained"
        onClick={() => {
                setOpen(true);
              }}
      >
        Delete Account
      </Button>
    </CardContent>
  </Card>
    <Dialog
        open={openAccontClose}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
          Confirm CLOSE of Client Account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will not remove the account, but make the
            account inactive and no login can be done by the client.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
                handleClose();
                handleCloseAccount(customerID);
            }}
            autoFocus
          >
            CLOSE
          </Button>
        </DialogActions>
    </Dialog>
    <Dialog
        open={openAccountReactivate}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
          Confirm RE-ACTIVATE Client Account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will re-activate the account, and enable
            the client to login and start using SmartMaster.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
                handleClose();
                handleReactivateAccount(customerID);
            }}
            autoFocus
          >
            RE-ACTIVATE
          </Button>
        </DialogActions>
    </Dialog>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
          Confirm DELETE of Client Account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can not be undone and is permanent.
            Make sure that it is OK to fully remove the account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            sx={{
                backgroundColor: 'error.main',
                color: 'error.contrastText',
                '&:hover': {
                    backgroundColor: 'error.dark'
                }
            }}
            variant="contained"
            onClick={() => {
                handleClose();
                handleDeleteAccount(customerID);
            }}
            autoFocus
          >
            DELETE
          </Button>
        </DialogActions>
    </Dialog>
  </box>
  );
};

CustomerDataManagement.propTypes = {
    customerID: PropTypes.string.isRequired,
    clientStatus: PropTypes.string.isRequired
  };

export default CustomerDataManagement;
