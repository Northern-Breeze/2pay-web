import * as React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import './SignUp.scss';

type Inputs = {
  lastName: string,
  firstName: string,
  email: string,
  password: string,
};

export default function SingUp() {

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data)
  };


  return (
    <div className='sign-up-container'>
      <div className='header'>Sign Up</div>
      <div className='form-container'>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="FirstName">First Name</label>
            <input type="text" className="form-control" {...register("firstName", { required: true, maxLength: 100, minLength: 2 })} />
            {errors.firstName && <div className='invalid-feedback'>{errors.firstName.message}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="LastName">First Name</label>
            <input type="text" className="form-control" {...register('lastName', { required: true, maxLength: 100, minLength: 2 })} />
            {errors.lastName && <div className='invalid-feedback'>{errors.lastName.message}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="Email">Email</label>
            <input type="email" className="form-control" {...register('email', { required: true, maxLength: 100 })} />
            {errors.email && <div className='invalid-feedback'>{errors.email.message}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input type="password" className="form-control" {...register('password', { required: true })}/>
            {errors.password && <div className='invalid-feedback'>{errors.password.message}</div>}
          </div>
          <div className='form-group'>
            <button className='btn btn-primary'>
              Register Now!
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
