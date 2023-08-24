import v115 from "./firmwares/v1.15";
import v119 from "./firmwares/v1.19";

export default {
  protocol: "zwave",
  id: "onoff",
  displayName: "On\\Off Switch",
  model: "LZW30-SN",
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
  defaultFirmware: "1.19",
  firmwares: {
    1.15: v115,
    1.19: v119,
  },
  byteOrder: ["color", "level", "duration", "effect"],
};
