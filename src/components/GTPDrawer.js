import React from 'react';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import AppBar from 'material-ui/AppBar';

const styles = {
    title: {
        cursor: 'pointer',
    }
};

const MyAwesomeReactComponent = (props) => (
  <Drawer
    width={200}
    docked={false}
    open={props.isDrawerOpen}
    onRequestChange={(open) => props.setDrawerState(open)}
  >
    <AppBar
      className="appbar"
      title={<span style={styles.title}>Menu</span>}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      onTitleClick={()=>{alert('you clicked title')}}
      onLeftIconButtonClick={props.toggleDrawer}
    />
    <Subheader>Place Holder</Subheader>
  </Drawer>
);

export default MyAwesomeReactComponent;