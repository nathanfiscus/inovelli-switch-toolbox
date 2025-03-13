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
    { name: "Fast Blink", value: 2, animation: "blink", speed: 400 },
    { name: "Slow Blink", value: 3, animation: "blink", speed: 800 },
    { name: "Pulse", value: 4, animation: "pulse", speed: 400 },
    { name: "Chase", value: 5, animation: "chase", speed: 225 },
    { name: "Open/Close", value: 6, animation: "openClose", speed: 225 },
    { name: "Small to Big", value: 7, animation: "smallToBig", speed: 225 },
    {
      name: "Aurora",
      value: 8,
      animation: "aurora",
      speed: 400,
    },
    {
      name: "Slow Falling",
      value: 9,
      animation: "falling",
      speed: 800,
    },
    {
      name: "Medium Falling",
      value: 10,
      animation: "falling",
      speed: 600,
    },
    {
      name: "Fast Falling",
      value: 11,
      animation: "falling",
      speed: 400,
    },
    {
      name: "Slow Rising",
      value: 12,
      animation: "rising",
      speed: 800,
    },
    {
      name: "Medium Rising",
      value: 13,
      animation: "rising",
      speed: 600,
    },
    {
      name: "Fast Rising",
      value: 14,
      animation: "rising",
      speed: 400,
    },
    { name: "Medium Blink", value: 15, animation: "blink", speed: 600 },
    {
      name: "Slow Chase",
      value: 16,
      animation: "chase",
      speed: 800,
    },
    {
      name: "Fast Chase",
      value: 17,
      animation: "chase",
      speed: 150,
    },
    { name: "Clear Effect", value: 255, animation: "clear" },
  ],
  singleLEDEffects: [
    { name: "Solid", value: 1, animation: "solid" },
    { name: "Fast Blink", value: 2, animation: "blink", speed: 400 },
    { name: "Slow Blink", value: 3, animation: "blink", speed: 800 },
    { name: "Pulse", value: 4, animation: "pulse", speed: 400 },
    {
      name: "Chase",
      value: 5,
      animation: "chase",
      speed: 225,
    },
    {
      name: "Falling",
      value: 6,
      animation: "falling",
      speed: 600,
    },
    {
      name: "Rising",
      value: 7,
      animation: "rising",
      speed: 600,
    },
    {
      name: "Aurora",
      value: 8,
      animation: "aurora",
      speed: 400,
    },
    { name: "Clear Effect", value: 255, animation: "clear" },
  ],
  scenes: Scenes,
};
