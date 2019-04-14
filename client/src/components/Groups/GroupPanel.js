import React, {component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent"
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Member from '../Member'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
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
                <ExpansionPanelDetails>
                <Grid item xs={12}>
                    <Typography>
                    { this.state.members.map( member => (
                        <Member member={member} />
                    ))}
                    </Typography>
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