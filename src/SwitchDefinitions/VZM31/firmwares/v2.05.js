import Scenes from "../Scenes";
import { CONFIG_PARAMETER } from "../../ConfigurationDefinitions";

export default {
  leds: [
    {
      id: "led-0",
      name: "",
      pos: {
        height: "228px",
        bottom: "146px",
        right: "108px",
      },
      parameters: {
        [CONFIG_PARAMETER.COLOR]: 95,
        [CONFIG_PARAMETER.BRIGHTNESS]: 97,
        [CONFIG_PARAMETER.LED_EFFECT]: null,
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
      supportsIndvidualLEDs: true,
    },
  ],
  effects: [
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
    { name: "Open/Close", value: 6, animation: "openClose", speed: 225 },
    { name: "Small to Big", value: 7, animation: "smallToBig", speed: 225 },
    {
      name: "Aurora",
      value: 8,
      animation: "aurora",
      styles: { height: "300px" },
    },
    {
      name: "Slow Falling",
      value: 9,
      animation: "falling",
      styles: { height: "300px" },
    },
    {
      name: "Medium Falling",
      value: 10,
      animation: "falling",
      styles: { height: "300px" },
    },
    {
      name: "Fast Falling",
      value: 11,
      animation: "falling",
      styles: { height: "300px" },
    },
    {
      name: "Slow Rising",
      value: 12,
      animation: "rising",
      styles: { height: "300px" },
    },
    {
      name: "Medium Rising",
      value: 13,
      animation: "rising",
      styles: { height: "300px" },
    },
    {
      name: "Fast Rising",
      value: 14,
      animation: "rising",
      styles: { height: "300px" },
    },
    { name: "Medium Blink", value: 15, animation: "blink" },
    {
      name: "Slow Chase",
      value: 16,
      animation: "chase",
      styles: { height: "300px" },
    },
    {
      name: "Fast Chase",
      value: 17,
      animation: "chase",
      styles: { height: "300px" },
    },
    { name: "Clear Effect", value: 255, animation: "clear" },
  ],
  scenes: Scenes,
};
