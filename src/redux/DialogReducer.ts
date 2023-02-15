const SEND_MESSAGE = 'SEND-MESSAGE'

type DialogType = {
  id: number
  name: string
}

type MessageType = {
  id: string
  message: string
}

const initialState = {
  dialogData: [
    { id: 1, name: 'Dimych' },
    { id: 2, name: 'Dimasic' },
    { id: 3, name: 'Dima' },
  ] as Array<DialogType>,
  messagesData: [
    { id: '1', message: 'Hi' },
    { id: '2', message: 'How are you' },
    { id: '3', message: 'Ready-Go' },
  ] as Array<MessageType>,
}

export type InitialStateType = typeof initialState

export const dialogReducer = (state = initialState, action: any): InitialStateType => {
  const dialogState = {
    ...state,
    messagesData: [...state.messagesData],
  }
  // dialogState.messagesData = [...state.messagesData]

  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.body
      dialogState.messagesData.push({ id: 'someID', message: body.message })
      return dialogState
    default:
      return state
  }
}

type SendMessageActionType = {
  type: typeof SEND_MESSAGE
  body: string
}

export const sendMessage = (text: string): SendMessageActionType => {
  return {
    type: SEND_MESSAGE,
    body: text,
  }
}

export default dialogReducer
