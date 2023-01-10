import React from "react";
import { withStyles } from "@material-ui/core";
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

export const LED_COLORS = gradient.toArray("hex");

const styles = (theme) => ({
  "@global": {
    "@keyframes pulse": {
      "50%": {
        background: "#AAAAAA",
        boxShadow: "0px 0px 0px 0px",
      },
    },
    "@keyframes blink": {
      "50%": { opacity: "0.0" },
    },
    "@keyframes chase": {
      "0%": { bottom: "-60%" },
      "50%": { bottom: "30%" },
      "100%": { bottom: "-65%" },
    },
    "@keyframes aurora": {
      "0%": { bottom: "80%", opacity: 0.3, boxShadow: "0px 0px 0px 0px" },
      "45%": { opacity: 1 },
      "55%": { opacity: 1 },
      "80%": {
        bottom: "-80%",
        opacity: 0,
        boxShadow: "0px 0px 0px 0px",
      },
      "100%": {
        bottom: "-80%",
        opacity: 0,
        boxShadow: "0px 0px 0px 0px",
      },
    },
    "@keyframes rising": {
      "0%": { bottom: "-100%", boxShadow: "0px 0px 0px 0px" },
      "50%": { bottom: "30%", boxShadow: "0px 0px 0px 0px" },
      "100%": { bottom: "90%", boxShadow: "0px 0px 0px 0px" },
    },
    "@keyframes falling": {
      "0%": { bottom: "90%", boxShadow: "0px 0px 0px 0px" },
      "50%": { bottom: "30%", boxShadow: "0px 0px 0px 0px" },
      "100%": { bottom: "-100%", boxShadow: "0px 0px 0px 0px" },
    },
    "@keyframes smalltobig": {
      "0%": { height: "80%", top: "5%" },
      "50%": { height: "500%", top: "-200%" },
      "100%": { height: "80%", top: "5%" },
    },
    "@keyframes openclose-top": {
      "0%": { top: "12%" },
      "37%": { top: "-45%" },
      "75%": { top: "12%" },
      "100%": { top: "12%" },
    },
    "@keyframes openclosebottom": {
      "0%": { top: "12%" },
      "37%": { top: "65%" },
      "75%": { top: "12%" },
      "100%": { top: "12%" },
    },
    "@keyframes pulse_Shadow": {
      "50%": {
        boxShadow: "0px 0px 0px 0px",
      },
    },
    "@keyframes blink_Shadow": {
      "50%": { boxShadow: "unset" },
    },
    "@keyframes chase_Shadow": {
      "0%": { boxShadow: "0px 0px 0px 0px" },
      "50%": { boxShadow: "0px 0px 0px 0px" },
      "100%": { boxShadow: "0px 0px 0px 0px" },
    },
  },
  notificationLED: {
    width: "10px",
    height: "100%",
    backgroundColor: "#888888",
  },
  forever: {
    animationIterationCount: "infinite",
  },
  strobe: {
    animationDuration: "3.5s",
    animationName: "pulse",
  },
  fastBlink: {
    animationDuration: "0.80s",
    animationName: "blink",
    animationTimingFunction: "step-start",
  },
  mediumBlink: {
    animationDuration: "1.4s",
    animationName: "blink",
    animationTimingFunction: "step-start",
  },
  slowBlink: {
    animationDuration: "2s",
    animationName: "blink",
    animationTimingFunction: "step-start",
  },
  chase: {
    animationDuration: "2s",
    animationName: "chase",
    position: "absolute",
    animationTimingFunction: "linear",
  },
  aurora: {
    animationDuration: "4s",
    animationName: "aurora",
    position: "absolute",
    animationTimingFunction: "linear",
  },
  risingFast: {
    animationDuration: "1.2s",
    animationName: "rising",
    position: "absolute",
    animationTimingFunction: "linear",
  },
  risingMedium: {
    animationDuration: "1.8s",
    animationName: "rising",
    position: "absolute",
    animationTimingFunction: "linear",
  },
  risingSlow: {
    animationDuration: "2.2s",
    animationName: "rising",
    position: "absolute",
    animationTimingFunction: "linear",
  },
  fallingFast: {
    animationDuration: "1.2s",
    animationName: "falling",
    position: "absolute",
    animationTimingFunction: "linear",
  },
  fallingMedium: {
    animationDuration: "1.8s",
    animationName: "falling",
    position: "absolute",
    animationTimingFunction: "linear",
  },
  fallingSlow: {
    animationDuration: "2.2s",
    animationName: "falling",
    position: "absolute",
    animationTimingFunction: "linear",
  },
  chaseFast: {
    animationDuration: "1s",
    animationName: "chase",
    position: "absolute",
    animationTimingFunction: "linear",
  },
  chaseSlow: {
    animationDuration: "3s",
    animationName: "chase",
    position: "absolute",
    animationTimingFunction: "linear",
  },
  smalltobig: {
    animationDuration: "2s",
    animationName: "smalltobig",
    position: "absolute",
    animationTimingFunction: "linear",
  },
  openclose: {
    animationDuration: "1.5s",
    animationName: "openclose-top",
    position: "absolute",
    animationTimingFunction: "linear",
  },
  openclosebottom: {
    animationDuration: "1.5s",
    animationName: "openclosebottom",
    position: "absolute",
    animationTimingFunction: "linear",
  },
  strobe_Shadow: {
    animationDuration: "3.5s",
    animationName: "pulse_Shadow",
  },
  fastBlink_Shadow: {
    animationDuration: "0.80s",
    animationName: "blink_Shadow",
    animationTimingFunction: "step-start",
  },
  slowBlink_Shadow: {
    animationDuration: "2s",
    animationName: "blink_Shadow",
    animationTimingFunction: "step-start",
  },
  mediumBlink_Shadow: {
    animationDuration: "1.4s",
    animationName: "blink_Shadow",
    animationTimingFunction: "step-start",
  },
  chase_Shadow: {
    animationDuration: "2s",
    animationName: "chase_Shadow",
    position: "absolute",
    animationTimingFunction: "linear",
  },
  aurora_Shadow: {
    animationDuration: "4s",
    animationName: "chase_Shadow",
    position: "absolute",
    animationTimingFunction: "linear",
  },
});

class LED extends React.Component {
  render() {
    let effectCSS = "";
    let effectCSS_Shadow = "";
    let effectStyles = {};
    effectStyles["opacity"] = (this.props.level / 10) * 0.6;
    let effect = this.props.effects.find((i) => i.value === this.props.effect);
    if (!effect) {
      effect = {};
    }

    const SELECTED_COLOR =
      this.props.color === 255 && this.props.range[0] === 0
        ? "#fff"
        : LED_COLORS[this.props.color];

    let OUTER_STYLE = {
      ...this.props.style,
      overflow: "hidden",
      position: "relative",
      //border: "1px solid #eeeeee",
      backgroundColor: "#888888",
      boxShadow:
        "0px 0px " +
        Math.ceil(this.props.level / 4) +
        "px 0px " +
        SELECTED_COLOR,
    };

    switch (effect.name) {
      case "Fast Blink":
        effectCSS += ` ${this.props.classes.fastBlink}`;
        effectCSS_Shadow += ` ${this.props.classes.fastBlink_Shadow}`;
        break;
      case "Slow Blink":
        effectCSS += ` ${this.props.classes.slowBlink}`;
        effectCSS_Shadow += ` ${this.props.classes.slowBlink_Shadow}`;
        break;
      case "Pulse":
        effectCSS += ` ${this.props.classes.strobe}`;
        effectCSS_Shadow += ` ${this.props.classes.strobe_Shadow}`;
        break;
      case "Chase":
        effectCSS += ` ${this.props.classes.chase}`;
        effectCSS_Shadow += ` ${this.props.classes.chase_Shadow}`;
        effectStyles.backgroundImage = `linear-gradient(transparent,${SELECTED_COLOR},transparent)`;
        effectStyles.backgroundColor = "unset";
        effectStyles.boxShadow = "unset";
        effectStyles.zIndex = 0;
        break;
      case "Aurora":
        effectCSS += ` ${this.props.classes.aurora}`;
        effectCSS_Shadow += ` ${this.props.classes.aurora_Shadow}`;
        effectStyles.backgroundImage = `linear-gradient(transparent,${SELECTED_COLOR},transparent)`;
        effectStyles.backgroundColor = "unset";
        effectStyles.boxShadow = "unset";
        effectStyles.zIndex = 0;
        break;
      case "Fast Rising":
        effectCSS += ` ${this.props.classes.risingFast}`;
        effectCSS_Shadow += ` ${this.props.classes.aurora_Shadow}`;
        effectStyles.backgroundImage = `linear-gradient(transparent,${SELECTED_COLOR},transparent)`;
        effectStyles.backgroundColor = "unset";
        effectStyles.boxShadow = "unset";
        effectStyles.zIndex = 0;
        break;
      case "Medium Rising":
        effectCSS += ` ${this.props.classes.risingMedium}`;
        effectCSS_Shadow += ` ${this.props.classes.aurora_Shadow}`;
        effectStyles.backgroundImage = `linear-gradient(transparent,${SELECTED_COLOR},transparent)`;
        effectStyles.backgroundColor = "unset";
        effectStyles.boxShadow = "unset";
        effectStyles.zIndex = 0;
        break;
      case "Slow Rising":
        effectCSS += ` ${this.props.classes.risingSlow}`;
        effectCSS_Shadow += ` ${this.props.classes.aurora_Shadow}`;
        effectStyles.backgroundImage = `linear-gradient(transparent,${SELECTED_COLOR},transparent)`;
        effectStyles.backgroundColor = "unset";
        effectStyles.boxShadow = "unset";
        effectStyles.zIndex = 0;
        break;
      case "Fast Falling":
        effectCSS += ` ${this.props.classes.fallingFast}`;
        effectCSS_Shadow += ` ${this.props.classes.aurora_Shadow}`;
        effectStyles.backgroundImage = `linear-gradient(transparent,${SELECTED_COLOR},transparent)`;
        effectStyles.backgroundColor = "unset";
        effectStyles.boxShadow = "unset";
        effectStyles.zIndex = 0;
        break;
      case "Medium Falling":
        effectCSS += ` ${this.props.classes.fallingMedium}`;
        effectCSS_Shadow += ` ${this.props.classes.aurora_Shadow}`;
        effectStyles.backgroundImage = `linear-gradient(transparent,${SELECTED_COLOR},transparent)`;
        effectStyles.backgroundColor = "unset";
        effectStyles.boxShadow = "unset";
        effectStyles.zIndex = 0;
        break;
      case "Slow Falling":
        effectCSS += ` ${this.props.classes.fallingSlow}`;
        effectCSS_Shadow += ` ${this.props.classes.aurora_Shadow}`;
        effectStyles.backgroundImage = `linear-gradient(transparent,${SELECTED_COLOR},transparent)`;
        effectStyles.backgroundColor = "unset";
        effectStyles.boxShadow = "unset";
        effectStyles.zIndex = 0;
        break;
      case "Fast Chase":
        effectCSS += ` ${this.props.classes.chaseFast}`;
        effectCSS_Shadow += ` ${this.props.classes.chase_Shadow}`;
        effectStyles.backgroundImage = `linear-gradient(transparent,${SELECTED_COLOR},transparent)`;
        effectStyles.backgroundColor = "unset";
        effectStyles.boxShadow = "unset";
        effectStyles.zIndex = 0;
        break;
      case "Slow Chase":
        effectCSS += ` ${this.props.classes.chaseSlow}`;
        effectCSS_Shadow += ` ${this.props.classes.chase_Shadow}`;
        effectStyles.backgroundImage = `linear-gradient(transparent,${SELECTED_COLOR},transparent)`;
        effectStyles.backgroundColor = "unset";
        effectStyles.boxShadow = "unset";
        effectStyles.zIndex = 0;
        break;
      case "Small to Big":
        effectCSS += ` ${this.props.classes.smalltobig}`;
        effectCSS_Shadow += ` ${this.props.classes.chase_Shadow}`;
        effectStyles.backgroundImage = `linear-gradient(transparent 30%,${SELECTED_COLOR},${SELECTED_COLOR},transparent 70%)`;
        effectStyles.backgroundColor = "unset";
        effectStyles.boxShadow = "unset";
        effectStyles.zIndex = 0;
        break;
      case "Open/Close":
        effectCSS += ` ${this.props.classes.openclose}`;
        effectCSS_Shadow += ` ${this.props.classes.chase_Shadow}`;
        effectStyles.backgroundImage = `linear-gradient(transparent,${SELECTED_COLOR},transparent)`;
        effectStyles.backgroundColor = "unset";
        effectStyles.boxShadow = "unset";
        effectStyles.zIndex = 0;
        effectStyles.height = "75%";
        break;
      case "Medium Blink":
        effectCSS += ` ${this.props.classes.mediumBlink}`;
        effectCSS_Shadow += ` ${this.props.classes.mediumBlink_Shadow}`;
        break;
      case "Solid":
        break;
      case "Clear Effect":
      case "Off (Notification Cleared)":
        effectStyles.backgroundColor = "unset";
        effectCSS_Shadow = ";";
        delete OUTER_STYLE.boxShadow;
        break;
      default:
        console.info(
          "Effect " + effect.name + " not supported. Defaulting to Solid."
        );
        break;
    }

    effectStyles = { ...effectStyles, ...effect.styles };

    effectCSS += ` ${this.props.classes.forever}`;
    effectCSS_Shadow += ` ${this.props.classes.forever}`;

    return (
      <div
        className={this.props.classes.notificationLED + " " + effectCSS_Shadow}
        style={OUTER_STYLE}
      >
        <span
          id="notification-led"
          className={this.props.classes.notificationLED + effectCSS}
          style={{
            backgroundColor: SELECTED_COLOR,
            color: SELECTED_COLOR,
            position: "absolute",
            zIndex: "2",
            height: "100%",
            ...this.props.style,
            ...effectStyles,
          }}
        />
        {effect.name === "Open/Close" && (
          <span
            id="notification-led2"
            className={
              this.props.classes.notificationLED +
              ` ${this.props.classes.openclosebottom} ${this.props.classes.forever}`
            }
            style={{
              backgroundColor: SELECTED_COLOR,
              color: SELECTED_COLOR,
              position: "absolute",
              top: "25%",
              ...this.props.style,
              ...effectStyles,
              zIndex: "3",
            }}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(LED);
