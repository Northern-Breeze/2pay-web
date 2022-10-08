import * as  React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input';
import TemplateWrapper from '../Template';
type STATES = 'LOADING' | 'ERROR' | 'SUCCESS';

import './Pay.scss';

type Props = {
    location: {
        state: {
            userId: number,
            firstName: string,
            lastName: string,
            email: string,
            avatar: string,
            sessionId: number,
        }
    }
}

type Inputs = {
    amount: number;
}

export default function Pay(props: Props) {
  const [amount, setAmount] = React.useState(0);
  const location = useLocation();

  const handleAmount = (e: any) => {
    setAmount(e.target.value);
  }

  if (!location.state) {
    return <TemplateWrapper>
        <div className='pay-container'>
            Error
        </div>
    </TemplateWrapper>
  }
  return (
    <TemplateWrapper>
        <div className='pay-container'>
                    <div className='image-container'>
                        <img src={location.state.avatar} className='image' alt='User' />
                    </div>
                    <div>
                        <div className='amount-enter'>
                           <span>R</span> <input className='form-control' name='amount' value={amount} onChange={handleAmount} />
                        </div>
                    </div>
                    <div>
                        <Button type='primary'>
                            Appreciate with R {amount}
                        </Button>
                    </div>
                </div>
    </TemplateWrapper>
  )
}
