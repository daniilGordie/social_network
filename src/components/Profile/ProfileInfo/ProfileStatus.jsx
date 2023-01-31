import React, { useState } from 'react'

function ProfileStatus(props) {
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState('Write something about your status')

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = (status) => {
    setEditMode(false)
    props.updateCurrentStatus(status)
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      {!editMode && <span onClick={activateEditMode}>{status}</span>}
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
