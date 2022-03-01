import v141 from "./firmwares/v1.41";
import v148 from "./firmwares/v1.48";

export default {
  protocol: "zwave",
  displayName: "Dimmer Switch",
  id: "dimmer",
  paddles: [
    {
      id: "up",
      pos: { top: "162px", left: "135px", width: "120px", height: "100px" },
    },
    {
      id: "down",
      pos: {
        bottom: "162px",
        left: "135px",
        width: "120px",
        height: "100px",
      },
    },
    {
      id: "config",
      pos: { top: "162px", right: "129px", width: "10px", height: "57px" },
    },
  ],
  images: [],
  defaultFirmware: "1.48",
  firmwares: {
    1.48: v148,
    1.41: v141,
  },

  byteOrder: ["color", "level", "duration", "effect"],
};
