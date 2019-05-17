import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);


class CustomDialog extends React.Component {

  state = {
    open: false,
  };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open : false });
    };

    onRequestClose=() => {
        this.setState({ open: false });
    }

  render() {
    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {this.props.name}
          </DialogTitle>
          <DialogContent>
          <Table>
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
                            Cidades
                        </TableCell>
                        <TableCell align="left">{this.props.cities ? this.props.cities.map((t, index) => <span key={index}>{t}</span>)
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomDialog;

