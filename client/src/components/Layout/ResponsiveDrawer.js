import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "react-router-dom/Link";
import GroupMenuList from "./GroupMenuList";
import PartnerMenuList from "./PartnerMenuList";
import SettingsMenuList from "./SettingsMenuList";
import UsersMenuList from "./UsersMenuList";
import MetaTags from "react-meta-tags";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  mobileLogo: {
    paddingTop: 10,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  hideOnMobile: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  fullWidth: {
    width: "100%"
  },
  paddingless: {
    padding: 0
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    left: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes, theme, children } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <MenuList>
            <MenuItem component={Link} to="/admin" style={{ height: "100%" }}>
              {this.props.orgLogo}
            </MenuItem>
          </MenuList>
        </div>
        {this.props.contents}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 10,
            paddingLeft: 50,
            paddingRight: 50
          }}
        >
          {this.props.thymeLogo}
        </div>
      </div>
    );

    return (
      <div className={classes.root}>
        <SwipeableDrawer
          anchor="left"
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          onOpen={this.toggleDrawer("left", true)}
        >
          <div>{drawer}</div>
        </SwipeableDrawer>

        <CssBaseline />
        <AppBar color="secondary" position="fixed" className={classes.appBar}>
          <Grid justify="space-between" container style={{ width: "100%" }}>
            <Grid item xs={3}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon color="primary" />
                </IconButton>
                <MenuList>
                  <MenuItem
                    className={classes.hideOnMobile}
                    style={{ height: "100% padding: 0" }}
                  >
                    <Typography variant="h4">
                      {this.props.title}Page Title
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Toolbar>
            </Grid>
            <Grid item xs={6} className={classes.mobileLogo}>
              {this.props.orgLogo}
            </Grid>

            <Grid item xs={3}>
              <MenuList>
                <MenuItem
                  className={classes.hideOnMobile}
                  component={Link}
                  to="/"
                  style={{
                    height: "100%",
                    paddingRight: 20,
                    justifyContent: "flex-end"
                  }}
                >
                  Log Out
                </MenuItem>
              </MenuList>
            </Grid>
          </Grid>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <MetaTags>
            <title>ThymeCloq</title>
            <meta
              id="meta-description"
              name="description"
              content="Some description."
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </MetaTags>
          {children}
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
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
