import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import s from './ProfileDataForm.module.css'
import ProfileType from './../../../types/types.ts'

type Inputs = {
  FullName: string
  lookingForAJob: string
  LookingForAJobDescription: string
  AboutMe: string
  'contacts.GitHub': string
  'contacts.LinkedIn': string
  'contacts.Facebook': string
  'contacts.Instagram': string
  'contacts.Twitter': string
  'contacts.Website': string
}

type PropsType = {
  goOutFromEditMode: () => void
  saveProfileData: (profile: ProfileType) => Promise<any>
}

const ProfileDataForm: React.FC<PropsType> = ({ goOutFromEditMode, saveProfileData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (profile) => {
    saveProfileData(profile).then(() => {
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
          {...register('FullName', { required: true })}
        />
      </div>
      {errors.FullName && <span className={s.form_text}>This field is required</span>}

      <div>
        <b>Looking for a job:</b>
        <input
          className={s.profile_form_input}
          type="checkbox"
          {...register('lookingForAJob', { required: true })}
        />
      </div>
      {errors.lookingForAJob && <span className={s.form_text}>This field is required</span>}

      <div>
        <b>My professional skills:</b>
        <input
          className={s.profile_form_input}
          type="text"
          placeholder="Please describe your skills"
          {...register('LookingForAJobDescription', { required: true })}
        />
      </div>
      {errors.LookingForAJobDescription && (
        <span className={s.form_text}>This field is required</span>
      )}

      <div>
        <b>About me:</b>
        <input
          className={s.profile_form_input}
          type="text"
          placeholder="Tell about yourself"
          {...register('AboutMe', { required: true })}
        />
      </div>
      {errors.AboutMe && <span className={s.form_text}>This field is required</span>}
      <div>
        <b>GitHub:</b>
        <input
          className={s.profile_form_contact_input}
          type="text"
          placeholder="GitHub"
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
