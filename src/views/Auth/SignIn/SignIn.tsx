import * as React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import Notification from 'antd/es/notification';
import Input from '../../../components/common/Input';
import './SignIn.scss'
import Server from '../../../networking/server';
import { Link } from 'react-router-dom';

type Inputs = {
  email: string;
  password: string;
}

export default function SignIn() {
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
      try {
        const response = await Server.signInUser({
          email: data.email,
          password: data.password
        });
        if (!response.data.success) {
          Notification.error({
            message: response.data.message
          });
        } else {
          Notification.success({
            message: response.data.message
          })
        }
      } catch (error) {
        console.log(error);
        Notification.error({
          message: 'Something went wrong please try again later'
        })
      }
  }
  return (
    <div className='log-in-container'>
      <div className='header'>Sign Up</div>
      <div className='form-container'>
        <form className='form'  onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <Input label='Email' register={register} required type='email' errors={errors} placeholder="Email" value='email' />
          </div>
          <div className='form-group'>
            <Input label='Password' register={register} required type='password' errors={errors} placeholder="Password" value='password' />
          </div>
          <div className='form-group'>
            <Link to="/register" className='link'>
              Don't have an account? Sign Up
            </Link>
          </div>
          <div className='form-group'>
            <button className='btn btn-primary'>
              {loading ? 'Loading ...': 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
