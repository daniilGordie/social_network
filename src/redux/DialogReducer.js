const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

export const dialogReducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.body
      return state
    case SEND_MESSAGE:
      let body = state.newMessageBody
      state.newMessageBody = ''
      state.messagesData.push({ id: 6, message: body })
      return state
  }
}

export const sendMessageCreator = () => {
  return {
    type: SEND_MESSAGE,
  }
}
export const updateNewMessageBodyCreator = (text) => {
  return {
    body: text,
    type: UPDATE_NEW_MESSAGE_BODY,
  }
}

export default dialogReducer
