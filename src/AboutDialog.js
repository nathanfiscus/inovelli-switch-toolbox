import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListSubheader,
  withStyles,
} from "@material-ui/core";
import Twitter from "@material-ui/icons/Twitter";
import GitHub from "@material-ui/icons/GitHub";
import LinkedIn from "@material-ui/icons/LinkedIn";

const styles = (theme) => ({
  subheader: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.light,
  },
});

class AboutDialog extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>About</DialogTitle>
        <DialogContent>
          <Typography variant="h4" gutterBottom>
            Version 5.0.0 (Apr 2023)
          </Typography>
          <Typography variant="h6">About the Tool</Typography>
          <Typography variant="caption" gutterBottom={true}>
            This is a simple application to assist in calculating the
            configuration values to send to your Inovelli v2/v3 Z-Wave and
            Zigbee light switches. The values calculated by this tool can be
            used by any compatible Z-Wave controller. See your controller
            documentation for information on where to use the values produced by
            this tool. For Zigbee switches the tool is mostly helpful for a
            visual representation. Zigbee values can be used as is, but may need
            to be separated depending on your gateway.
          </Typography>
          <Typography variant="h6">Compatible Switches</Typography>
          <List
            dense={true}
            style={{ maxHeight: "300px", overflow: "auto", padding: "0" }}
          >
            <ListSubheader className={this.props.classes.subheader}>
              Z-Wave
            </ListSubheader>
            <ListItem>
              <ListItemText
                primary="Inovelli LZW30-SN"
                secondary="On/Off Switch"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Inovelli LZW31-SN"
                secondary="Dimmer Switch"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Inovelli LZW36"
                secondary="Fan+Light Dimmer"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Inovelli VZW31-SN"
                secondary="2-in-1 Switch + Dimmer"
              />
            </ListItem>
            <ListSubheader className={this.props.classes.subheader}>
              Zigbee
            </ListSubheader>
            <ListItem>
              <ListItemText
                primary="Inovelli VZM31-SN"
                secondary="2-in-1 Switch + Dimmer"
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Inovelli VZM35" secondary="Fan Switch" />
            </ListItem>
          </List>
          <Typography variant="h6">Credits</Typography>
          <Typography>Written By @nathanfiscus</Typography>
          <IconButton
            component="a"
            href="https://www.github.com/nathanfiscus/inovelli-notification-calc"
          >
            <GitHub />
          </IconButton>
          <IconButton component="a" href="https://www.twitter.com/nathanfiscus">
            <Twitter />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/nathanfiscus"
          >
            <LinkedIn />
          </IconButton>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AboutDialog);
