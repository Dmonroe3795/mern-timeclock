import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandMore';
import ExpandMore from '@material-ui/icons/KeyboardArrowRight';
import StarBorder from '@material-ui/icons/StarBorder';
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group'
import AddGroupIcon from '@material-ui/icons/GroupAdd'
import TimelineIcon from '@material-ui/icons/Timeline'
import ManageIcon from '@material-ui/icons/ListAlt'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
    inset: {
      marginLeft: 10
    },
  });

class GroupMenu extends React.Component{
    state = {
        mobileOpen: false,
        open:true
    };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { classes, theme, children } = this.props;

        return (
            <List component="nav">
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        <GroupIcon/>
                    </ListItemIcon>
                    <ListItemText inset primary="Groups" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem component={Link} to="/admin/groups/add" className={classes.inset} button>
                        <ListItemIcon>
                            <AddGroupIcon/>
                        </ListItemIcon>
                        <ListItemText inset primary="Add" />
                    </ListItem>
                    <ListItem component={Link} to="/admin/groups/manage" className={classes.inset} button>
                        <ListItemIcon>
                            <ManageIcon/>
                        </ListItemIcon>
                        <ListItemText inset primary="Manage" />
                    </ListItem>
                    <ListItem component={Link} to="/admin/groups/reports" className={classes.inset}  button>
                        <ListItemIcon>
                            <TimelineIcon/>
                        </ListItemIcon>
                        <ListItemText  inset primary="Reports" />
                    </ListItem>
                    </List>
                </Collapse>
            </List>
        );
    }
}

export default withStyles(styles)(GroupMenu);
