import React, { component } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent"
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Member from '../Members/Member';
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


export default class Group extends React.Component {

    state = {
        members: []
    }

    constructor() {
        super();
        this.getMembers();
    }

    getMembers = async (members) => {
        const response = await fetch('/members', {
            method: 'GET',
        });
        this.setState({ members: await response.json() })
    }

    render() {
        return (
            <div>

                <List component="nav">
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText inset primary={name} />
                        <ListItemText align="right" inset primary={totalHours} />
                        <ListItemIcon>
                            <TimerIcon />
                        </ListItemIcon>
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="nav">
                            <ListItem style={{ paddingTop: 0 }} className="paddingless">
                                <ListItemText primary="Partner" />
                                <ListItemText align="right" inset primary="Duration" />
                            </ListItem>
                        </List>
                        {sessions.map(session => (
                            <Session session={session} />
                        ))}
                    </Collapse>
                </List>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.props.group.name}
                        </Typography>
                        <ul>
                            {this.state.members.map(member => (
                                <Member member={member.id} />
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        );
    }
}