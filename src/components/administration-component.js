import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AdminUserList from './admin-user-list-component';
import UserAddComponent from './admin-user-add-component';
import UserResetPassword from './admin-user-reset-component';

export default function AdministrationComponent() {

  
    return (
      <Tabs>
      <TabList>
        <Tab>Maintain Users</Tab>
        <Tab>Add User</Tab>
        <Tab>Reset User Password</Tab>
      </TabList>
  
      <TabPanel>
        <AdminUserList />
      </TabPanel>
      <TabPanel>
        <UserAddComponent />
      </TabPanel>
      <TabPanel>
        <UserResetPassword />
      </TabPanel>
    </Tabs>
    )
  }