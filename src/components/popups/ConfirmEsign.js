import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core';
// import ExclamationCircleIcon from '../../icons/Download';
import React from 'react';
// import PencilAltIcon from '@material-ui/icons/PencilAlt';
import PencilAltIcon from '../../icons/PencilAlt';

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

export default function ConfirmEsign(props) {
    const { confirmEsign, setConfirmEsign } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={confirmEsign.isOpen}
            classes={{ paper: classes.dialog }}
        >
            <DialogTitle className={classes.dialogTitle}>
                <IconButton
                    disableRipple
                    className={classes.titleIcon}
                >
                    <PencilAltIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmEsign.title}
                </Typography>
                <Typography variant="h6">
                    {' '}
                </Typography>
                <Typography variant="h6">
                    {'Document: '}
                    {confirmEsign.document.fileName}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmEsign.subTitle1}
                </Typography>
                <Typography variant="subtitle2">
                    An Email will be sent to the clinet for requesting eSignature.
                </Typography>
                <Typography variant="subtitle2">
                    When completed an email will be sent to you and MySmartmaster will be updated.
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => setConfirmEsign({ ...confirmEsign, isOpen: false })}
                >
                    Cancel
                </Button>
                <Button
                    color="success"
                    variant="contained"
                    onClick={confirmEsign.onConfirm}
                >
                    Send Document for eSignature
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmEsign.propTypes = {
    confirmEsign: PropTypes.isRequired,
    setConfirmEsign: PropTypes.isRequired
  };
