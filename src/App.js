import React from "react";
import PropTypes from "prop-types";
import {
  CssBaseline,
  withStyles,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  SvgIcon,
  Tooltip,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Badge,
  Menu,
  ListSubheader,
  ListItemText,
} from "@material-ui/core";
import ThemeProvider from "./ThemeProvider";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import AboutDialog from "./AboutDialog";
import Switch from "./Switch";
import NotificationCalc from "./NotificationCalc";
import SceneTable from "./SceneTable";
import StandardLEDTools from "./StandardLEDTools";
import TuneIcon from "@material-ui/icons/Tune";
import OptionsDialog from "./Options";
import SwitchDefinitions from "./SwitchDefinitions";
import CPUIcon from "./icons/CPU.js";

let Gradient = require("gradient2");
let gradient = new Gradient({
  colors: [
    "rgb(255,0,0)",
    "rgb(255,125,0)",
    "rgb(255,255,0)",
    "rgb(125,255,0)",
    "rgb(0,255,0)",
    "rgb(0,255,125)",
    "rgb(0,255,255)",
    "rgb(0,125,255)",
    "rgb(0,0,255)",
    "rgb(125,0,255)",
    "rgb(255,0,255)",
    "rgb(255,0,125)",
    "rgb(255,0,0)",
  ],
  steps: 256,
  model: "rgb",
});

const LED_COLORS = gradient.toArray("hex");

const styles = (theme) => ({
  switchWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
    "&>*": {
      minWidth: "375px",
      maxWidth: "375px",
      "&:last-child": {
        maxWidth: "480px",
        width: "100%",
      },
    },
  },
  switchContainer: {
    position: "relative",
  },
  switchConfigWrapper: {
    display: "flex",
    alignItems: "center",
  },
  colorHelper: {
    height: "10px",
    width: "100%",
    background:
      "linear-gradient(to right, rgb(255,0,0), rgb(255,125,0), rgb(255,255,0), rgb(125,255,0), rgb(0,255,0), rgb(0,255,125), rgb(0,255,255), rgb(0,125,255), rgb(0,0,255), rgb(125,0,255), rgb(255,0,255), rgb(255,0,125), rgb(255,0,0))",
  },
  credits: {
    display: "flex",
    position: "absolute",
    bottom: "0",
    right: "0",
    left: "0",
    padding: "15px",
    justifyContent: "space-between",
  },
  optionsContainer: {
    padding: theme.spacing(0, 3),
  },
  switchPicker: {
    marginBottom: theme.spacing(3),
  },
});

//Might Move to this calc in the future. More straight forward

const longToByteArray = function (/*long*/ long) {
  // we want to represent the input as a 8-bytes array
  var byteArray = [0, 0, 0, 0];

  for (var index = 0; index < byteArray.length; index++) {
    var byte = long & 0xff;
    byteArray[index] = byte;
    long = (long - byte) / 256;
  }

  return byteArray;
};

// const byteArrayToLong = function(/*byte[]*/ byteArray) {
//   var value = 0;
//   for (var i = byteArray.length - 1; i >= 0; i--) {
//     value = value * 256 + byteArray[i];
//   }

//   return value;
// };

class App extends React.Component {
  constructor(props) {
    super(props);
    let userFirmwares = JSON.parse(localStorage.getItem("firmwares")) || {};
    let firmwareVersion =
      userFirmwares[SwitchDefinitions[0].id] ||
      SwitchDefinitions[0].defaultFirmware;
    this.state = {
      aboutDialogOpen: false,
      optionsDialogOpen: false,
      type: 0,
      tab: 1,
      selectedLED: 0,
      selectedLEDLight: "all",
      highlight: null,
      ledConfigs: JSON.parse(
        JSON.stringify(
          SwitchDefinitions[0].firmwares[firmwareVersion].leds.map((l) =>
            Array(7).fill(l.default)
          )
        )
      ),
      notificationConfigs: JSON.parse(
        JSON.stringify(
          SwitchDefinitions[0].firmwares[firmwareVersion].leds.map((l) =>
            Array(7).fill(l.defaultNotification)
          )
        )
      ),
      firmwareVersion: firmwareVersion,
      userFirmwares: userFirmwares,
      firmwareAnchorEl: null,
      selectedLEDLight: "all",
    };
  }

  setValue = (param, value) => {
    if (param === "all") {
      this.setState(value, () => {
        this.setState((lastState) => ({
          value:
            parseInt(lastState.color) +
            lastState.level * 256 +
            lastState.duration * 65536 +
            lastState.effect * 16777216,
        }));
      });
    } else {
      this.setState({ [param]: value }, () => {
        if (this.state.type === "onoff" && this.state.effect === "5") {
          this.setState({ effect: "1" });
        }
        //83823359
        this.setState((lastState) => ({
          value:
            parseInt(lastState.color) +
            lastState.level * 256 +
            lastState.duration * 65536 +
            lastState.effect * 16777216,
        }));
      });
    }
  };

  setConfigValue = (key, attr, v) => {
    console.log(key, attr, v);
    this.setState((lastState) => {
      let config = lastState[key];
      if (attr === "all") {
        if (lastState.selectedLEDLight === "all") {
          config[lastState.selectedLED] = Array(7).fill({ ...v });
        } else {
          config[lastState.selectedLED][lastState.selectedLEDLight] = { ...v };
        }
      } else {
        if (lastState.selectedLEDLight === "all") {
          config[lastState.selectedLED].map((l) => {
            l[attr] = v;
            return l;
          });
        } else {
          config[lastState.selectedLED][lastState.selectedLEDLight][attr] = v;
        }
      }
      return { [key]: config };
    });
  };

  setSwitchType = (e) => {
    const firmwareVersion =
      this.state.userFirmwares[SwitchDefinitions[e.target.value].id] ||
      SwitchDefinitions[e.target.value].defaultFirmware;
    this.setState({
      firmwareVersion,
      type: e.target.value,
      selectedLED: 0,
      ledConfigs: JSON.parse(
        JSON.stringify(
          SwitchDefinitions[e.target.value].firmwares[firmwareVersion].leds.map(
            (l) => Array(7).fill(l.default)
          )
        )
      ),
      notificationConfigs: JSON.parse(
        JSON.stringify(
          SwitchDefinitions[e.target.value].firmwares[firmwareVersion].leds.map(
            (l) => Array(7).fill(l.defaultNotification)
          )
        )
      ),
    });
  };

  setSelectedLED = (e) => {
    this.setState({ selectedLED: e.target.value });
  };

  setSelectedLEDLight = (e) => {
    this.setState({ selectedLEDLight: e.target.value });
  };

  openAboutDialog = () => {
    this.setState({ aboutDialogOpen: true });
  };

  closeAboutDialog = () => {
    this.setState({ aboutDialogOpen: false });
  };

  tabChange = (e, value) => {
    this.setState({ tab: value });
  };

  onSceneTrigger = (scene) => {
    this.setState({
      highlight: scene,
      tab: scene !== undefined ? 2 : this.state.tab,
    });
  };

  openOptions = () => {
    this.setState({ optionsDialogOpen: true });
  };

  closeOptions = () => {
    this.setState({ optionsDialogOpen: false });
  };

  openFirmwareMenu = (e) => {
    this.setState({ firmwareAnchorEl: e.currentTarget });
  };

  setFirmwareVersion = (version) => () => {
    this.setState((lastState) => {
      let userFirmwares = { ...lastState.userFirmwares };
      userFirmwares[SwitchDefinitions[lastState.type].id] = version;
      localStorage.setItem("firmwares", JSON.stringify(userFirmwares));
      return {
        firmwareAnchorEl: null,
        firmwareVersion: version,
        userFirmwares,
      };
    });
  };

  handleCloseFirmwareMenu = () => {
    this.setState({ firmwareAnchorEl: null });
  };

  render() {
    return (
      <ThemeProvider>
        {({
          setTheme,
          themeType,
          formatType,
          setFormat,
          setCalculationMethod,
          calculationMethod,
          setSceneMethod,
          sceneMethod,
        }) => (
          <div className={this.props.classes.root}>
            <CssBaseline />
            <AppBar position="static">
              <Toolbar>
                <Typography
                  variant="h5"
                  style={{
                    flexGrow: "1",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography variant="h4" component="span">
                    <strong>inovelli </strong>
                  </Typography>
                  <span style={{ marginLeft: "8px" }}> :: Switch Toolbox</span>
                </Typography>
                <div style={{ flexShrink: "0", flexGrow: "0" }}>
                  <Tooltip title="Options">
                    <IconButton color="inherit" onClick={this.openOptions}>
                      <TuneIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="About">
                    <IconButton color="inherit" onClick={this.openAboutDialog}>
                      <InfoOutlined />
                    </IconButton>
                  </Tooltip>
                </div>
              </Toolbar>
            </AppBar>
            <div className={this.props.classes.switchWrapper}>
              <div>
                <Switch
                  leds={
                    SwitchDefinitions[this.state.type].firmwares[
                      this.state.firmwareVersion
                    ].leds
                  }
                  paddles={SwitchDefinitions[this.state.type].paddles}
                  configs={
                    this.state.tab !== 0
                      ? this.state.notificationConfigs
                      : this.state.ledConfigs
                  }
                  scenes={
                    SwitchDefinitions[this.state.type].firmwares[
                      this.state.firmwareVersion
                    ].scenes
                  }
                  effects={
                    SwitchDefinitions[this.state.type].firmwares[
                      this.state.firmwareVersion
                    ].effects
                  }
                  images={SwitchDefinitions[this.state.type].images}
                  onSceneTriggered={this.onSceneTrigger}
                />
              </div>
              <div className={this.props.classes.optionsContainer}>
                <div className={this.props.classes.switchPicker}>
                  <div className={this.props.classes.switchConfigWrapper}>
                    <FormControl fullWidth={true} margin="normal">
                      <InputLabel>Switch Type</InputLabel>
                      <Select
                        value={this.state.type}
                        onChange={this.setSwitchType}
                      >
                        {SwitchDefinitions.map((sw, index) => (
                          <MenuItem key={sw.id} value={index}>
                            <ListItemText
                              primary={sw.displayName}
                              secondary={
                                sw.protocol === "zwave" ? "Z-Wave" : "Zigbee"
                              }
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Tooltip title="Firmware Version">
                      <Badge
                        badgeContent={this.state.firmwareVersion}
                        color="primary"
                        overlap="circle"
                      >
                        <IconButton onClick={this.openFirmwareMenu}>
                          <SvgIcon>
                            <CPUIcon />
                          </SvgIcon>
                        </IconButton>
                      </Badge>
                    </Tooltip>
                    <Menu
                      open={Boolean(this.state.firmwareAnchorEl)}
                      anchorEl={this.state.firmwareAnchorEl}
                      onClose={this.handleCloseFirmwareMenu}
                    >
                      <ListSubheader>Firmware Version</ListSubheader>
                      {Object.keys(
                        SwitchDefinitions[this.state.type].firmwares
                      ).map((f) => (
                        <MenuItem
                          key={f}
                          onClick={this.setFirmwareVersion(f)}
                          value={f}
                        >
                          {f}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                  {SwitchDefinitions[this.state.type].firmwares[
                    this.state.firmwareVersion
                  ].leds.length > 1 && (
                    <FormControl fullWidth={true} style={{ marginTop: "10px" }}>
                      <InputLabel>LED Strip</InputLabel>
                      <Select
                        value={this.state.selectedLED}
                        onChange={this.setSelectedLED}
                      >
                        {SwitchDefinitions[this.state.type].firmwares[
                          this.state.firmwareVersion
                        ].leds.map((led, index) => (
                          <MenuItem key={led.name} value={index}>
                            {led.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  {SwitchDefinitions[this.state.type].firmwares[
                    this.state.firmwareVersion
                  ].leds[this.state.selectedLED].supportsIndvidualLEDs && (
                    <FormControl fullWidth={true} style={{ marginTop: "10px" }}>
                      <InputLabel>LED</InputLabel>
                      <Select
                        value={this.state.selectedLEDLight}
                        onChange={this.setSelectedLEDLight}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={0}>1</MenuItem>
                        <MenuItem value={1}>2</MenuItem>
                        <MenuItem value={2}>3</MenuItem>
                        <MenuItem value={3}>4</MenuItem>
                        <MenuItem value={4}>5</MenuItem>
                        <MenuItem value={5}>6</MenuItem>
                        <MenuItem value={6}>7</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                  <Tabs
                    value={this.state.tab}
                    indicatorColor="primary"
                    onChange={this.tabChange}
                    style={{ marginBottom: "10px" }}
                    variant="fullWidth"
                    centered
                  >
                    <Tab label="LED" />
                    <Tab label="Notifications" />
                    {/* <Tab label="Scenes" /> */}
                  </Tabs>
                </div>

                {this.state.tab === 1 && (
                  <NotificationCalc
                    effects={
                      SwitchDefinitions[this.state.type].firmwares[
                        this.state.firmwareVersion
                      ].effects
                    }
                    byteOrder={SwitchDefinitions[this.state.type].byteOrder}
                    parameters={
                      SwitchDefinitions[this.state.type].firmwares[
                        this.state.firmwareVersion
                      ].leds[this.state.selectedLED].parameters
                    }
                    config={
                      this.state.notificationConfigs[this.state.selectedLED][
                        this.state.selectedLEDLight === "all"
                          ? 0
                          : this.state.selectedLEDLight
                      ]
                    }
                    colorRange={
                      SwitchDefinitions[this.state.type].firmwares[
                        this.state.firmwareVersion
                      ].leds[this.state.selectedLED].colorRange
                    }
                    brightnessRange={
                      SwitchDefinitions[this.state.type].firmwares[
                        this.state.firmwareVersion
                      ].leds[this.state.selectedLED].brightnessRange
                    }
                    onChange={this.setConfigValue}
                    format={formatType}
                    protocol={SwitchDefinitions[this.state.type].protocol}
                  />
                )}
                {this.state.tab === 2 && (
                  <SceneTable
                    highlight={this.state.highlight}
                    sceneMethod={sceneMethod}
                    scenes={
                      SwitchDefinitions[this.state.type].firmwares[
                        this.state.firmwareVersion
                      ].scenes
                    }
                  />
                )}
                {this.state.tab === 0 && (
                  <StandardLEDTools
                    parameters={
                      SwitchDefinitions[this.state.type].firmwares[
                        this.state.firmwareVersion
                      ].leds[this.state.selectedLED].parameters
                    }
                    colorRange={
                      SwitchDefinitions[this.state.type].firmwares[
                        this.state.firmwareVersion
                      ].leds[this.state.selectedLED].colorRange
                    }
                    brightnessRange={
                      SwitchDefinitions[this.state.type].firmwares[
                        this.state.firmwareVersion
                      ].leds[this.state.selectedLED].brightnessRange
                    }
                    calculationMethod={calculationMethod}
                    config={
                      this.state.ledConfigs[this.state.selectedLED][
                        this.state.selectedLEDLight === "all"
                          ? 0
                          : this.state.selectedLEDLight
                      ]
                    }
                    onChange={this.setConfigValue}
                    format={formatType}
                  />
                )}
              </div>
            </div>
            <AboutDialog
              open={this.state.aboutDialogOpen}
              onClose={this.closeAboutDialog}
            />
            <OptionsDialog
              open={this.state.optionsDialogOpen}
              onClose={this.closeOptions}
              theme={themeType}
              format={formatType}
              setTheme={setTheme}
              setFormat={setFormat}
              setCalculationMethod={setCalculationMethod}
              calculationMethod={calculationMethod}
              sceneMethod={sceneMethod}
              setSceneMethod={setSceneMethod}
            />
          </div>
        )}
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
