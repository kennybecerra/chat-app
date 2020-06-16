import React, { useState, useEffect } from 'react';
import Layout from '../../HOC/Layout/Layout';
import OverlayScrollbars from 'overlayscrollbars';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { MD5 } from '../../utility/utility';
import { auth, fireStore } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import './Chat.scss';

const Chat = (props) => {
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

  const [textInput, setTextInput] = useState('');

  const handleTextInput = (e) => {
    setTextInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(auth.currentUser);
  };

  return (
    <Layout>
      {/* <Layout.Nav />

      <Layout.Content>
        <h2 className='chatroom-name'>Name of chat</h2>

        search


        <div className='chat-container os-host-flexbox'>
          <OverlayScrollbarsComponent
            style={{ width: '100%' }}
            options={{
              scrollbars: { autoHide: 'scroll' },
              sizeAutoCapable: true,
            }}>
            {fakeData.map((message, index) => {
              return (
                <div
                  key={index}
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
          </OverlayScrollbarsComponent>
        </div>
      </Layout.Content>

      <Layout.Footer>
        <form className='chat-input-container' onSubmit={handleSubmit}>
          <img
            className='profile-image'
            src={`https://www.gravatar.com/avatar/${MD5(
              'Kb10j.kb@gmail.com'
            )}?d=wavatar`}
            alt='Profile'
          />
          <input
            className='text-input'
            type=''
            name='textInput'
            id='textInput'
            placeholder='Place message here'
            value={textInput}
            onChange={handleTextInput}
          />
          <button className='submit-button'>send</button>
        </form>
      </Layout.Footer> */}
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps)(Chat);
