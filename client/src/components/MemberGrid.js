import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Member from '../components/Member'
import Typography from '@material-ui/core/Typography';
import ResponsiveDrawer from './Layout/ResponsiveDrawer';

export default class MemberGrid extends Component {
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
            <ResponsiveDrawer>
                {this.state.members ? (
                    <div> 
                        <Grid container direction='column' alignContent='center'>
                        <Typography gutterBottom variant="headline" component="h1" style={{fontWeight: "bold", marginTop: 0}}>
                            Members:
                        </Typography>
                        </Grid>
                        <Grid container spacing={24} style={{padding:24}}>
                            { this.state.members.map(currentMember => (
                                <Grid item xs={12} sm= {6} lg={4} xl={3}>
                                    <Member member={currentMember} />
                                </Grid>
                            ))}
                            {console.log(this.state.members)}
                        </Grid>
                    </div>
                ) : "No members found"}
            </ResponsiveDrawer>
        )
    }
}