import { CONFIG_PARAMETER } from "../../ConfigurationDefinitions";
import Scenes from "../Scenes";

export default {
  leds: [
    {
      id: "led-0",
      name: "Light",
      pos: {
        top: "146px",
        right: "108px",
        height: "153px",
      },
      parameters: {
        [CONFIG_PARAMETER.COLOR]: 18,
        [CONFIG_PARAMETER.BRIGHTNESS]: 19,
        [CONFIG_PARAMETER.LED_EFFECT]: 24,
      },
      colorRange: [0, 255],
      brightnessRange: [0, 10],
      default: {
        level: 10,
        color: 170,
      },
      defaultNotification: {
        effect: 1,
        level: 10,
        color: 170,
        duration: 255,
      },
    },
    {
      id: "led-1",
      name: "Fan",
      pos: {
        bottom: "146px",
        right: "108px",
        height: "153px",
      },
      parameters: {
        [CONFIG_PARAMETER.COLOR]: 20,
        [CONFIG_PARAMETER.BRIGHTNESS]: 21,
        [CONFIG_PARAMETER.LED_EFFECT]: 25,
      },
      colorRange: [0, 255],
      brightnessRange: [0, 10],
      default: {
        level: 10,
        color: 170,
      },
      defaultNotification: {
        effect: 1,
        level: 10,
        color: 170,
        duration: 255,
      },
    },
  ],

  effects: [
    { name: "Off (Notification Cleared)", value: 0, animation: "off" },
    { name: "Solid", value: 1, animation: "solid" },
    {
      name: "Chase",
      value: 2,
      animation: "chase",
      speed: 225,
    },
    { name: "Fast Blink", value: 3, animation: "blink", speed: 400 },
    { name: "Slow Blink", value: 4, animation: "blink", speed: 800 },
    { name: "Pulse", value: 5, animation: "pulse", speed: 400 },
  ],
  scenes: Scenes,
};
