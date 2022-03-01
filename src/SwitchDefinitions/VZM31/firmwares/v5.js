import Scenes from "../Scenes";
import { CONFIG_PARAMETER } from "../../ConfigurationDefinitions";

export default {
  leds: [
    {
      id: "led-0",
      name: "",
      pos: {
        height: "227px",
        bottom: "143px",
        right: "148px",
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
    { name: "Solid", value: 1 },
    { name: "Chase", value: 2, styles: { height: "300px" } },
    { name: "Fast Blink", value: 3 },
    { name: "Slow Blink", value: 4 },
    { name: "Pulse", value: 5 },
    { name: "Open/Close", value: 6 },
    { name: "Small to Big", value: 7 },
    { name: "Clear Effect", value: 8 },
  ],
  scenes: Scenes,
};
