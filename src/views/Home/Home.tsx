import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import Template from '../Template';
import { ScanOutlined, SearchOutlined, LinkOutlined, QrcodeOutlined } from '@ant-design/icons';
import './Home.scss';

export default function Home() {
  const navigate = useNavigate();

  const handleClick = (to: string) => {
    switch(to) {
      case 'qrcode':
        navigate('qrcode');
        break;
      case 'search':
        navigate('search');
        break;
      default:
        break;
    }
  }
  return (
    <Template>
      <div className='home-container'>
        <div className='row'>
          <div className="card" style={{ width: '18rem'}} onClick={() => {
          handleClick('qrcode')
        }}>
            <div>
              <ScanOutlined style={{ fontSize: 60, color: '#31004a' }} className="icon" />
            </div>
            <div className='header'>
              Get Paid QR Code
            </div>
          </div>
          <div className="card" style={{ width: '18rem'}} onClick={() => {
          handleClick('search')
        }}>
            <div>
              <SearchOutlined style={{ fontSize: 60 }} className="icon" />
            </div>
            <div className='header'>
              Search
            </div>
          </div>
          </div>
          <div className='row'>
          <div className="card" style={{ width: '18rem'}}>
            <div>
              <QrcodeOutlined  style={{ fontSize: 60 }} className="icon" />
            </div>
            <div className='header'>
              Pay Scan
            </div>
          </div>
          <div className="card" style={{ width: '18rem'}}>
            <div>
              <LinkOutlined style={{ fontSize: 60 }} className="icon"/>
            </div>
            <div className='header'>
              Payment Link
            </div>
          </div>
          </div>
      </div>
    </Template>
  )
}
