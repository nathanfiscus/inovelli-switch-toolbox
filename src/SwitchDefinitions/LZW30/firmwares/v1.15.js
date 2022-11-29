import { CONFIG_PARAMETER } from "../../ConfigurationDefinitions";
import Scenes from "../../LZW31/Scenes"; //Same Scenes as the LZW31

export default {
  leds: [
    {
      id: "led-0",
      name: "",
      pos: {
        height: "43px",
        bottom: "146px",
        right: "108px",
      },
      parameters: {
        [CONFIG_PARAMETER.COLOR]: 5,
        [CONFIG_PARAMETER.BRIGHTNESS]: 6,
        [CONFIG_PARAMETER.LED_EFFECT]: 8,
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
    { name: "Off (Notification Cleared)", value: "0" },
    { name: "Solid", value: "1" },
    { name: "Fast Blink", value: "2" },
    { name: "Slow Blink", value: "3" },
    { name: "Pulse", value: "4" },
  ],
  scenes: Scenes,
};
