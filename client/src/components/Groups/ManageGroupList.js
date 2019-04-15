import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GroupPanel from './GroupPanel'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group'
import ExpandIcon from '@material-ui/icons/UnfoldMore' 

export default class ManageGroupList extends Component {
    state = {
        groups: []
    }
    
    constructor(){
        super();
        this.getGroups();
    }

    getGroups = async() => {
        const response = await fetch('/groups', {
            method: 'GET',
          });
        this.setState({groups: await response.json()})
        console.log(this.state.groups);
    }

    render() {
        return (
            <div>
                {this.state.groups ? (
                    <div> 
                        <Grid container direction="column" alignItems="center" style={{width: "100%"}}>
                            <Grid item justify="center" style={{width: "100%", maxWidth: 1000}} >
                            <List component="nav" style={{marginTop: 50}}>
                                <ListItem>
                                    <ListItemIcon>
                                        <GroupIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Group Name" />
                                    <ListItemText align="right" inset primary="Expand"/>
                                    <ListItemIcon>
                                        <ExpandIcon />
                                    </ListItemIcon>
                                </ListItem>
                            </List>
                            { this.state.groups.map(currentGroup => (
                                    <GroupPanel key={currentGroup.id} group={currentGroup}/>
                            ))}   
                            </Grid>
                        </Grid>
                    </div>
                ) : "No groups found"}
</div>
        )
    }
}
