import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandMore';
import ExpandMore from '@material-ui/icons/KeyboardArrowRight';
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GeneralIcon from '@material-ui/icons/Tune'
import SettingsIcon from '@material-ui/icons/Settings'
import ThemeIcon from '@material-ui/icons/Style'
import AdminIcon from '@material-ui/icons/Security'
import { withStyles } from '@material-ui/core/styles';

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
                        <SettingsIcon/>
                    </ListItemIcon>
                    <ListItemText inset primary="Settings" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem className={classes.inset} button>
                            <ListItemIcon>
                                <GeneralIcon/>
                            </ListItemIcon>
                            <ListItemText inset primary="General" />
                        </ListItem>
                        <ListItem className={classes.inset} button>
                            <ListItemIcon>
                                <ThemeIcon/>
                            </ListItemIcon>
                            <ListItemText inset primary="Theme" />
                        </ListItem>
                        <ListItem className={classes.inset} button>
                            <ListItemIcon>
                                <AdminIcon/>
                            </ListItemIcon>
                            <ListItemText inset primary="Admin" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        );
    }
}

export default withStyles(styles)(PartnerMenu);