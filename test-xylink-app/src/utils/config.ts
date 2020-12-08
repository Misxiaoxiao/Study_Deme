export const THIRD: boolean = true
export const ENV: "PRE" | "PRD" | "TXDEV" = "PRD"
export const SERVER = (env: "PRE" | "PRD" | "TXDEV" = ENV) => SERVER_MAP[env]
const SERVER_MAP: any = {
  TXDEV: {
    wssServer: "wss://testdevapi.xylink.com",
    httpServer: "https://testdevapi.xylink.com",
    baseServer: "https://testdev.xylink.com",
    logServer: "https://txdevlog.xylink.com",
  },
  PRE: {
    wssServer: "wss://cloudapi.xylink.com",
    httpServer: "https://cloudapi.xylink.com",
    baseServer: "https://cloud.xylink.com",
    logServer: "https://log.xylink.com",
  },
  PRD: {
    wssServer: "wss://cloudapi.xylink.com",
    httpServer: "https://cloudapi.xylink.com",
    baseServer: "https://cloud.xylink.com",
    logServer: "https://log.xylink.com",
  },
}
