import React, { useState, useEffect, useCallback, memo } from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { getChatId } from 'util/util';
import { connect } from 'react-redux';
import { chatFuc } from 'reducer/chat/redux';

const { getChatList, sendMsg, msgReceive, readMsg } = chatFuc

const Chat = (props) => {
  console.log(props)
  const [ state, setState ] = useState({
    text: '',
    msg: []
  })

  const onChange = useCallback(
    (key, val) => {
      setState(state => {
        const obj = {}
        obj[key] = val
        return { ...state, ...obj }
      })
    },
    [setState]
  )

  // useEffect(() => {
  //   if (!props.chat.chatmsg.length) {
  //     props.getChatList();
  //     props.msgReceive();
  //   }
  //   fixedBug()
    // return () => {
    //   const to = props.match.params.user;
    //   props.readMsg(to);
    // }
  // })

  const fixedBug = () => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0)
  }

  const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '.split(' ').filter(v => v).map(v => ({text: v}));
  const userId = props.match.params.user;
  console.log(props.user)
  const currentChatId = '2131' || getChatId(userId, props.user.user);
  const chatMsgs = props.chat.chatmsg.filter(v => v.chatId === currentChatId);
  const Item = List.Item;
  const users = props.chat.users;

  if (!users[userId]) return null;

  const handleSubmit = () => {
    const from = props.user._id;
    const to = props.match.params.user;
    const msg = state.text;
    props.sendMsg(from, to, msg);
    setState(state => ({
      ...state,
      text: '',
      showEmoji: false
    }))
  }

  return (
    <div id="chat-page">
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => {
          props.history.goBack()
        }}
      >
        {users[userId].name}
      </NavBar>
      <div>
        {
          chatMsgs.map(v => {
            const avatar = require(`assets/img/${users[v.from].avatar}.png`);
            return v.from = userId ?
                            (
                              <List key={v._id}>
                                <Item thumb={avatar}>
                                  {v.content}
                                </Item>
                              </List>
                            ) :
                            (
                              <List key={v._id}>
                                <Item extra={<img src={avatar} alt="" />} className="chat-me" >
                                  {v.content}
                                </Item>
                              </List>
                            )
          })
        }
      </div>
      <div className="stick-footer">
        <List>
          <InputItem
            placeholder="请输入"
            value={state.text}
            onChange={onChange}
            extra={
              <div>
                <span
                  style={{ fontSize: 12, marginRight: 15 }}
                  onClick={() => { onChange('showEmoji', state.showEmoji) }}
                >😃</span>
                <span onClick={() => handleSubmit()}>发送</span>
              </div>
            }
          />
        </List>
        {
          state.showEmoji ?
            <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={el => { setState('text', state.text + el.text) }}
            />
            :
            null
        }
      </div>
    </div>
  )
}

export default connect(
  state => state,
  { getChatList, sendMsg, msgReceive, readMsg }
)(memo(Chat))
