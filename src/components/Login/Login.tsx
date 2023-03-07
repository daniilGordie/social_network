import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { connect } from 'react-redux'
import { setLogin } from '../../redux/authReducer.ts'
import { useNavigate } from 'react-router-dom'
import { AppStateType } from '../../redux/redux-store'

type Inputs = {
  email: string
  password: string
  captcha: any
}

const Login = ({ setLogin, isSubmitSucces, captchaURL }) => {
  const navigate = useNavigate()

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLogin(data.email, data.password, true, () => navigate('/profile'), captcha)
    reset()
  }
  const captcha = () => watch('captcha')

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="email"
            {...register('email', {
              required: 'Email is required field!',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter valid Email',
              },
            })}
          />
          <div>{errors.email && <span>Please enter valid Email</span>}</div>
        </div>
        <div>
          <input placeholder="password" {...register('password')} />
          <div>{errors.password && <span>This field is required</span>}</div>
        </div>
        {isSubmitSucces || (
          <div>
            <span>Login or password is incorrect</span>
          </div>
        )}
        {captchaURL && (
          <div>
            <img src={captchaURL} alt={'captcha'} />
            <div>
              <input
                type="text"
                placeholder="Enter symbols from  captcha"
                {...register('captcha')}
              />
            </div>
          </div>
        )}
        <input type="submit" />
      </form>
    </div>
  )
}

const mapStateToProps = (state: AppStateType) => ({
  isSubmitSucces: state.auth.isSubmitSucces,
  captchaURL: state.auth.captchaURL,
})
export default connect(mapStateToProps, { setLogin })(Login)
