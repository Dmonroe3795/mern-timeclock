import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

const styles = theme => ({
  fab: {
    color: "#fff"
  },
  mainContent: {
    width: "100%",
    marginTop: 60,
    maxWidth: 1000
  },
  editable: {
    paddingLeft: 5,
    paddingRight: 5,
    "&:hover": {
      backgroundColor: (0, _colorManipulator.fade)(
        theme.palette.text.primary,
        theme.palette.action.hoverOpacity
      ),
      borderRadius: 4
    }
  },
  hideOnMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  fwOnMobile: {
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  }
});

function ManageContentHeader({ addFunction, title, classes }) {
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);

  return (
    <Grid alignItems="center" style={{ width: "100%" }} container>
      <Grid className="mainContent" item xs={12} sm={12} md={3}>
        <Tooltip
          title="Add Group"
          placement="right"
          AlignItems="center"
          className={classes.tooltip}
        >
          <Button
            onClick={addFunction}
            variant="outlined"
            color="primary"
            className={(classes.button, classes.fwOnMobile)}
          >
            <AddIcon style={{ fontSize: 15, marginRight: 10 }} /> New {title}
          </Button>
        </Tooltip>
      </Grid>
      <Grid
        style={{ display: "flex", justifyContent: "flex-end" }}
        className="mainContent"
        item
        xs={12}
        sm={12}
        md={9}
      >
        <Typography
          className={classes.hideOnMobile}
          color="secondary"
          variant="h4"
          style={{
            height: "100%",
            marginRight: 15
          }}
        >
          {title} Management
        </Typography>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ManageContentHeader);
