const SEND_MESSAGE = 'SEND-MESSAGE'

const initialState = {
  dialogData: [
    { id: 1, name: 'Dimych' },
    { id: 2, name: 'Dimasic' },
    { id: 3, name: 'Dima' },
  ],
  messagesData: [
    { id: '1', message: 'Hi' },
    { id: '2', message: 'How are you' },
    { id: '3', message: 'Ready-Go' },
  ],
}

export const dialogReducer = (state = initialState, action) => {
  const dialogState = {
    ...state,
    messagesData: [...state.messagesData],
  }
  // dialogState.messagesData = [...state.messagesData]

  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.body
      dialogState.messagesData.push({ id: 6, message: body.message })
      return dialogState
    default:
      return state
  }
}

export const sendMessage = (text) => {
  return {
    type: SEND_MESSAGE,
    body: text,
  }
}

export default dialogReducer
