import React from "react";
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
  Slide,
  Snackbar,
} from "@material-ui/core";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import AboutDialog from "./AboutDialog";
import Switch from "./Switch";
import NotificationCalc from "./NotificationCalc";
import SceneTable from "./SceneTable";
import StandardLEDTools from "./StandardLEDTools";
import TuneIcon from "@material-ui/icons/Tune";
import ShareIcon from "@material-ui/icons/Share";
import OptionsDialog from "./Options";
import SwitchDefinitions from "./SwitchDefinitions";
import CPUIcon from "./icons/CPU.js";
import copyTextToClipboard from "./utils/ClipboardAccess";
import qs from "qs";
import { byteArrayToLong, longToByteArray } from "./utils/ByteArray";
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

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
  subheader: {
    color: theme.palette.primary.light,
  },
  titleMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
});

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
      tab: 0,
      selectedLED: 0,
      highlight: null,
      snackbarOpen: false,
      copyStatusText: "",
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

  componentDidMount() {
    if (document.location.search) {
      this.loadFromURL();
    }
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
    this.setState((lastState) => {
      let config = JSON.parse(JSON.stringify(lastState[key]));
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
    this.props.setProtocolType(SwitchDefinitions[e.target.value].protocol);
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
    const value = e.target.value;
    this.setState((lastState) => {
      let notificationConfigs = JSON.parse(
        JSON.stringify(lastState.notificationConfigs)
      );
      /*
       * Reset LED notification programming if switching between single and all led modes
       * because effect lists are different from one to another.
       */
      const isCurrentModeAllLED = isNaN(parseInt(lastState.selectedLEDLight));
      const isNextModeAllLED = isNaN(parseInt(value));

      if (isCurrentModeAllLED !== isNextModeAllLED) {
        notificationConfigs = JSON.parse(
          JSON.stringify(
            SwitchDefinitions[lastState.type].firmwares[
              lastState.firmwareVersion
            ].leds.map((l) => Array(7).fill(l.defaultNotification))
          )
        );
      }
      return { selectedLEDLight: e.target.value, notificationConfigs };
    });
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

  loadFromURL = () => {
    const query = qs.parse(document.location.search.replace(/\?/, ""));
    console.log(query);
    let state = {
      type: query.s,
      firmwareVersion:
        this.state.userFirmwares[SwitchDefinitions[query.s].id] ||
        SwitchDefinitions[query.s].defaultFirmware,
      selectedLEDLight: query.m === "true" ? "all" : 0,
      notificationConfigs: query.l.map((l) => {
        return l.map((n) => {
          if (SwitchDefinitions[query.s].protocol === "zwave") {
            const arr = longToByteArray(n);
            return {
              [SwitchDefinitions[query.s].byteOrder[0]]: arr[0],
              [SwitchDefinitions[query.s].byteOrder[1]]: arr[1],
              [SwitchDefinitions[query.s].byteOrder[2]]: arr[2],
              [SwitchDefinitions[query.s].byteOrder[3]]: arr[3],
            };
          } else {
            const arr = n.split(",");
            return {
              effect: arr[0],
              level: arr[1],
              color: arr[2],
              duration: arr[3],
            };
          }
        });
      }),
    };
    this.props.setProtocolType(SwitchDefinitions[query.s].protocol);

    this.setState(state);
  };

  shareNotification = () => {
    let allLEDMode = isNaN(parseInt(this.state.selectedLEDLight));
    let state = {
      s: this.state.type,
      m: allLEDMode,
      l: this.state.notificationConfigs.map((l) => {
        return l.map((n) => {
          if (SwitchDefinitions[this.state.type].protocol === "zwave") {
            return byteArrayToLong([
              n[SwitchDefinitions[this.state.type].byteOrder[0]],
              n[SwitchDefinitions[this.state.type].byteOrder[1]],
              n[SwitchDefinitions[this.state.type].byteOrder[2]],
              n[SwitchDefinitions[this.state.type].byteOrder[3]],
            ]).toString(10);
          } else {
            return Object.values(n).join(",");
          }
        });
      }),
    };

    //Pretty Up the URL
    const query = qs
      .stringify(state)
      .replace(/%5B/g, "[")
      .replace(/%5D/g, "]")
      .replace(/%2C/g, ",");
    copyTextToClipboard(
      document.location.protocol +
        "//" +
        document.location.host +
        document.location.pathname +
        "?" +
        query,
      this.handleOnCopy
    );
  };

  handleOnCopy = (success) => {
    this.setState({
      snackbarOpen: true,
      copyStatusText: success
        ? "Share Link copied to clipboard!"
        : "Unable to copy to clipboard. Check browser settings.",
    });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  get SelectedLED() {
    return this.SelectedFirmware.leds[this.state.selectedLED];
  }

  get SelectedFirmware() {
    return SwitchDefinitions[this.state.type].firmwares[
      this.state.firmwareVersion
    ];
  }

  render() {
    return (
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
              <span style={{ marginLeft: "8px" }}>
                {" "}
                ::{" "}
                <span className={this.props.classes.titleMobile}>
                  Switch
                </span>{" "}
                Toolbox
              </span>
            </Typography>
            <div style={{ flexShrink: "0", flexGrow: "0" }}>
              <Tooltip title="Share Notification Program">
                <IconButton color="inherit" onClick={this.shareNotification}>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
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
              leds={this.SelectedFirmware.leds}
              paddles={SwitchDefinitions[this.state.type].paddles}
              configs={
                this.state.tab !== 1
                  ? this.state.notificationConfigs
                  : this.state.ledConfigs
              }
              scenes={this.SelectedFirmware.scenes}
              effects={
                this.state.selectedLEDLight === "all"
                  ? this.SelectedFirmware.effects
                  : this.SelectedFirmware.singleLEDEffects
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
                  <Select value={this.state.type} onChange={this.setSwitchType}>
                    <ListSubheader className={this.props.classes.subheader}>
                      Z-Wave
                    </ListSubheader>
                    {SwitchDefinitions.reduce((arr, sw, index) => {
                      if (sw.protocol === "zwave")
                        arr.push(
                          <MenuItem key={sw.id} value={index}>
                            <ListItemText
                              primary={sw.displayName}
                              secondary={sw.model}
                            />
                          </MenuItem>
                        );
                      return arr;
                    }, [])}
                    <ListSubheader className={this.props.classes.subheader}>
                      Zigbee
                    </ListSubheader>
                    {SwitchDefinitions.reduce((arr, sw, index) => {
                      if (sw.protocol !== "zwave")
                        arr.push(
                          <MenuItem key={sw.id} value={index}>
                            <ListItemText
                              primary={sw.displayName}
                              secondary={sw.model}
                            />
                          </MenuItem>
                        );
                      return arr;
                    }, [])}
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
              {this.SelectedFirmware.leds.length > 1 && (
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
              {this.SelectedLED.supportsIndvidualLEDs && (
                <FormControl fullWidth={true} style={{ marginTop: "10px" }}>
                  <InputLabel>LED</InputLabel>
                  <Select
                    value={this.state.selectedLEDLight}
                    onChange={this.setSelectedLEDLight}
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={0}>7</MenuItem>
                    <MenuItem value={1}>6</MenuItem>
                    <MenuItem value={2}>5</MenuItem>
                    <MenuItem value={3}>4</MenuItem>
                    <MenuItem value={4}>3</MenuItem>
                    <MenuItem value={5}>2</MenuItem>
                    <MenuItem value={6}>1</MenuItem>
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
                <Tab label="Notifications" />
                <Tab label="LED" />
                {/* <Tab label="Scenes" /> */}
              </Tabs>
            </div>

            {this.state.tab === 0 && (
              <NotificationCalc
                effects={
                  this.state.selectedLEDLight === "all"
                    ? this.SelectedFirmware.effects
                    : this.SelectedFirmware.singleLEDEffects
                }
                byteOrder={SwitchDefinitions[this.state.type].byteOrder}
                parameters={this.SelectedLED.parameters}
                config={
                  this.state.notificationConfigs[this.state.selectedLED][
                    this.state.selectedLEDLight === "all"
                      ? 0
                      : this.state.selectedLEDLight
                  ]
                }
                selectedLED={this.state.selectedLEDLight}
                colorRange={this.SelectedLED.colorRange}
                brightnessRange={this.SelectedLED.brightnessRange}
                onChange={this.setConfigValue}
                format={this.props.formatType}
                protocol={SwitchDefinitions[this.state.type].protocol}
              />
            )}
            {this.state.tab === 2 && (
              <SceneTable
                highlight={this.state.highlight}
                sceneMethod={this.props.sceneMethod}
                scenes={this.SelectedFirmware.scenes}
              />
            )}
            {this.state.tab === 1 && (
              <StandardLEDTools
                parameters={this.SelectedLED.parameters}
                colorRange={this.SelectedLED.colorRange}
                brightnessRange={this.SelectedLED.brightnessRange}
                calculationMethod={this.props.calculationMethod}
                selectedLED={this.state.selectedLEDLight}
                config={
                  this.state.ledConfigs[this.state.selectedLED][
                    this.state.selectedLEDLight === "all"
                      ? 0
                      : this.state.selectedLEDLight
                  ]
                }
                onChange={this.setConfigValue}
                format={this.props.formatType}
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
          theme={this.props.themeType}
          format={this.props.formatType}
          setTheme={this.props.setTheme}
          setFormat={this.props.setFormat}
          setCalculationMethod={this.props.setCalculationMethod}
          calculationMethod={this.props.calculationMethod}
          sceneMethod={this.props.sceneMethod}
          setSceneMethod={this.props.setSceneMethod}
        />
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
      </div>
    );
  }
}

export default withStyles(styles)(App);
