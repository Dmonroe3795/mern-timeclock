import React, { Component, memo, Fragment } from 'react';
import WebFont from 'webfontloader';
import NavBar from './components/NavBar';
import Grid from '@material-ui/core/Grid'
import MemberGrid from './components/MemberGrid';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';

WebFont.load({
  google: {
    families: ['Roboto']
  }
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <NavBar />
          <Grid container spacing={24} style={{padding:24}}>
            <Grid item xs={12} sm= {6} lg={4} xl={3}>
              <Link to="/">
              Home
              </Link>
            </Grid>
            <Grid item xs={12} sm= {6} lg={4} xl={3}>
              <Link to="/members">
              Members
              </Link>
            </Grid>
          </Grid>

          <Route exact path="/" render={() => <h1>Welcome to the Home Page. Click Members link</h1>}/>
          <Route path="/members" component={MemberGrid}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
