import Scenes from "../Scenes";
import { CONFIG_PARAMETER } from "../../ConfigurationDefinitions";

export default {
  leds: [
    {
      id: "led-0",
      name: "",
      pos: {
        height: "227px",
        bottom: "146px",
        right: "108px",
      },
      parameters: {
        [CONFIG_PARAMETER.COLOR]: 13,
        [CONFIG_PARAMETER.BRIGHTNESS]: 14,
        [CONFIG_PARAMETER.LED_EFFECT]: 16,
      },
      colorRange: [0, 255],
      brightnessRange: [1, 10],
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
