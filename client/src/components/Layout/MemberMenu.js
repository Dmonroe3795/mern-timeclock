import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandMore";
import ExpandMore from "@material-ui/icons/KeyboardArrowRight";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PartnerIcon from "@material-ui/icons/Business";
import GroupIcon from "@material-ui/icons/Group";
import HistoryIcon from "@material-ui/icons/History";
import ManageIcon from "@material-ui/icons/ListAlt";
import { withStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";

const styles = theme => ({
  inset: {
    marginLeft: 10
  }
});

class PartnerMenu extends React.Component {
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
        <ListItem button>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText inset primary="History" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PartnerIcon />
          </ListItemIcon>
          <ListItemText inset primary="Partners" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText inset primary="Groups" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Settings" />
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(PartnerMenu);
