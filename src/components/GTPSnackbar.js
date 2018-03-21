import Snackbar from 'material-ui/Snackbar';

import React from 'react';
import { connect } from 'react-redux';
import { loginWithToken, loginWithPassword } from '../actions';


class GTPSnackbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Snackbar
            open={this.props.isSnackbarOpen}
            message={this.props.snackbarMessage}
            autoHideDuration={4500}
          />
        );
    }
}

const mapStateToProps = (state) => {
    return {
      isSnackbarOpen: state.isSnackbarOpen,
      snackbarMessage: state.snackbarMessage
    }
  }

GTPSnackbar = connect(mapStateToProps)(GTPSnackbar);
export default GTPSnackbar