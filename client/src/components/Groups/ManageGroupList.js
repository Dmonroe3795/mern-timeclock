import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Group from './Group'

export default class GroupMenuList extends Component {
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
                        <Grid container spacing={24} style={{padding:24}}>
                            { this.state.groups.map(currentGroup => (
                                <Grid item xs={12}>
                                    <Group group={currentGroup} />
                                </Grid>
                            ))}
                            {console.log(this.state.groups)}
                        </Grid>
                    </div>
                ) : "No groups found"}
</div>
        )
    }
}