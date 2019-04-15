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
                    <ListItemText inset primary="Admin Settings" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button>
                            <ListItemIcon className={classes.inset}>
                                <GeneralIcon/>
                            </ListItemIcon>
                            <ListItemText inset primary="General" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon className={classes.inset}>
                                <ThemeIcon/>
                            </ListItemIcon>
                            <ListItemText inset primary="Theme" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        );
    }
}

export default withStyles(styles)(PartnerMenu);