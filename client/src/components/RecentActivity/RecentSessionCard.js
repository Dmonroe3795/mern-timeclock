import React from 'react'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import PartnerIcon from '@material-ui/icons/Business';
import UserIcon from '@material-ui/icons/Person'
import DurationIcon from '@material-ui/icons/Timer'

export default class RecentSessionCard extends React.Component {

    state = {
        member: ""
    }

    loadData() {
        fetch(`/members/${this.props.session.member}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ member: data.name });
            })
            .then(console.log("HHHEERRRR" + this.state.member))
            .catch(err => console.error(this.props.url, err.toString()))
        // fetch(`/partners/${this.props.session.partner}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         this.setState({ session: data });
        //     })
        //     .catch(err => console.error(this.props.url, err.toString()))
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        const { duration } = this.props.session;
        return (
            <Paper>
                <List component="nav" style={{ marginTop: 10 }}>
                    <ListItem>
                        <ListItemIcon>
                            <UserIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${this.state.member}`} />
                        <ListItemText align="right" inset primary={`${duration} hrs`} />
                        <ListItemIcon>
                            <DurationIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PartnerIcon />
                        </ListItemIcon>
                        <ListItemText primary={`Partner: ${this.state.member}`} />
                    </ListItem>
                </List>
            </Paper>
        )
    }
}

