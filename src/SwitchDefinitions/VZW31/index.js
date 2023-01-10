import v205 from "./firmwares/v2.05";

export default {
  protocol: "zwave",
  displayName: "On\\Off + Dimmer Switch",
  model: "VZM31-SN",
  id: "zwave-onoff-dimmer",
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
  byteOrder: ["color", "level", "duration", "effect"],
  images: [],
  defaultFirmware: "2.05",
  firmwares: {
    2.05: v205,
  },
};
