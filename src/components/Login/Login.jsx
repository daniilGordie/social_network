import React from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { setLogin } from '../../redux/authReducer'
import { useNavigate } from 'react-router-dom'

const Login = ({ setLogin, isSubmitSucces }) => {
  const navigate = useNavigate()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    setLogin(data.email, data.password, true, () => navigate('/profile'))
    reset()
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
        {isSubmitSucces || (
          <div>
            <span>Login or password is incorrect</span>
          </div>
        )}
        <input type="submit" />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isSubmitSucces: state.auth.isSubmitSucces,
})
export default connect(mapStateToProps, { setLogin })(Login)
