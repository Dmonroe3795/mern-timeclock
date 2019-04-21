import React, { useState } from "react";
import { BrowserRouter, Switch, Link, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import ClockIn from "../Member/ClockIn"

const styles = theme => ({
  inset: {
    marginLeft: 10
  }
}); 

function MemberLayout(){
    return(
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ClockIn} />
          </Switch>
        </BrowserRouter>
    )
}

export default withStyles(styles)(MemberLayout);
