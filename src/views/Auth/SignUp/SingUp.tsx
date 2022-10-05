import * as React from 'react';
import Notification from 'antd/es/notification';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import './SignUp.scss';
import Server from '../../../networking/server';
import Input from '../../../components/common/Input';

type Inputs = {
  lastName: string,
  firstName: string,
  email: string,
  password: string,
};

export default function SingUp() {

  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
      try {
        setLoading(true);
        const response = await Server.registerUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password
        });
        if (!response.data.success) {
          Notification.error({
            message: response.data.message
          })
          setLoading(false);
        } else {
          setLoading(false);
          navigate('/login')
          Notification.success({
            message: response.data.message
          })
        }        
      } catch (error) {
        setLoading(false);
        console.log(error);
        Notification.error({
          message: 'Something went wrong please try again later'
        })
      }
  };


  return (
    <div className='sign-up-container'>
      <div className='header'>Sign Up</div>
      <div className='form-container'>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <Input label='firstName' register={register} required errors={errors} type="text" />
          </div>
          <div className="form-group">
            <Input label='lastName' register={register} required errors={errors} type="text" />
          </div>
          <div className="form-group">
            <Input label='email' register={register} required errors={errors} type="email" />
          </div>
          <div className="form-group">
            <Input label='password' register={register} required errors={errors} type="password" />
          </div>
          <div className='form-group'>
            <button className='btn btn-primary'>
              {loading ? 'Loading ...': 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
