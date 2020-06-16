import React, { useEffect } from 'react';
import Layout from '../../HOC/Layout/Layout';
import Icon from '../../components/UI/Icon/Icon';
import { useHistory } from 'react-router-dom';
import './Home.scss';

const Home = (props) => {
  const history = useHistory();

  return (
    <Layout>
      <Layout.Content>
        <div className='menu'>
          <div className='menuHeader'>
            <h2>Fun App</h2>
            <p>Entertaiment and fun</p>
          </div>
          <div className='blob'></div>

          <div className='menuItem' onClick={() => history.push('/chat')}>
            <Icon name='message' className='menuIcon' />
            <p className='menuText'>Chat</p>
          </div>
          <div className='menuItem' onClick={() => history.push('/media')}>
            <Icon name='play-circle' className='menuIcon' />
            <p className='menuText'>Media</p>
          </div>
          <div className='menuItem' onClick={() => history.push('/game')}>
            <Icon name='gamepad' className='menuIcon' />
            <p className='menuText'>Game</p>
          </div>
          <div className='menuItem' onClick={() => history.push('/library')}>
            <Icon name='drawer' className='menuIcon' />
            <p className='menuText'>Library</p>
          </div>
          <div className='menuItem' onClick={() => history.push('/login')}>
            <Icon name='user' className='menuIcon' />
            <p className='menuText'>Login</p>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default Home;
