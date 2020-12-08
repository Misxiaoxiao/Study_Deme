export interface IDisconnected {
  code: number;
  msg: string;
  detail: {
    message: string;
    key: string;
  };
}
