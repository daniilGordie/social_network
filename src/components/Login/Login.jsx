import React from 'react'
import { useForm } from 'react-hook-form'

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="login" {...register('login')} />
        <div>{errors.login && <span>This field is required</span>}</div>
      </div>
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

      <input type="submit" />
    </form>
  )
}

export default Login
