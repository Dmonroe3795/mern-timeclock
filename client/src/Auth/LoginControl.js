import React, { Component } from 'react';
import { AppBar, Button } from '@material-ui/core/';

class LoginControl extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <AppBar fluid>
          <AppBar>
            <AppBar>
              <a href="#">Auth0 - React</a>
            </AppBar>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, '')}
            >
              Home
            </Button>
            {
              !isAuthenticated && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </AppBar>
        </AppBar>
      </div>
    );
  }
}

export default LoginControl;