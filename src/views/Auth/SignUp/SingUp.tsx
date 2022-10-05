import * as React from 'react';
import './SignUp.scss';

export default function SingUp() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmailName] = React.useState('');
  const [password, setPasswordName] = React.useState('');


  return (
    <div className='sign-up-container'>
      <div className='header'>Sign Up</div>
      <div className='form-container'>
        <form className='form'>
          <div className="form-group">
            <label htmlFor="FirstName">First Name</label>
            <input type="text" className="form-control" name="firstName" value={firstName} />
          </div>
          <div className="form-group">
            <label htmlFor="LastName">First Name</label>
            <input type="text" className="form-control" name="lastName" value={lastName} />
          </div>
          <div className="form-group">
            <label htmlFor="Email">Email</label>
            <input type="email" className="form-control" name="email" value={email} />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input type="password" className="form-control" name="password" value={password} />
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
