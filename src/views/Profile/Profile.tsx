import * as React from 'react';
import TemplateWrapper from '../Template';
import { useStoreState } from 'easy-peasy';
import { Model } from '../../store/model';
import {UserOutlined, MailOutlined} from '@ant-design/icons';

import './Profile.scss';
import Button from '../../components/common/Button';

export default function Profile() {
  const profile = useStoreState<Model>((state) => state.profile)
    return (
    <TemplateWrapper defaultIndex='7'>
        <div className='profile-container'>
            <div className='container-container'>
                <div className='image-container'>
                    <img src={profile.avatar} className="image" />
                </div>
                <div className='details'>
                    <div className='names'><UserOutlined /><span>{profile.firstName} {profile.lastName}</span></div>
                    <div className='names'><MailOutlined /><span>{profile.email}</span></div>
                </div>
                <div className='edit-container'>
                    <Button type='primary' clickHandler={() => {}}>
                        Update Profile
                    </Button>
                </div>
            </div>
        </div>
    </TemplateWrapper>
  )
}
