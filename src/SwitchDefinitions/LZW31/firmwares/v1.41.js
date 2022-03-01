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
        right: "150px",
      },
      parameters: {
        [CONFIG_PARAMETER.COLOR]: 13,
        [CONFIG_PARAMETER.BRIGHTNESS]: 14,
        [CONFIG_PARAMETER.LED_EFFECT]: 16,
      },
      colorRange: [1, 255],
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
    { name: "Off (Notification Cleared)", value: 0 },
    { name: "Solid", value: 1 },
    { name: "Chase", value: 2, styles: { height: "300px" } },
    { name: "Fast Blink", value: 3 },
    { name: "Slow Blink", value: 4 },
    { name: "Pulse", value: 5 },
  ],
  scenes: Scenes,
};
