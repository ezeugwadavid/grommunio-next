// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2020-2022 grommunio GmbH

import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  Drawer, Tab, Tabs, Toolbar,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { AccountBox, CalendarMonth, ContactEmergency, Mail, Note, Task } from '@mui/icons-material';
import { useState } from 'react';
import { useAppContext } from '../azure/AppContext';

const styles = theme => ({
  /* || Side Bar */
  drawer: {
    width: 90,
  },
  drawerPaper: {
    backgroundColor: '#f0f0f0',
    width: 90,
    overflowX: 'hidden',
    overflowY: 'auto',
    borderRight: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2, 0, 2),
    ...theme.mixins.toolbar,
    justifyContent: 'center',
    height: 64,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
});

const tabs = [
  { label: "Account", icon: AccountBox, route: "/" },
  { label: "Messages", icon: Mail, route: "/messages" },
  { label: "Calendar", icon: CalendarMonth, route: "/calendar" },
  { label: "Contacts", icon: ContactEmergency, route: "/contacts" },
  { label: "Tasks", icon: Task, route: "/tasks" },
  { label: "Notes", icon: Note, route: "/notes" },
]

function ResponsiveDrawer({ classes }) {
  const app = useAppContext();
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleTabClicked = route => () => navigate(route)

  return (
    <Drawer
      classes={{
        root: classes.drawer,
        paper: classes.drawerPaper,
      }}
      variant="permanent"
      open
    >
      <Toolbar />
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tab}
        onChange={handleTab}
      >
        {tabs.map(({ label, icon: Icon, route }) =>
          <Tab
            disabled={!app.user}
            key={label}
            icon={<Icon fontSize="large"/>}
            onClick={handleTabClicked(route)}
          />
        )}
      </Tabs>
    </Drawer>
  );
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(withStyles(styles)(ResponsiveDrawer));
