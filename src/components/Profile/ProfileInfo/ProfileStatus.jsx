import React, { useEffect, useState } from 'react'
// import s from './ProfileInfo.module.css'

function ProfileStatus(props) {
  const [editMode, setEditMode] = useState(false)

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
  }

  const [status, setStatus] = useState('Say somethimg about yourself')

  // useEffect(

  // )

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      {!editMode && (
        <div>
          <span onClick={activateEditMode}>{status}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            type="text"
            value={status}
          />
        </div>
      )}
    </div>
  )
}

export default ProfileStatus
