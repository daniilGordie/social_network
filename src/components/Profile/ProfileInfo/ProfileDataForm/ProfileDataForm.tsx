import React from 'react'
import { useForm } from 'react-hook-form'
import s from './ProfileDataForm.module.css'

const ProfileDataForm = ({ goOutFromEditMode, saveProfileData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    saveProfileData(data).then(() => {
      goOutFromEditMode()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <b>Full Name:</b>
        <input
          className={s.profile_form_input}
          type="text"
          placeholder="Full Name"
          name="fullName"
          {...register('fullName', { required: true })}
        />
      </div>
      {errors.input1 && <span className={s.form_text}>This field is required</span>}

      <div>
        <b>Looking for a job:</b>
        <input
          className={s.profile_form_input}
          type="checkbox"
          name="lookingForAJob"
          {...register('lookingForAJob', { required: true })}
        />
      </div>
      {errors.input2 && <span className={s.form_text}>This field is required</span>}

      <div>
        <b>My professional skills:</b>
        <input
          className={s.profile_form_input}
          type="text"
          placeholder="Please describe your skills"
          name="lookingForAJobDescription"
          {...register('lookingForAJobDescription', { required: true })}
        />
      </div>
      {errors.input3 && <span className={s.form_text}>This field is required</span>}

      <div>
        <b>About me:</b>
        <input
          className={s.profile_form_input}
          type="text"
          placeholder="Tell about yourself"
          name="aboutMe"
          {...register('aboutMe', { required: true })}
        />
      </div>
      {/* {errors.input5 && <span className={s.form_text}>This field is required</span>} */}
      <div>
        <b>GitHub:</b>
        <input
          className={s.profile_form_contact_input}
          type="text"
          placeholder="GitHub"
          name="contacts.GitHub"
          {...register('contacts.GitHub', { required: false })}
        />
      </div>
      {/* {errors.contacts.GitHub && <span className={s.form_text}>This field is required</span>} */}

      <div>
        <b>LinkedIn:</b>
        <input
          className={s.profile_form_contact_input}
          type="text"
          placeholder="LinkedIn"
          name="contacts.LinkedIn"
          {...register('contacts.LinkedIn', { required: false })}
        />
      </div>
      {/* {errors.contacts.LinkedIn && <span className={s.form_text}>This field is required</span>} */}

      <div>
        <b>Facebook:</b>
        <input
          className={s.profile_form_contact_input}
          type="text"
          placeholder="Facebook"
          name="contacts.Facebook"
          {...register('contacts.Facebook', { required: false })}
        />
      </div>
      {/* {errors.contacts.Facebook && <span className={s.form_text}>This field is required</span>} */}

      <div>
        <b>Instagram:</b>
        <input
          className={s.profile_form_contact_input}
          type="text"
          placeholder="Instagram"
          name="contacts.Instagram"
          {...register('contacts.Instagram', { required: false })}
        />
      </div>
      {/* {errors.contacts.Instagram && <span className={s.form_text}>This field is required</span>} */}

      <div>
        <b>Twitter:</b>
        <input
          className={s.profile_form_contact_input}
          type="text"
          placeholder="Twitter"
          name="contacts.Twitter"
          {...register('contacts.Twitter', { required: false })}
        />
      </div>
      {/* {errors.contacts.Twitter && <span className={s.form_text}>This field is required</span>} */}

      <div>
        <b>Website:</b>
        <input
          className={s.profile_form_contact_input}
          type="text"
          placeholder="Website"
          name="contacts.Website"
          {...register('contacts.Website', { required: false })}
        />
      </div>
      {/* {errors.contacts.Website && <span className={s.form_text}>This field is required</span>} */}
      <button className={s.profile_form_button} type="submit">
        Submit
      </button>
    </form>
  )
}

export default ProfileDataForm
