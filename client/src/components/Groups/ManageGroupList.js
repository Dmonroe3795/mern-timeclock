import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import GroupPanel from "./GroupPanel";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import GroupList from "./GroupList";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ManageContentHeader from "../ManageContentHeader";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  fab: {
    color: "#fff"
  },
  mainContent: {
    width: "100%",
    marginTop: 60,
    maxWidth: 1000
  }
});

class ManageGroupList extends Component {
  state = {
    groups: []
  };

  constructor() {
    super();
    this.getGroups();
  }

  getGroups = async () => {
    const response = await fetch("/groups", {
      method: "GET"
    });
    this.setState({ groups: await response.json() });
  };

  addGroup = () => {
    fetch(`/groups/`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        name: "Test Group",
        members: ["5cb665381c9d440000d72b44"],
        emailWhiteList: [],
        requireWhiteList: false
      }) // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .then(data =>
        this.setState({
          groups: [...this.state.groups, data.createdGroup]
        })
      );

    //window.location.reload();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.groups.length > 0 ? (
          <div>
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{ width: "100%" }}
            >
              <Grid
                item
                justify="center"
                style={{ width: "100%", marginTop: 60, maxWidth: 1000 }}
              >
                <Grid
                  alignItems="center"
                  style={{ width: "93%", marginBottom: 20 }}
                  container
                >
                  <ManageContentHeader
                    title="Group"
                    addFunction={this.addGroup}
                  />
                </Grid>
                <GroupList groups={this.state.groups} />
              </Grid>
            </Grid>
          </div>
        ) : (
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
            style={{
              height: "60vw",
              fontSize: "1.5em"
            }}
          >
            <Grid item>No Groups Found :(</Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ManageGroupList);
