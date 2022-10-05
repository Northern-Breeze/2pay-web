import * as React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import './Input.scss';


type Props = {
  label: Path<any>;
  register: UseFormRegister<any>;
  required: boolean;
  errors: any,
  type: string,
}

export default function Input(props: Props) {
  const { label, register, required, errors, type } = props;
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input type={type} className="form-control" {...register(label, { required })} />
      {errors.firstName && <div className='invalid-feedback'>{errors.firstName.message}</div>}
    </>
  )
}
