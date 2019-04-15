import React, {component} from 'react';
import Typography from '@material-ui/core/Typography';
import Member from '../Members/Member'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

const styles = theme => ({
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
        padding:0
    }
  });

class GroupPanel extends React.Component {

    state = {
        members: []
    }
    
    constructor(){
        super();
        this.getMembers();
    }

    getMembers = async() => {
        const response = await fetch('/members', {
            method: 'GET',
          });
        this.setState({members: await response.json()})
        console.log(this.state.members);
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render(){

        const { classes, group } = this.props;
        const { name } = group;
        console.log(classes)
        return(
<div>
    <Grid container direction="column" alignItems="center" style={{width: "100%"}}>
        <Grid item justify="center" style={{width: "100%", maxWidth: 1000}} >
            <Paper style={{marginBottom: 10}}>
            <List style={{padding: 0}} component="nav">
                <ListItem  button onClick={this.handleClick}>
                    <ListItemIcon>
                    
                    </ListItemIcon>
                    <ListItemText inset primary={name} />
                    <ListItemText align="right" inset primary={`${this.state.members.length} Members`}/>
                    <ListItemIcon>
                    
                    </ListItemIcon>
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="nav">
                        <ListItem style={{paddingTop:0}} className="paddingless">
                            <ListItemText primary="Partner" />
                            <ListItemText align="right" inset primary="Duration"/>
                        </ListItem>
                    </List>
                    { this.state.members.map( member => (
                        <Member member={member} />
                    ))}        
                </Collapse>
            </List>
            </Paper>
        </Grid>
    </Grid>
</div>
        )
    }
}

GroupPanel.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(GroupPanel);