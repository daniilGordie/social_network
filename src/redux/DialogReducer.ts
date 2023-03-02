import { InferActionTypes } from './redux-store'

const SEND_MESSAGE = 'sn/dialogs/SEND-MESSAGE'

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
type ActionTypes = InferActionTypes<typeof actions>

export const dialogReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  const dialogState = {
    ...state,
    messagesData: [...state.messagesData],
  }
  // dialogState.messagesData = [...state.messagesData]

  switch (action.type) {
    case SEND_MESSAGE:
      dialogState.messagesData.push({ id: 'someID', message: action.message })
      return dialogState
    default:
      return state
  }
}

export const actions = {
  sendMessage: (text: string) =>
    ({
      type: SEND_MESSAGE,
      message: text,
    } as const),
}

export default dialogReducer
