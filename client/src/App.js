import React, { Component, memo, Fragment } from 'react';
import WebFont from 'webfontloader';
import Grid from '@material-ui/core/Grid'
import AdminLayout from './components/Layout/AdminLayout'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';
import Button from '@material-ui/core/Button';
WebFont.load({
  google: {
    families: ['Roboto']
  }
});
export default class App extends Component {

  state = {
    url: ""
  }

  componentDidMount(){
    fetch(`http://localhost:3000/qr/`)
            .then(response => response.json())
            .then(data => {
                this.setState({ url: data.img })
                console.log(data)
            })
            .catch(err => console.error(this.props.url, err.toString()))
  }

  render() {
    return (
      <BrowserRouter>
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
            <img style={{width: "50vw"}} src={this.state.url}/>
          </Grid>
        } />
        <Route path="/admin" component={AdminLayout} />
        <Route path="/Dashboard" component={AdminLayout} />
      </BrowserRouter>
    );
  }
}
