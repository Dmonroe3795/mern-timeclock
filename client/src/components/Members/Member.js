import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
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
    editable: {
        paddingLeft: 5,
        paddingRight: 5,
        '&:hover': {
            backgroundColor: (0, _colorManipulator.fade)(theme.palette.text.primary, theme.palette.action.hoverOpacity),
            borderRadius: 4
        }
    }
});

function Member({ url, memberID, classes }) {
    const [member, setMember] = useState({})
    const [sessions, setSessions] = useState([])
    const [mobileOpen, setMobileOpen] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/members/${memberID}`)
            const data = await res.json()
            await setMember(data)
            await setSessions(data.sessions)
            await console.log(member)
            await console.log(sessions)
        }
        fetchData()
    }, [])

    function handleClick() {
        setOpen(!open);
    };

    return (
        <div>
            <List component="nav">
                <ListItem>
                    <ListItemIcon style={{ paddingLeft: 5, cursor: 'pointer' }} onClick={handleClick}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemIcon>
                    <Tooltip title="Click to edit" placement="right">
                        <Typography onClick variant="subheading" className={classes.editable}>
                            {member.name}
                        </Typography>
                    </Tooltip>
                    <ListItemText />
                    <ListItemIcon align="right">
                        <PersonIcon />
                    </ListItemIcon>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List>
                        <ListItem>
                            <ListItemText style={{ paddingLeft: 50 }}>
                                Total Hours:
                                </ListItemText>
                            <ListItemText align="right" inset primary={`${(Math.round(member.totalHours * 4) / 4).toFixed(2)}`} />
                            <ListItemIcon>
                                <TimerIcon />
                            </ListItemIcon>
                        </ListItem>
                    </List>
                    {sessions.map(session => (
                        <Session session={session} />
                    ))}
                    <Divider />
                </Collapse>
            </List>
        </div >
    );
}

export default withStyles(styles)(Member);