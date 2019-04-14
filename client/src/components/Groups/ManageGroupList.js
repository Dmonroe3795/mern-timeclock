import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GroupPanel from './GroupPanel'

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
                        <Grid container direction='column' alignContent='center'>
                        <Typography gutterBottom variant="headline" component="h1" style={{fontWeight: "bold", marginTop: 60}}>
                            Groups:
                        </Typography>
                        </Grid>


                        { this.state.groups.map(currentGroup => (
                            <GroupPanel key={currentGroup.id} group={currentGroup}/>
                            ))}
                    </div>
                ) : "No groups found"}
</div>
        )
    }
}
