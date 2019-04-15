import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Member from './Member'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class ManageMembersList extends Component {
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

    render() {
        return (
            <div>
                {this.state.members ? (
                    <div> 
                        <List component="nav" style={{marginTop: 50}}>
                            <ListItem>
                                <ListItemText primary="Recent Activity" />
                                <ListItemText align="right" inset primary="Expand"/>
                            </ListItem>
                        </List>
                        <Grid container spacing={24}>
                            <Paper style={{width: "100%" }}>
                            <Grid container direction='column' alignContent='left'>
                        </Grid>
                        { this.state.members.map(currentMember => (
                            <Grid item xs={12}>
                                <Member member={currentMember} />
                            </Grid>
                        ))}
                            {console.log(this.state.members)}
                            </Paper>
                        </Grid>
                    </div>
                ) : "No members found"}
        </div>
        )
    }
}