import v136 from "./firmwares/v1.36";
import lzw36 from "../../images/lzw36-c.png";

export default {
  protocol: "zwave",
  id: "fanlightcombo",
  displayName: "Fan\\Light Combo Dimmer",
  model: "LZW36",
  paddles: [
    {
      id: "light",
      pos: {
        top: "162px",
        left: "135px",
        width: "120px",
        height: "135px",
      },
    },
    {
      id: "fan",
      pos: {
        bottom: "162px",
        left: "135px",
        width: "120px",
        height: "135px",
      },
    },
    {
      id: "light_rocker_up",
      pos: {
        top: "182px",
        left: "115px",
        width: "14px",
        height: "47px",
      },
    },
    {
      id: "light_rocker_down",
      pos: {
        top: "229px",
        left: "115px",
        width: "14px",
        height: "47px",
      },
    },
    {
      id: "fan_rocker_up",
      pos: {
        top: "325px",
        left: "115px",
        width: "14px",
        height: "47px",
      },
    },
    {
      id: "fan_rocker_down",
      pos: {
        top: "372px",
        left: "115px",
        width: "14px",
        height: "47px",
      },
    },
  ],
  images: [
    {
      id: "lzw36-paddles",
      src: lzw36,
      pos: {
        left: "0px",
        width: "100%",
        top: "0px",
      },
    },
  ],
  defaultFirmware: "1.36",
  firmwares: {
    1.36: v136,
  },

  byteOrder: ["color", "level", "duration", "effect"],
};
