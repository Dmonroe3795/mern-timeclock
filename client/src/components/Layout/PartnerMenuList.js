import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandMore';
import ExpandMore from '@material-ui/icons/KeyboardArrowRight';
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PartnerIcon from '@material-ui/icons/Business'
import AddPartnerIcon from '@material-ui/icons/AddLocation'
import TimelineIcon from '@material-ui/icons/Timeline'
import ManageIcon from '@material-ui/icons/ListAlt'
import { withStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings'

const styles = theme => ({
    inset: {
      marginLeft: 10
    },
  });

class PartnerMenu extends React.Component{
    state = {
        mobileOpen: false,
        open:false
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
                        <PartnerIcon/>
                    </ListItemIcon>
                    <ListItemText inset primary="Partners" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem button>
                        <ListItemIcon className={classes.inset}>
                            <AddPartnerIcon/>
                        </ListItemIcon>
                        <ListItemText inset primary="Add Partner" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon className={classes.inset}>
                            <ManageIcon/>
                        </ListItemIcon>
                        <ListItemText inset primary="Manage" />
                    </ListItem>
                    <ListItem  button>
                        <ListItemIcon className={classes.inset}>
                            <TimelineIcon/>
                        </ListItemIcon>
                        <ListItemText inset primary="Reports" />
                    </ListItem>
                    <ListItem  button>
                        <ListItemIcon className={classes.inset}>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText inset primary="Settings" />
                    </ListItem>
                    </List>
                </Collapse>
            </List>
        );
    }
}

export default withStyles(styles)(PartnerMenu);
