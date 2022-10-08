import * as React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import Notification from 'antd/es/notification';
import { Link } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Server from '../../../networking/server';

import './SignIn.scss'

type Inputs = {
  email: string;
  password: string;
}

export default function SignIn() {
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const saveToken = useStoreActions<any>(actions => actions.saveToken);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
      try {
        setLoading(true);
        const response = await Server.signInUser({
          email: data.email,
          password: data.password
        });
        if (!response.data.success) {
          Notification.error({
            message: response.data.message
          });
          setLoading(false);
        } else {
          setLoading(false);
          const token = response.data.data.token;
          saveToken({ token, profile: response.data.data.profile });
          localStorage.setItem('authToken', token);
          Notification.success({
            message: response.data.message
          });
          navigate('/');
        }
      } catch (error) {
        setLoading(false);
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
