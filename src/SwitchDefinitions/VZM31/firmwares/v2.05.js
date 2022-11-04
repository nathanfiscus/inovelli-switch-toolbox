import Scenes from "../Scenes";
import { CONFIG_PARAMETER } from "../../ConfigurationDefinitions";

export default {
  leds: [
    {
      id: "led-0",
      name: "",
      pos: {
        height: "227px",
        bottom: "148px",
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
    },
  ],
  effects: [
    { name: "Solid", value: 1 },
    { name: "Chase", value: 2, styles: { height: "300px" } },
    { name: "Fast Blink", value: 3 },
    { name: "Slow Blink", value: 4 },
    { name: "Pulse", value: 5 },
    { name: "Open/Close", value: 6 },
    { name: "Small to Big", value: 7 },
    { name: "Aurora", value: 8, styles: { height: "300px" } },
    { name: "Slow Falling", value: 9, styles: { height: "300px" } },
    { name: "Medium Falling", value: 10, styles: { height: "300px" } },
    { name: "Fast Falling", value: 11, styles: { height: "300px" } },
    { name: "Slow Rising", value: 12, styles: { height: "300px" } },
    { name: "Medium Rising", value: 13, styles: { height: "300px" } },
    { name: "Fast Rising", value: 14, styles: { height: "300px" } },
    { name: "Medium Blink", value: 15 },
    { name: "Slow Chase", value: 16, styles: { height: "300px" } },
    { name: "Fast Chase", value: 17, styles: { height: "300px" } },
    { name: "Clear Effect", value: 255 },
  ],
  scenes: Scenes,
};
