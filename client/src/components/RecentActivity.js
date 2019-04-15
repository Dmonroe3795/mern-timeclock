import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Member from './Members/Member'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import PartnerIcon from '@material-ui/icons/Business';
import UserIcon from '@material-ui/icons/Person'
import ActivityIcon from '@material-ui/icons/ShowChart'
import DurationIcon from '@material-ui/icons/Timer'


export default class RecentActivity extends Component {
    state = {
        sessions: []
    }
    
    constructor(){
        super();
        this.getSessions();
    }

    loadData() {
        fetch(`/sessions/${this.props.session}`)
        .then(response => response.json())
        .then(data => {
        console.log(data);
            this.setState({ session: data });
        })
        .catch(err => console.error(this.props.url, err.toString()))
    }

    componentDidMount() {
        this.loadData()
      }

    getSessions = async() => {
        const response = await fetch('/sessions', {
            method: 'GET',
          });
        this.setState({sessions: await response.json()})
    }

    render() {
        return (
            <div>
                {this.state.sessions ? (
                    <Grid container direction="column" alignItems="center" style={{width: "100%"}}>
                        <Grid item justify="center" style={{width: "100%", maxWidth: 1000}} >
                            <List component="nav" style={{marginTop: 50}}>
                                <ListItem style={{marginBottom:-10, paddingRight:50}}>
                                <ListItemIcon>
                                    <ActivityIcon />
                                </ListItemIcon>
                                <ListItemText primary="Recent Activity" />
                                <ListItemText align="right" inset primary="Duration"/>
                                </ListItem>
                            </List>
                            { this.state.sessions.map(session => (
                                <Paper>
                                    <List component="nav" style={{marginTop: 10}}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <UserIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={`Member: ${session.member}`} />
                                            <ListItemText align="right" inset primary={`${session.duration} hrs`}/>
                                            <ListItemIcon>
                                                <DurationIcon />
                                            </ListItemIcon>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PartnerIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={
                                                fetch(`/sessions/${session.partner}`)
                                                .then(response => response.json()).then(partner => {partner})
                                            } 
                                            />
                                        </ListItem>
                                    </List>
                                </Paper>
                            ))}
                    </Grid>
                </Grid>
                ) : "No sessions found"}
        </div>
        )
    }
}