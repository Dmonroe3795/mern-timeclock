import React, { Component, memo, Fragment } from 'react';
import WebFont from 'webfontloader';
import NavBar from './components/NavBar';
import Grid from '@material-ui/core/Grid'
import MemberGrid from './components/MemberGrid';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';
import Button from '@material-ui/core/Button';

WebFont.load({
  google: {
    families: ['Roboto']
  }
});
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Route exact path="/" render={() =>
              <Grid container direction='column' alignContent='center'>
              <Link exact to="/Dashboard" style={{textDecoration: 'none', width: '50%', marginBottom: 20}} >
              <Button  variant="outlined" color="primary"  size="large" style={{width: "100%"}}>
                Member Dashboard
                </Button>
              </Link>
              <Link exact to="/Admin" style={{textDecoration: 'none', width: '50%', marginBottom: 20}} >
              <Button  variant="outlined" color="primary"  size="large" style={{width: "100%"}}>
                Admin Dashboard
                </Button>
              </Link>
              </Grid>
            }/>
            <Route path="/Admin" component={MemberGrid}/>
            <Route path="/Dashboard" component={MemberGrid}/>
      </BrowserRouter>
    );
  }
}
