import React from "react";

import { withMobileDialog, Dialog, IconButton, Fab } from "@material-ui/core";

class MobileContentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    if (this.props.fullScreen) {
      return (
        <React.Fragment>
          <Dialog
            fullScreen={true}
            open={this.state.open}
            style={{ backgroundOpacity: 0.5 }}
          >
            {this.props.children}
          </Dialog>
          {!this.state.open && <Fab />}
        </React.Fragment>
      );
    }
    return this.props.children;
  }
}

export default withMobileDialog()(MobileContentContainer);
