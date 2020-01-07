import Types from './dispatch.type';
import io from 'socket.io-client';
const socket = io('ws://localhost:3000')

const initialState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.MSG_LIST:
      return { ...state, chatmsg: action.payload.data, users: action.payload.users, unread: action.payload.data.filter(v => !v.read && v.to === action.payload.userid).length };
    case Types.MSG_RECV:
      const n = action.payload.to === action.userid ? 1 : 0;
      return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n };
    case Types.MSG_READ:
      const { from, num } = action.payload;
      return { ...state, chatmsg: state.chatmsg.map(v => ({...v, read: from === v.from ? true : v.read})), unread: state.unread - num };
    default:
      return state;
  }
}

export const chatActions = {
  msgList: (data, users, userid) => ({
    type: Types.MSG_LIST,
    payload: {data, users, userid}
  }),
  receiveMsg: (msg, userid) => ({
    type: Types.MSG_RECV,
    payload: msg,
    userid
  }),
  msgRead: (from, userid, num) => ({
    type: Types.MSG_READ,
    payload: { from, userid, num }
  })
}

export const chatFuc = {
  msgReceive: (dispatch, getState) => {
    WebSocket.on('receivemsg', (data) => {
      const userid = getState().user._id;
      dispatch(chatActions.receiveMsg(data, userid));
    })
  },
  sendMsg: (from, to, msg) => {
    socket.emit('sendmsg', {from, to, msg});
  },
  getChatList: (dispatch, getState) => {
    const bool = true;
    if (bool) {
      const res = {}
      const userid = getState().user._id;
      dispatch(chatActions.msgList(res.data.data, res.data.users, userid));
    }
  },
  readMsg: (from) => (dispatch, getState) => {
    const bool = true;
    const userid = getState().user._id;
    if (bool) {
      const num = 1;
      dispatch(chatActions.msgRead(from, userid, num));
    }
  }
}
