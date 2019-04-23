import React, { useState } from "react";
import { BrowserRouter, Switch, Link, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import TimeClockManager from "../Member/TimeClockManager";
import MemberSessions from "../Member/MemberSessions";

const styles = theme => ({
  inset: {
    marginLeft: 10
  }
});

function MemberLayout() {
  const memb = { name: "john doe", _id: "5cb0ece43e522a95dd4c5390" };
  console.log(memb)
  return (
    <div>
      <TimeClockManager mem={memb} />
      <MemberSessions member={memb} />
      {/* <Route exact path="/" render={() =>(
              
            )} /> */}
    </div>
  );
}

export default withStyles(styles)(MemberLayout);
