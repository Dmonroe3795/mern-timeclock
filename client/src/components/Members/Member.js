import React, { component } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent"
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandMore';
import ExpandMore from '@material-ui/icons/KeyboardArrowRight';
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import HoursIcon from '@material-ui/icons/Timer';
import Session from './Session'
import TimerIcon from '@material-ui/icons/Timer'

const styles = theme => ({
    inset: {
        marginLeft: 10
    },
});

class Member extends React.Component {

    state = {
        sessions: [],
        mobileOpen: false,
        open: false
    };

    constructor() {
        super();
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { classes, theme, children } = this.props;
        const { name, totalHours, sessions } = this.props.member;
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
            </div>
        );
    }
}

export default withStyles(styles)(Member);