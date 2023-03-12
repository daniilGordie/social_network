import React from 'react'
import s from './Contact.module.css'

type PropsType = {
  contactTitle: string
  contactValue: string
}

const Contact: React.FC<PropsType> = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}:</b>
      {contactValue}
    </div>
  )
}

export default Contact
