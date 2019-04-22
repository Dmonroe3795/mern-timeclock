import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import GroupPanel from "./GroupPanel";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import GroupList from "./GroupList";

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 5,
    left: theme.spacing.unit * 32,
    [theme.breakpoints.down("xs")]: {
      right: theme.spacing.unit * 5,
      left: "auto"
    },
    color: "#fff"
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

        <Tooltip
          title="Add Group"
          placement="right"
          className={classes.tooltip}
        >
          <Fab
            color="secondary"
            aria-label="Add"
            className={classes.fab}
            onClick={this.addGroup}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(styles)(ManageGroupList);
