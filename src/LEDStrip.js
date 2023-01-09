import React from "react";
import { withStyles } from "@material-ui/core";
import WS2812 from "./WS2812";
import Animations from "./animations";
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

export const LED_COLORS = gradient.toArray("rgb");

const styles = (theme) => ({
  ledstrip: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#999",
    overflow: "hidden",
    "&>*": {
      flex: "1 1 auto",
      padding: "15px 0",
      margin: "-15px 0",
    },
  },

  diffuse: {
    filter: "blur(10px)",
  },
  topDiffuse: {
    filter: "brightness(100%)",
  },
});

class LED2 extends React.Component {
  constructor(props) {
    super(props);
    this.ledStrip = React.createRef();
    this.state = {
      i: 0,
      colors: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      animationPatternLED1: "solid",
      animationTimingLED1: 0,
      animationPatternLED2: "solid",
      animationTimingLED2: 0,
      animationPatternLED3: "solid",
      animationTimingLED4: 0,
      animationPatternLED4: "solid",
      animationTimingLED5: 0,
      animationPatternLED5: "solid",
      animationTimingLED6: 0,
      animationPatternLED6: "solid",
      animationTimingLED7: 0,
      animationPatternLED7: "solid",
    };
  }

  componentDidMount() {}

  animationEngine = () => {
    this.setState(
      (lastState) => {
        let nextState = {};
        let newTime = Date.now();
        for (let i = 1; i <= 7; i++) {
          if (
            Date.now() - (lastState[`animationStartTimeLED${i}`] || 0) >=
            (this.props.effect[i - 1]?.speed || 0)
          ) {
            nextState = {
              ...nextState,
              [`animationStepLED${i}`]:
                (lastState[`animationStepLED${i}`] || 0) + 1,
              [`animationStartTimeLED${i}`]: newTime,
            };
          }
          if (
            nextState[`animationStepLED${i}`] >
            Animations[this.props.effect[i - 1]?.animation || "solid"].length -
              1
          ) {
            nextState[`animationStepLED${i}`] = 0;
          }
        }
        return {
          startTime: Date.now(),
          ...nextState,
        };
      },
      () => {
        requestAnimationFrame(this.animationEngine);
      }
    );
  };

  componentDidUpdate(prevProps) {
    //Remove for individual Led support

    if (this.props.effect !== prevProps.effect) {
      this.setState({
        animationStepLED1: 0,
        animationStepLED2: 0,
        animationStepLED3: 0,
        animationStepLED4: 0,
        animationStepLED5: 0,
        animationStepLED6: 0,
        animationStepLED7: 0,
      });
      cancelAnimationFrame(this.state.animationFrame);
      requestAnimationFrame(this.animationEngine);
    }
  }

  safeStep(animation, step, led) {
    if (!animation || animation.length < 1) {
      return 1;
    }
    if (!step || step >= animation.length) {
      return animation[0][led];
    }
    return animation[step][led];
  }

  color(index) {
    if (this.props.range[0] === 0 && this.props.color[index] === 255) {
      return [255, 255, 255];
    } else {
      return LED_COLORS[this.props.color[index]].color;
    }
  }

  render() {
    return (
      <div
        className={this.props.classes.topDiffuse}
        style={{
          width: "10px",
          height: this.props.height,
          backgroundColor: "#aaa",
        }}
      >
        <div className={this.props.classes.ledstrip} ref={this.ledStrip}>
          <WS2812
            color={this.color(0)}
            level={
              this.safeStep(
                Animations[this.props.effect[0]?.animation || "solid"],
                this.state.animationStepLED1,
                0
              ) *
              (this.props.level[0] / 10)
            }
            className={this.props.classes.diffuse}
          />
          <WS2812
            color={this.color(1)}
            level={
              this.safeStep(
                Animations[this.props.effect[1]?.animation || "solid"],
                this.state.animationStepLED2,
                1
              ) *
              (this.props.level[1] / 10)
            }
            className={this.props.classes.diffuse}
          />
          <WS2812
            color={this.color(2)}
            level={
              this.safeStep(
                Animations[this.props.effect[2]?.animation || "solid"],
                this.state.animationStepLED3,
                2
              ) *
              (this.props.level[2] / 10)
            }
            className={this.props.classes.diffuse}
          />
          <WS2812
            color={this.color(3)}
            level={
              this.safeStep(
                Animations[this.props.effect[3]?.animation || "solid"],
                this.state.animationStepLED4,
                3
              ) *
              (this.props.level[3] / 10)
            }
            className={this.props.classes.diffuse}
          />
          <WS2812
            color={this.color(4)}
            level={
              this.safeStep(
                Animations[this.props.effect[4]?.animation || "solid"],
                this.state.animationStepLED5,
                4
              ) *
              (this.props.level[4] / 10)
            }
            className={this.props.classes.diffuse}
          />
          <WS2812
            color={this.color(5)}
            level={
              this.safeStep(
                Animations[this.props.effect[5]?.animation || "solid"],
                this.state.animationStepLED6,
                5
              ) *
              (this.props.level[5] / 10)
            }
            className={this.props.classes.diffuse}
          />
          <WS2812
            color={this.color(6)}
            level={
              this.safeStep(
                Animations[this.props.effect[6]?.animation || "solid"],
                this.state.animationStepLED7,
                6
              ) *
              (this.props.level[6] / 10)
            }
            className={this.props.classes.diffuse}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LED2);
