import React from 'react';
import Layout from '../../HOC/Layout/Layout';
import Icon from '../../components/UI/Icon/Icon';
import { useHistory } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = (props) => {
  const history = useHistory();

  return (
    <Layout>
      <Layout.Content>
        <div className={styles.menu}>
          <div className={styles.menuHeader}>
            <h2>Fun App</h2>
            <p>Entertaiment and fun</p>
          </div>
          <div className={styles.blob}></div>

          <div
            className={styles.menuItem}
            onClick={() => history.push('/chat')}>
            <Icon name='message' className={styles.menuIcon} />
            <p className={styles.menuText}>Chat</p>
          </div>
          <div
            className={styles.menuItem}
            onClick={() => history.push('/media')}>
            <Icon name='play-circle' className={styles.menuIcon} />
            <p className={styles.menuText}>Media</p>
          </div>
          <div
            className={styles.menuItem}
            onClick={() => history.push('/game')}>
            <Icon name='gamepad' className={styles.menuIcon} />
            <p className={styles.menuText}>Game</p>
          </div>
          <div
            className={styles.menuItem}
            onClick={() => history.push('/library')}>
            <Icon name='drawer' className={styles.menuIcon} />
            <p className={styles.menuText}>Library</p>
          </div>
          <div
            className={styles.menuItem}
            onClick={() => history.push('/login')}>
            <Icon name='user' className={styles.menuIcon} />
            <p className={styles.menuText}>Login</p>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default Home;
