import React, { Component, memo, Fragment } from 'react';
import WebFont from 'webfontloader';
import Grid from '@material-ui/core/Grid'
import AdminLayout from './components/Layout/AdminLayout'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';

WebFont.load({
  google: {
    families: ['Roboto']
  }
});
export default class App extends Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {

    const sideList = (
      <div>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );


    return (
      <BrowserRouter>

        <SwipeableDrawer
          anchor="top"
          open={this.state.top}
          onClose={this.toggleDrawer('top', false)}
          onOpen={this.toggleDrawer('top', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('top', false)}
            onKeyDown={this.toggleDrawer('top', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>

        <Route exact path="/" render={() =>
          <Grid container direction='column' alignContent='center'>
            <Link exact to="/Dashboard" style={{ textDecoration: 'none', width: '50%', marginBottom: 20 }} >
              <Button variant="outlined" color="primary" size="large" style={{ width: "100%" }}>
                Member Dashboard
                </Button>
            </Link>
            <Link to="/Admin" style={{ textDecoration: 'none', width: '50%', marginBottom: 20 }} >
              <Button variant="outlined" color="primary" size="large" style={{ width: "100%" }}>
                Admin Dashboard
                </Button>
            </Link>
          </Grid>
        } />
        <Route path="/admin" component={AdminLayout} />
        <Route path="/Dashboard" component={AdminLayout} />
      </BrowserRouter>
    );
  }
}
