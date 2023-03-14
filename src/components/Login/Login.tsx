import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { connect } from 'react-redux'
import { setLogin } from '../../redux/auth-reducer.ts'
import { AppStateType } from '../../redux/redux-store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

type Inputs = {
  email: string
  password: string
  captcha: any
}

type PropsType = {
  setLogin: (email: string, password: string, captchaURL: string) => void
}

const Login: React.FC<PropsType> = ({ setLogin }) => {
  const nav = useNavigate()
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLogin(data.email, data.password, data.captcha)
    reset()
  }

  if (isAuth) {
    nav('/profile')
  }

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
        {/* {!!errors && (
          <div>
            <span>Login or password is incorrect</span>
          </div>
        )} */}
        {captchaUrl && (
          <div>
            <img src={captchaUrl} alt={'captcha'} />
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
  captchaUrl: state.auth.captchaUrl,
})
export default connect(mapStateToProps, { setLogin })(Login)
