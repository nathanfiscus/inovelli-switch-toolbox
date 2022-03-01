import { CONFIG_PARAMETER } from "../../ConfigurationDefinitions";
import Scenes from "../Scenes";

export default {
  leds: [
    {
      id: "led-0",
      name: "Light LED",
      pos: {
        top: "162px",
        right: "129px",
        height: "134px",
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
      name: "Fan LED",
      pos: {
        bottom: "162px",
        right: "129px",
        height: "134px",
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
    { name: "Off (Notification Cleared)", value: "0" },
    { name: "Solid", value: "1" },
    { name: "Slow Blink", value: "2" },
    { name: "Fast Blink", value: "3" },
    { name: "Chase", value: "4", style: { height: "150px" } }, //Chase
    { name: "Pulse", value: "5" },
  ],
  scenes: Scenes,
};
