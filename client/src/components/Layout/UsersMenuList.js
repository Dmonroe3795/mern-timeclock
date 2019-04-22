import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandMore";
import ExpandMore from "@material-ui/icons/KeyboardArrowRight";
import StarBorder from "@material-ui/icons/StarBorder";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import TimelineIcon from "@material-ui/icons/Timeline";
import ManageIcon from "@material-ui/icons/ListAlt";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";

const styles = theme => ({
  inset: {
    marginLeft: 10
  }
});

class UserMenu extends React.Component {
  state = {
    mobileOpen: false,
    open: false
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
            <PersonIcon />
          </ListItemIcon>
          <ListItemText inset primary="Users" />
          {this.state.open ? (
            <ExpandLess color="primary" />
          ) : (
            <ExpandMore color="primary" />
          )}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem component={Link} to="/admin/users/manage" button>
              <ListItemIcon className={classes.inset}>
                <ManageIcon />
              </ListItemIcon>
              <ListItemText inset primary="Manage" />
            </ListItem>
            <ListItem component={Link} to="/admin/users/reports" button>
              <ListItemIcon className={classes.inset}>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText inset primary="Reports" />
            </ListItem>
            <ListItem component={Link} to="/admin/users/settings" button>
              <ListItemIcon className={classes.inset}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText inset primary="Settings" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
  }
}

export default withStyles(styles)(UserMenu);
