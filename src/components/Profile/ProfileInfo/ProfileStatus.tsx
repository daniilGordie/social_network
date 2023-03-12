import React, { useState, ChangeEvent } from 'react'

type PropsType = {
  status: string
  updateCurrentStatus: any
}

const ProfileStatus: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(props.status)

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = (status: string) => {
    setEditMode(false)
    props.updateCurrentStatus(status)()
  }

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      {!editMode && (
        <span onClick={activateEditMode}>
          <b>Status: </b>
          {status}
        </span>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={() => {
              deactivateEditMode(status)
            }}
            type="text"
            value={status}
          />
        </div>
      )}
    </div>
  )
}

export default ProfileStatus
