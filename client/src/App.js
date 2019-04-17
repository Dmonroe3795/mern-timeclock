import React, { Component, memo, Fragment } from 'react';
import WebFont from 'webfontloader';
import Grid from '@material-ui/core/Grid'
import AdminLayout from './components/Layout/AdminLayout'
import Callback from './components/Layout/Callback'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';
import Button from '@material-ui/core/Button';

import Auth from './Auth/Auth';
import LoginControl from './Auth/LoginControl';


function login() {
  const auth = new Auth();
  auth.login()
}

WebFont.load({
  google: {
    families: ['Roboto']
  }
});
export default class App extends Component {
  state = { 
    auth: {}
  }
  componentDidMount() {
    this.setState({auth: new Auth()})
  }
  render() {
    return (
      <BrowserRouter>
        <LoginControl auth = {this.state.auth}/>
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
            <Button variant="outlined" onClick = {this.state.auth.login} color="primary" size="large" style={{ width: "100%" }}>
               Login
            </Button>
          </Grid>
        } />
        <Route path="/admin" component={AdminLayout} />
        <Route path="/Dashboard" component={AdminLayout} />
        <Route path="/callback" component={Callback} />
      </BrowserRouter>
    );
  }
}
