import React from 'react'
import s from './Dialogs.module.css'

import Message from './Message/Messsage'
import DialogItem from './DialogItem/DialogItem'
import { useForm } from 'react-hook-form'

const Dialogs = (props) => {
  const state = props.dialogPage

  let dialogsElements = state.dialogData.map((dialog) => (
    <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
  ))

  let messagesElements = state.messagesData.map((m) => <Message message={m.message} key={m.id} />)

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
  const onSubmit = (data) => {
    props.send(data)
    reset()
  }

  const { register, handleSubmit, reset } = useForm()

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
