// utils/echo.js
import Pusher from "pusher-js";

// Pusher.logToConsole = true

let pusherInstance = null;
let stockChannelInstance = null;


const getPusher = () => {
  if (!pusherInstance) {
    pusherInstance = new Pusher("76870f1c1806cc303ab9", {
      cluster: "eu",
      forceTLS: true,
    });
  }
  return pusherInstance;
};

export const getStockChannel = () => {
  if (!stockChannelInstance) {
    stockChannelInstance = getPusher().subscribe("variation-stock");
  }
  return stockChannelInstance;
};

export default getPusher;