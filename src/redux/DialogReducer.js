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
      dialogState.messagesData.push({ id: 6, message: body })
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

// TODO: Refactor reducers by createReducers

// const todosReducer = createReducer([], (builder) => {
//   builder
//     .addCase('ADD_TODO', (state, action) => {
//       // "мутируем" массив, вызывая push()
//       state.push(action.payload);
//     })
//     .addCase('TOGGLE_TODO', (state, action) => {
//       const todo = state[action.payload.index];
//       // "мутируем" объект, перезаписывая его поле `completed`
//       todo.completed = !todo.completed;
//     })
//     .addCase('REMOVE_TODO', (state, action) => {
//       // мы по-прежнему можем использовать иммутабельную логику обновления состояния
//       return state.filter(
//         (todo, i) => i !== action.payload.index
//       );
//     });
// });
