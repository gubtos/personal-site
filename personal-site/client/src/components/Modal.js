import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function getModalStyle(){
    return ({
        top : '50%',
        left : '50%',
        transform : 'translate(-50%, -50%)',
    });
};

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
});

class SimpleModal extends React.Component{
    
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open : false });
        console.log("close", this.state.open)
    };

    onRequestClose=() => {
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    onBackdropClick={this.onRequestClose}
                    
                >
                <div style={getModalStyle()} className={classes.paper}>
                <MuiDialogTitle disableTypography className={classes.root}>
                    <Typography variant="h6" id="modal-title">
                        {this.props.name}
                    </Typography>
                    {this.state.open ? (
                        <IconButton aria-label="Close" className={classes.closeButton} onClick={this.handleClose}>
                        <CloseIcon />
                        </IconButton>
                    ) : null}
                </MuiDialogTitle>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow>
                        <TableCell component="th" scope="row">
                            Descrição
                        </TableCell>
                        <TableCell align="left">{this.props.description}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell component="th" scope="row">
                            Categorias
                        </TableCell>
                        <TableCell align="left">{this.props.categories ? this.props.categories.map((t, index) => <span key={index}>{t}</span>)
                            .reduce((prev, curr) => [prev, ', ', curr]) : null}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell component="th" scope="row">
                            Site
                        </TableCell>
                        <TableCell align="left"><a href={this.props.site}>{this.props.site}</a></TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell component="th" scope="row">
                            Oportunidades
                        </TableCell>
                        <TableCell align="left">{this.props.opportunities ? this.props.opportunities.map((t, index) => <span key={index}>{t}</span>)
                            .reduce((prev, curr) => [prev, ', ', curr]) : null}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell component="th" scope="row">
                            Vagas
                        </TableCell>
                        <TableCell align="left"><a href={this.props.jobsSite}>{this.props.jobsSite}</a></TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell component="th" scope="row">
                            Fundação
                        </TableCell>
                        <TableCell align="left">{this.props.fundation}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <ModalWrapped />
                </div>
                </Modal>
            </div>
        )
    }
}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
// We need an intermediary variable for handling the recursive nesting.
const ModalWrapped = withStyles(styles)(SimpleModal);

export default ModalWrapped;