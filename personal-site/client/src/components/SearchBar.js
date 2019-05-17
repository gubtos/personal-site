import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '70vw',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

class CustomizedInputBase extends React.Component{
  constructor(props) {
    super(props);
    
    this.state = {
      value : "",
    }
    this.textInput = React.createRef();
  }



  handleChange = (event) => {
    this.setState({value: event.target.value});
    this.props.onChangeInput(event.target.value);
  }

  render(){
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <IconButton className={classes.iconButton} aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <InputBase className={classes.input} placeholder="Buscar por empresa ou oportunidade" value={this.state.value} onChange={this.handleChange}/>
        <IconButton className={classes.iconButton} aria-label="Search">
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}

CustomizedInputBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputBase);

