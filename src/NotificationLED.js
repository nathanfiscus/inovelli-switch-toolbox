import React from "react";
import LED from "./LEDStrip";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
});

class NotificationLED extends React.Component {
  render() {
    const {
      type,
      color,
      effect,
      level,
      effects,
      range,
      style,
      brightnessRange,
    } = this.props;
    return (
      <div style={style}>
        <LED
          width={style.width || "100%"}
          height={style.height}
          color={color}
          effect={effect}
          level={level}
          type={type}
          effects={effects}
          range={range}
          brightnessRange={brightnessRange}
        />
      </div>
    );
  }
}

export default withStyles(styles)(NotificationLED);
