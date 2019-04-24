import React, { useState } from "react";
import { BrowserRouter, Switch, Link, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import TimeClockManager from "../Member/TimeClockManager";
import NavDrawer from "./ResponsiveDrawer";
import MemberMenu from "./MemberMenu";
import Logo from "../../AB-logo.png";
import Thyme from "../../thyme.PNG";
import MemberTabs from "../Member/MemberTabs";

const styles = theme => ({
  inset: {
    marginLeft: 10
  }
});

function MemberLayout() {
  const memb = { name: "John Doe", _id: "5cb0ece43e522a95dd4c5390" };
  console.log(memb);
  return (
    <div>
      <NavDrawer
        contents={
          <div>
            <MemberMenu />
          </div>
        }
        thymeLogo={<img src={Thyme} style={{ width: "100%", maxWidth: 100 }} />}
        orgLogo={<img src={Thyme} style={{ maxWidth: 200 }} />}
      >
        <TimeClockManager mem={memb} />
        <MemberTabs mem={memb} />
      </NavDrawer>
      {/* <Route exact path="/" render={() =>(
              
            )} /> */}
    </div>
  );
}
export default withStyles(styles)(MemberLayout);
