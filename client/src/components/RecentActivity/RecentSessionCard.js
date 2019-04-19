import React from 'react'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import PartnerIcon from '@material-ui/icons/Business';
import UserIcon from '@material-ui/icons/Person'
import DurationIcon from '@material-ui/icons/Timer'
import GroupIcon from '@material-ui/icons/Group'

export default class RecentSessionCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            member: props.session.member.name,
            partner: props.session.partner.name,
            group: props.session.group.name,
            duration: props.session.duration
        }
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
                        <ListItemText primary={this.state.member} />
                        <ListItemText align="right" inset primary={`${duration.toFixed(2)} hrs`} />
                        <ListItemIcon>
                            <DurationIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PartnerIcon />
                        </ListItemIcon>
                        <ListItemText primary={this.state.partner} />
                        <ListItemText align="right" inset primary={this.state.group} />
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                    </ListItem>
                </List>
            </Paper>
        )
    }
}

