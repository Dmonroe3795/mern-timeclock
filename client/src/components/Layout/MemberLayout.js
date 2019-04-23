import React, { useState } from "react";
import { BrowserRouter, Switch, Link, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import TimeClockManager from "../Member/TimeClockManager"

const styles = theme => ({
  inset: {
    marginLeft: 10
  }
}); 

function MemberLayout(){
    return(
        <BrowserRouter>
          <Switch>
          <TimeClockManager mem={{name: "John Doe"}} />
            {/* <Route exact path="/" render={() =>(
              
            )} /> */}
          </Switch>
        </BrowserRouter>
    )
}

export default withStyles(styles)(MemberLayout);
