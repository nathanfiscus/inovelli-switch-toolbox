import v5 from "./firmwares/v5";

export default {
  protocol: "zigbee",
  displayName: "On\\Off + Dimmer Switch",
  id: "zig-dimmer",
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
  defaultFirmware: "5",
  firmwares: {
    5: v5,
  },
};
