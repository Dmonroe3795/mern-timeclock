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
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
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

    render(){

        const { classes, group } = this.props;
        const { name } = group;
        console.log(classes)
        return(
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography gutterBottom variant="headline" component="h2">{ name }</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{paddingTop:0}}>
                <Grid container >
                <Grid item xs={12} >
                <List component="nav">
                
                        <ListItem style={{paddingTop:0, paddingRight:50}}>
                            <ListItemText primary="Name" />
                            <ListItemText align="right" inset primary="Total Hours"/>
                        </ListItem>
                <Divider />
                </List>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                    { this.state.members.map( member => (
                        <Member member={member} />
                    ))}
                    </Typography>
                </Grid>
                </Grid>
                
                </ExpansionPanelDetails> 
            </ExpansionPanel>
        )
    }
}

GroupPanel.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(GroupPanel);