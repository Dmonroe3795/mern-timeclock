import React, { component } from 'react';
import Member from '../Members/Member'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandMore';
import ExpandMore from '@material-ui/icons/KeyboardArrowRight';
import Paper from '@material-ui/core/Paper'
import GroupIcon from '@material-ui/icons/Group'
import EditIcon from '@material-ui/icons/Edit'
import ArchiveIcon from '@material-ui/icons/Archive'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import SaveIcon from '@material-ui/icons/Save'

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

const styles = theme => ({
    editable :{
        paddingLeft: 5, 
        paddingRight: 5,
        '&:hover': {
             backgroundColor:(0, _colorManipulator.fade)(theme.palette.text.primary, theme.palette.action.hoverOpacity),
             borderRadius: 4
        }
    },
    inset: {
        marginLeft: 10
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paddingless: {
        padding: 0
    },
    lightTooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  shadowed: {
      '&:hover': {
             boxShadow: theme.shadows[3]
        }
  }
});

class GroupPanel extends React.Component {

    state = {
        exists: true,
        name: "",
        edited: false,
        members: []
    }

constructor(props){
        super(props)
        this.state = {
            name: this.props.group.name,
            exists: true,
            edited: false,
            members: this.props.group.members,
            focused: false
        }
    }
    
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleChange = event => {
        this.setState({ name: event.target.value});
        this.setState({edited: true});
    };

    saveChanges = () =>{
        this.setState({edited: false});
        this.switchBetweenTextBox();
    }

    switchBetweenTextBox = () =>{
        this.setState({focused: !this.state.focused});
        console.log(this.state.focused);
    }

    render() {

        const { classes, group } = this.props;
        const { name } = group;
        return (
            <div>
                {this.state.exists ? 
                    <Grid container alignItems="flex-start" style={{ width: "100%" }}
                        onMouseEnter={() => this.setState({ show: true })}
                        onMouseLeave={() => this.setState({ show: false })}
                        >
                        <Grid item xs justify="center" style={{ maxWidth: 1000 }}
                        >
                            <Paper className={ classes.shadowed } style={{ marginBottom: 10 }}>
                                <List style={{ padding: 0 }} component="nav">
                                    <ListItem>
                                        <ListItemIcon style={{cursor: 'pointer' }} onClick={this.handleClick}>
                                            {this.state.open ? <ExpandLess />:<ExpandMore />}
                                        </ListItemIcon>

                                        {this.state.focused ? 
                                        <InputBase
                                            multiline="true"
                                            className={classes.margin, classes.editable}
                                            onChange={this.handleChange}
                                            onBlur={this.saveChanges}
                                            defaultValue={this.state.name} />
                                        :
                                        <Tooltip title="Double click to edit" placement="right" >
                                            <Typography style={{paddingBottom: 4, paddingTop: 4}} onClick={this.switchBetweenTextBox} variant="subheading" className={this.props.classes.editable}>
                                                    {this.state.name}
                                            </Typography>
                                        </Tooltip>
                                        }

                                        {this.state.edited ? 
                                            <ListItemIcon style={{cursor: 'pointer' }}>
                                                <SaveIcon />
                                            </ListItemIcon>
                                        :null }
                                        <ListItemText align="right" inset primary={`${this.props.group.members.length}`} />
                                        <ListItemIcon>
                                            <GroupIcon />
                                        </ListItemIcon>
                                    </ListItem>
                                    <Divider />
                                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                        {this.props.group.members.map(member => (
                                            <Member member={member} />
                                        ))}
                                    </Collapse>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={1} alignContent="top" >
                            {this.state.show ? 
                                <div>
                                     <Tooltip title="Archive" placement="right">
                                        <ListItemIcon onClick={() => this.setState({exists: false})} style={{ paddingLeft: 12, paddingTop: 12}}>
                                                <ArchiveIcon style={{cursor:'pointer', fontSize: 30}} />
                                        </ListItemIcon>
                                    </Tooltip>
                                </div>
                                : null}
                        </Grid>
                    </Grid>
                    : null}
            </div>
            
        )
    }
}

GroupPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupPanel);