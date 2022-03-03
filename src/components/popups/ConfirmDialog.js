import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core';
// import ExclamationCircleIcon from '../../icons/Download';
import React from 'react';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogActions: {
        justifyContent: 'center'
    },
    titleIcon: {
        color: theme.palette.secondary.main,
        '&:hover': {
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem'
        }
    }
}));

export default function ConfirmDialog(props) {
    const { confirmDialog, setConfirmDialog } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={confirmDialog.isOpen}
            classes={{ paper: classes.dialog }}
        >
            <DialogTitle className={classes.dialogTitle}>
                <IconButton
                    disableRipple
                    className={classes.titleIcon}
                >
                    <NotListedLocationIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                >
                    No
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={confirmDialog.onConfirm}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmDialog.propTypes = {
    confirmDialog: PropTypes.isRequired,
    setConfirmDialog: PropTypes.isRequired
  };
