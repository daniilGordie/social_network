import React from 'react'
import s from './Dialogs.module.css'
import InitialStateType from './../../redux/dialog-reducer'
import Message from './Message/Message.tsx'
import DialogItem from './DialogItem/DialogItem.tsx'
import { useForm, SubmitHandler } from 'react-hook-form'

type PropsType = {
  dialogPage: typeof InitialStateType
  send: (data: string) => void
}

type Input = {
  message: string
}

const Dialogs: React.FC<PropsType> = (props) => {
  const state = props.dialogPage

  let dialogsElements = state.dialogData.map((dialog: any) => (
    <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
  ))

  let messagesElements = state.messages.map((m) => <Message message={m.message} key={m.id} />)

  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_item}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessageForm {...props} />
      </div>
    </div>
  )
}
const AddMessageForm = (props) => {
  const onSubmit: SubmitHandler<Input> = (data) => {
    props.send(data.message)
    reset()
  }

  const { register, handleSubmit, reset } = useForm<Input>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="write something" {...register('message', { required: true })} />
      </div>
      <button>Send</button>
    </form>
  )
}

export default Dialogs
