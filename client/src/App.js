import React, { Component, memo, Fragment } from "react";
import WebFont from "webfontloader";
import Grid from "@material-ui/core/Grid";
import AdminLayout from "./components/Layout/AdminLayout";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./App.css";
import Button from "@material-ui/core/Button";
import MemberLayout from "./components/Layout/MemberLayout";
import ClockIn from "./components/Member/ClockIn";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const abPrimary = "#0B224D";
const abSsecondary = "#FDB412";
const primary = "#6B7F32";
const secondary = "#87A63E";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#fafafa",
      paper: "#fff"
    },
    primary: {
      main: primary
    },
    secondary: {
      main: secondary
    },
    text: {
      disabled: "rgba(0, 0, 0, 0.26)",
      hint: secondary,
      primary: primary,
      secondary: secondary
    },
    action: {
      active: secondary,
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      hover: "rgba(0, 0, 0, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(0, 0, 0, 0.14)"
    }
  }
});

WebFont.load({
  google: {
    families: ["Roboto"]
  }
});
export default class App extends Component {
  state = {
    url: ""
  };

  componentDidMount() {
    fetch(`/qr/`)
      .then(response => response.json())
      .then(data => {
        this.setState({ url: data.img });
        console.log(data);
      })
      .catch(err => console.error(this.props.url, err.toString()));
    console.log(theme);
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Route
            exact
            path="/"
            render={() => (
              <Grid container direction="column" alignContent="center">
                <Link
                  exact
                  to="/Dashboard"
                  style={{
                    textDecoration: "none",
                    width: "50%",
                    marginBottom: 20
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    Member Dashboard
                  </Button>
                </Link>
                <Link
                  to="/Admin"
                  style={{
                    textDecoration: "none",
                    width: "50%",
                    marginBottom: 20
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    Admin Dashboard
                  </Button>
                </Link>
                <img style={{ width: "50vw" }} src={this.state.url} />
              </Grid>
            )}
          />
          <Route path="/admin" component={AdminLayout} />
          <Route path="/Dashboard" component={ClockIn} />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
