import React, { Component, memo, Fragment } from 'react';
import WebFont from 'webfontloader';
import Grid from '@material-ui/core/Grid'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import MemberGrid from './MemberGrid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

WebFont.load({
  google: {
    families: ['Roboto']
  }
});

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    spacing: 10
  }
});

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};


class Login extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes, theme } = this.props;

    return (
      <BrowserRouter>
        <Grid container direction="column" alignItems="center">
          <AppBar position="static" color="default" style={{width: "50vw"}}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="Member" />
                <Tab label="Admin" />
              </Tabs>
        </AppBar>
        <SwipeableViews className="full-width" style={{boxShadow: '0 5px 5px -2px darkgrey', width: "50vw"}}
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
          <Grid container direction="column" alignItems="center">
            <TextField style={{width: "50%"}}
              id="standard-with-placeholder"
              label="Email"
              placeholder="Enter Email"
              className={classes.textField}
              margin="normal"
            />
            <TextField style={{width: "50%"}}
              id="standard-with-placeholder"
              label="Password"
              placeholder="Enter Password"
              className={classes.textField}
              margin="normal"
              type="password"
              autoComplete="current-password"
            />
            <Link exact to="/members" style={{textDecoration: 'none', width: '50%'}} >
            <Button  variant="outlined" color="primary"  size="large" style={{width: "100%"}} className={classes.margin}>
              Login
              </Button>
            </Link>
          </Grid>
          </TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
        </SwipeableViews>
        </Grid>
        <div className={classes.root}>
        <Route path="/members" component={MemberGrid}/>
      </div>
      </BrowserRouter>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Login);
