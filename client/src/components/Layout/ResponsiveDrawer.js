import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import App from '../../App';
import Link from 'react-router-dom/Link'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  fullWidth: {
    width: "100%"
  },
  paddingless: {
    padding: 0
  }
});

class ResponsiveDrawer extends React.Component {
componentDidMount(){

}

  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, children } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <MenuList>
            <MenuItem component={Link} to="/">
              Org Logo
            </MenuItem>
          </MenuList>
        </div>
        
        <Divider />
        <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Groups</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.paddingless}>
        <List className={classes.fullWidth}>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="New Group" />
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Group 1" />
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Group 2" />
          </ListItem>
        </List>
        </ExpansionPanelDetails>
        </ExpansionPanel>
        
        <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component={Link} to="/Admin" style={{textDecoration: "none", width: "100%"}}className={classes.heading}>Affiliates</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.paddingless}>
        <List className={classes.fullWidth}>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="New Affliliate" />
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Affiliate 1" />
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Affiliate 2" />
          </ListItem>
        </List>
        </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component={Link} to="/Dashboard" style={{textDecoration: "none", width: "100%"}}className={classes.heading}>Settings</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.paddingless}>
        <List className={classes.fullWidth}>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="General" />
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Affiliate" />
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Theme" />
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItem>
        </List>
        </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <MenuList>
            <MenuItem component={Link} to="/" style={{fontSize: 25, color: "white"}}>
              Timeclock - Org Name
            </MenuItem>
          </MenuList>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          { children }
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);