import React from 'react';
import NavDrawer from './ResponsiveDrawer';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import GroupMenuList from './GroupMenuList';
import AddGroupForm from '../Groups/AddGroupForm'
import ManageGroupList from '../Groups/ManageGroupList';
import GroupReports from '../Groups/GroupReports';
import RecentActivity from '../RecentActivity/RecentActivity';
import ManageMembersList from '../Members/ManageMembersList'


export default class AdminLayout extends React.Component{
  render() {
    return (
      <BrowserRouter>
        <NavDrawer>
            <Switch>
              <Route exact path="/admin" component={RecentActivity}/>
              <Route exact path="/admin/groups/add" component={AddGroupForm}/>
              <Route exact path="/admin/groups/manage" component={ManageGroupList}/>
              <Route exact path="/admin/groups/reports" component={GroupReports}/>
              <Route exact path="/admin/users/manage" component={ManageMembersList}/>
            </Switch>
        </NavDrawer>
      </BrowserRouter>
    );
  }
}