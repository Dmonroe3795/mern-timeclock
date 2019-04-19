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
import Divider from '@material-ui/core/Divider'
import Session from './MemberSessionData'
import TimerIcon from '@material-ui/icons/Timer'
import Tooltip from '@material-ui/core/Tooltip'

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

const styles = theme => ({
    inset: {
        marginLeft: 10
    },
    editable :{
        paddingLeft: 5,
        paddingRight: 5,
        '&:hover': {
             backgroundColor:(0, _colorManipulator.fade)(theme.palette.text.primary, theme.palette.action.hoverOpacity),
             borderRadius: 4
        }
    }
});

class Member extends React.Component {

    state = {
        member: {},
        sessions: [],
        mobileOpen: false,
        open: false
    };

    loadData() {
        fetch(`/members/${this.props.member}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ member: data })
                this.setState({ sessions: data.sessions });
                console.log(this.state.member)
            })
            .catch(err => console.error(this.props.url, err.toString()))
    }

    componentDidMount() {
        this.loadData()
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {

        return (
            <div>
                <List component="nav">
                    <ListItem>
                        <ListItemIcon style={{ paddingLeft: 5, cursor: 'pointer' }} onClick={this.handleClick}>
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemIcon>
                        <Tooltip title="Click to edit" placement="right">
                            <Typography onClick variant="subheading" className={this.props.classes.editable}>
                                    {this.state.member.name}
                            </Typography>
                        </Tooltip>
                        <ListItemText />
                        <ListItemIcon align="right">
                            <PersonIcon />
                        </ListItemIcon>
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List>
                        <ListItem>
                            <ListItemText style={{paddingLeft: 50}}>
                                Total Hours: 
                                </ListItemText>
                            <ListItemText align="right" inset primary={`${(Math.round(this.state.member.totalHours * 4) / 4).toFixed(2)}`} />
                            <ListItemIcon>
                                <TimerIcon />
                            </ListItemIcon>
                        </ListItem>
                    </List>
                    
                        {this.state.sessions.map(session => (
                            <Session session={session} />
                        ))}
                        <Divider />
                    </Collapse>
                </List>
            </div >
        );
    }
}

export default withStyles(styles)(Member);