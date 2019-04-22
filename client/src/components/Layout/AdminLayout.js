import React from "react";
import NavDrawer from "./ResponsiveDrawer";
import { BrowserRouter, Switch, Link, Route } from "react-router-dom";
import GroupMenuList from "./GroupMenuList";
import UsersMenuList from "./UsersMenuList";
import PartnerMenuList from "./PartnerMenuList";
import SettingsMenuList from "./SettingsMenuList";
import ResponsiveImage from "../ResponsiveImage";
import AddGroupForm from "../Groups/AddGroupForm";
import ManageGroupList from "../Groups/ManageGroupList";
import GroupReports from "../Groups/GroupReports";
import RecentActivity from "../RecentActivity/RecentActivity";
import ManageMembersList from "../Members/ManageMembersList";
import Logo from "../../AB-logo.png";
import Thyme from "../../thyme.PNG";

export default class AdminLayout extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavDrawer
          contents={
            <div>
              <GroupMenuList />
              <UsersMenuList />
              <PartnerMenuList />
              <SettingsMenuList />
            </div>
          }
          thymeLogo={
            <img src={Thyme} style={{ width: "100%", maxWidth: 100 }} />
          }
          orgLogo={<img src={Thyme} style={{ maxWidth: 200 }} />}
        >
          <Switch>
            <Route exact path="/admin" component={RecentActivity} />
            <Route exact path="/admin/groups/add" component={AddGroupForm} />
            <Route
              exact
              path="/admin/groups/manage"
              component={ManageGroupList}
            />
            <Route
              exact
              path="/admin/groups/reports"
              component={GroupReports}
            />
            <Route
              exact
              path="/admin/users/manage"
              component={ManageMembersList}
            />
          </Switch>
        </NavDrawer>
      </BrowserRouter>
    );
  }
}
