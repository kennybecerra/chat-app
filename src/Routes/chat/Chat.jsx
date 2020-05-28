import React from 'react';
// import { db } from '../../firebase/firebase.utils';
import Layout from '../../HOC/Layout/Layout';
import './Chat.scss';

const Chat = () => {
  const fakeData = [
    {
      name: 'kenny',
      text: 'Het there how is it going person you ??',
    },
    {
      name: 'Melanie',
      text: 'Its going',
    },
    {
      name: 'kenny',
      text: 'how so?',
    },
    {
      name: 'kenny',
      text: 'Anything to add ?',
    },
    {
      name: 'Melanie',
      text: 'Nope',
    },
    {
      name: 'kenny',
      text: 'Well ok then',
    },
    {
      name: 'kenny',
      text: 'Well ok then',
    },
    {
      name: 'kenny',
      text: 'Well ok then',
    },
    {
      name: 'kenny',
      text: 'Well ok then',
    },
    {
      name: 'kenny',
      text: 'Well ok then',
    },
  ];

  return (
    <Layout>
      <Layout.Nav />

      <Layout.Content>
        <h2 className='chatroom-name'>Name of chat</h2>
        <div className='chat-container'>
          {fakeData.map((message) => {
            return (
              <div
                className={`message ${
                  message.name === 'kenny' ? 'left' : 'right'
                }`}>
                <h3 className='name'>{message.name}</h3>
                <div className='chat-bubble'>
                  <p className='text'>{message.text}</p>
                  <div className='emoji'>
                    <div className='emoji-options'></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Layout.Content>

      <Layout.Footer>
        <form className='chat-input-container'>
          <input type='text' name='' id='' />
          <button className='submit'>send</button>
        </form>
      </Layout.Footer>
    </Layout>
  );
};

export default Chat;
