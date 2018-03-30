import React from 'react';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class GTPDrawer extends React.Component {
  constructor(props) {
      super(props);
  }

  renderTrips = (trip) =>(
    <MenuItem
    key={trip.tripId}
    onClick={()=>{
      this.props.updateSelectedTrip(trip.tripId);
      this.props.toggleDrawer();
    }}
    >{trip.tripName}</MenuItem>
  )

  render() {
      return (
        <Drawer
        width={200}
        docked={false}
        open={this.props.isDrawerOpen}
        onRequestChange={this.props.toggleDrawer}
      >
        <AppBar
          className="appbar"
          // title={<span style={styles.title}>Menu</span>}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onTitleClick={() => { alert('you clicked title') }}
          onLeftIconButtonClick={this.props.toggleDrawer}
        />
        <Subheader>Most Recent Trips</Subheader>
        <Menu>
          {this.props.recentTrips && this.props.recentTrips.map(this.renderTrips, this)}
        </Menu>
    
      </Drawer>
      );
  }
}


export default GTPDrawer;