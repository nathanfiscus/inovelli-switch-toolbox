import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Tooltip,
  Menu,
  Snackbar,
} from "@material-ui/core";
import { withMobileDialog } from "@material-ui/core";
import Brightness0 from "@material-ui/icons/Brightness2";
import Brightness7 from "@material-ui/icons/Brightness7";
import InfiniteIcon from "@material-ui/icons/AllInclusive";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import ValueLabelTooltip from "./ValueLabelTooltip";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import DecoderDialog from "./DecoderDialog";
import Slide from "@material-ui/core/Slide";
import copyToClipboard from "./utils/ClipboardAccess";
import YAML from "json-to-pretty-yaml";
import { CONFIG_PARAMETER } from "./SwitchDefinitions/ConfigurationDefinitions";
import CopyIcon from "./icons/Copy";
import { longToByteArray, byteArrayToLong } from "./utils/ByteArray";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const styles = (theme) => ({
  colorHelper: {
    height: "10px",
    width: "100%",
    position: "relative",
    background:
      "linear-gradient(to right, rgb(255,0,0), rgb(255,125,0), rgb(255,255,0), rgb(125,255,0), rgb(0,255,0), rgb(0,255,125), rgb(0,255,255), rgb(0,125,255), rgb(0,0,255), rgb(125,0,255), rgb(255,0,255), rgb(255,0,125), rgb(255,0,0))",
  },
  colorHelperWhite: {
    height: "10px",
    width: "2px",
    position: "absolute",
    right: "0px",
    background: "white",
  },
  switchPicker: {
    marginBottom: theme.spacing(3),
  },
  valueWrapper: {
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    "&>*": {
      flex: "1 1 auto",
    },
  },
});

class NotificationCalc extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    parameters: PropTypes.object,
    onChange: PropTypes.func,
    type: PropTypes.string,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      decoderDialogOpen: false,
      anchor: null,
      snackbarOpen: false,
      copyStatusText: "",
    };
    this.configValue = React.createRef();
  }

  handleCopyNumber = () => {
    this.setState({ anchor: null });
    copyToClipboard(this.configurationValue, this.handleOnCopy);
  };

  handleCopyYAML = () => {
    this.setState({ anchor: null });
    if (this.props.protocol !== "zwave") {
      copyToClipboard(
        YAML.stringify(Object.values(this.props.config)),
        this.handleOnCopy
      );
    } else {
      copyToClipboard(
        YAML.stringify({
          parameter:
            typeof this.props.parameters[CONFIG_PARAMETER.LED_EFFECT] ===
            "number"
              ? this.props.parameters[CONFIG_PARAMETER.LED_EFFECT]
              : this.props.parameters[CONFIG_PARAMETER.LED_EFFECT][
                  this.props.selectedLED
                ],
          value:
            this.props.format === "10"
              ? parseInt(
                  byteArrayToLong([
                    this.props.config[this.props.byteOrder[0]],
                    this.props.config[this.props.byteOrder[1]],
                    this.props.config[this.props.byteOrder[2]],
                    this.props.config[this.props.byteOrder[3]],
                  ]).toString(Number(this.props.format || 10))
                )
              : byteArrayToLong([
                  this.props.config[this.props.byteOrder[0]],
                  this.props.config[this.props.byteOrder[1]],
                  this.props.config[this.props.byteOrder[2]],
                  this.props.config[this.props.byteOrder[3]],
                ]).toString(Number(this.props.format || 10)),
        }),
        this.handleOnCopy
      );
    }
  };

  handleCopyAllYAML = () => {
    this.setState({ anchor: null });
    if (this.props.protocol !== "zwave") {
      copyToClipboard(
        YAML.stringify(Object.values(this.props.config)),
        this.handleOnCopy
      );
    } else {
      copyToClipboard(
        YAML.stringify({
          parameter:
            typeof this.props.parameters[CONFIG_PARAMETER.LED_EFFECT] ===
            "number"
              ? this.props.parameters[CONFIG_PARAMETER.LED_EFFECT]
              : this.props.parameters[CONFIG_PARAMETER.LED_EFFECT][
                  this.props.selectedLED
                ],
          value:
            this.props.format === "10"
              ? parseInt(
                  byteArrayToLong([
                    this.props.config[this.props.byteOrder[0]],
                    this.props.config[this.props.byteOrder[1]],
                    this.props.config[this.props.byteOrder[2]],
                    this.props.config[this.props.byteOrder[3]],
                  ]).toString(Number(this.props.format || 10))
                )
              : byteArrayToLong([
                  this.props.config[this.props.byteOrder[0]],
                  this.props.config[this.props.byteOrder[1]],
                  this.props.config[this.props.byteOrder[2]],
                  this.props.config[this.props.byteOrder[3]],
                ]).toString(Number(this.props.format || 10)),
        }),
        this.handleOnCopy
      );
    }
  };

  setValue = (key) => (e, v) => {
    this.props.onChange(
      "notificationConfigs",
      key,
      key !== "effect" && key !== "type" ? v : e.target.value
    );
  };

  openDecoder = () => {
    this.setState({ decoderDialogOpen: true });
  };

  handleDecoderDialogClose = () => {
    this.setState({ decoderDialogOpen: false });
  };

  handleDecode = (value) => {
    const arr = longToByteArray(value);
    this.props.onChange("notificationConfigs", "all", {
      color: arr[0],
      level: arr[1],
      duration: arr[2],
      effect: arr[3],
    });
    this.setState({ decoderDialogOpen: false });
  };

  toggleMenu = (e) => {
    const { target } = e;
    this.setState((lastState) => ({
      anchor: lastState.anchor ? null : target,
    }));
  };

  handleOnCopy = (success) => {
    this.setState({
      snackbarOpen: true,
      copyStatusText: success
        ? "Copied to Clipboard"
        : "Unable to copy to clipboard. Check browser settings.",
    });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  get configurationValue() {
    let value;

    if (this.props.protocol === "zwave") {
      value = byteArrayToLong([
        this.props.config[this.props.byteOrder[0]],
        this.props.config[this.props.byteOrder[1]],
        this.props.config[this.props.byteOrder[2]],
        this.props.config[this.props.byteOrder[3]],
      ]).toString(Number(this.props.format || 10));
    } else {
      //let arr = Object.values(this.props.config);
      let arr = [
        this.props.config.effect,
        this.props.config.color,
        this.props.config.level,
        this.props.config.duration,
      ];
      if (this.props.selectedLED !== "all") {
        arr = [6 - this.props.selectedLED, ...arr];
      }

      value = arr.join(",");
    }
    return value;
  }

  configurationNumber(param) {
    return this.props.parameters[param]
      ? ` (Parameter ${
          typeof this.props.parameters[param] === "number"
            ? this.props.parameters[param]
            : this.props.parameters[param][this.props.selectedLED]
        })`
      : "";
  }

  render() {
    return (
      <div>
        <Typography gutterBottom>Color</Typography>
        <div
          className={this.props.classes.colorHelper}
          style={{
            filter:
              this.props.effect === "0" && this.props.type !== "fan-dimmer"
                ? "grayscale(75%)"
                : undefined,
          }}
        >
          {this.props.colorRange[0] === 0 && (
            <div className={this.props.classes.colorHelperWhite} />
          )}
        </div>
        <Slider
          defaultValue={1}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          min={this.props.colorRange[0]}
          max={this.props.colorRange[1]}
          value={this.props.config.color}
          onChange={this.setValue("color")}
          disabled={
            this.props.effect === "0" && this.props.type !== "fan-dimmer"
          }
        />

        <Typography gutterBottom>Brightness Level</Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Brightness0 />
          </Grid>
          <Grid item xs>
            <Slider
              value={this.props.config.level}
              valueLabelDisplay="auto"
              min={this.props.brightnessRange[0]}
              max={this.props.brightnessRange[1]}
              onChange={this.setValue("level")}
              disabled={
                this.props.effect === "0" && this.props.type !== "fan-dimmer"
              }
            />
          </Grid>
          <Grid item>
            <Brightness7 />
          </Grid>
        </Grid>
        <Typography gutterBottom>Duration</Typography>
        <Grid container spacing={2}>
          <Grid item>
            <TimelapseIcon />
          </Grid>
          <Grid item xs>
            <Slider
              value={this.props.config.duration}
              valueLabelDisplay="auto"
              valueLabelFormat={this.durationFormater}
              marks={[5, 10, 15, 20, 30, 45, 60, 120, 180, 240, 255]}
              min={1}
              max={255}
              onChange={this.setValue("duration")}
              ValueLabelComponent={ValueLabelTooltip}
              disabled={
                this.props.effect === "0" && this.props.type !== "fan-dimmer"
              }
            />
          </Grid>
          <Grid item>
            <InfiniteIcon />
          </Grid>
        </Grid>
        <FormControl fullWidth={true} margin="normal">
          <InputLabel>Effect</InputLabel>
          <Select
            value={this.props.config.effect}
            onChange={this.setValue("effect")}
          >
            {this.props.effects.map((effect) => (
              <MenuItem key={effect.value} value={effect.value}>
                {effect.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={this.props.classes.valueWrapper}>
          <TextField
            value={this.configurationValue}
            readOnly={true}
            label={`Configuration Value${this.configurationNumber(
              CONFIG_PARAMETER.LED_EFFECT
            )}`}
            fullWidth={true}
            margin="normal"
            variant="outlined"
            inputRef={this.configValue}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy to Clipboard">
                    <IconButton edge="end" onClick={this.toggleMenu}>
                      <CopyIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    open={Boolean(this.state.anchor)}
                    anchorEl={this.state.anchor}
                    onClose={this.toggleMenu}
                  >
                    <MenuItem onClick={this.handleCopyNumber}>
                      Copy Value
                    </MenuItem>
                    <MenuItem onClick={this.handleCopyYAML}>
                      Copy as YAML
                    </MenuItem>
                    {/**
                     * Im not sure that this really make sense....
                     * Will hold off enabling this
                     */}
                    {false && this.props.selectedLED !== "all" && (
                      <MenuItem onClick={this.handleCopyAllYAML}>
                        Copy All LEDs as YAML
                      </MenuItem>
                    )}
                  </Menu>
                </InputAdornment>
              ),
            }}
          />
          {this.props.protocol !== "zigbee" && (
            <div style={{ textAlign: "right" }}>
              <Tooltip title="Decode a Value">
                <IconButton onClick={this.openDecoder}>
                  <SettingsBackupRestoreIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          TransitionComponent={SlideTransition}
          open={this.state.snackbarOpen}
          autoHideDuration={4000}
          onClose={this.handleSnackbarClose}
          message={<span id="message-id">{this.state.copyStatusText}</span>}
        />
        <DecoderDialog
          open={this.state.decoderDialogOpen}
          onClose={this.handleDecoderDialogClose}
          onDecode={this.handleDecode}
          format={this.props.format}
        />
      </div>
    );
  }
}

export default withStyles(styles)(NotificationCalc);
