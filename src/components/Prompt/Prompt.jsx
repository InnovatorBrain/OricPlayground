import React, { useState } from 'react';
import axios from 'axios';
import images from '../../constants/images';
import './Prompt.css';

function Prompt() {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState([]);

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/nlp/',
        { user_input: userInput },
        {
          headers: {
            'Content-Type': 'application/json',
            // Include the authentication token if required
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NTg4Mjg3LCJpYXQiOjE3MDg1ODQ2ODcsImp0aSI6IjliNjk0OWNmYjM1MjQ3MWE4M2Y1ZTk2ZTU3NGUzNTgxIiwidXNlcl9pZCI6N30.WmxX1vmPyLgpKPq2-VikkAt0U_pzm7z_9_mtN_DaKn8`,
          },
        }
      );

      // Extract messages from response
      const messages = response.data.messages;
      // Add new responses to the state
      setResponses([...responses, ...messages]);
      // Clear user input
      setUserInput('');
    } catch (error) {
      // Handle error
      console.error('Error:', error.response.data);
    }
  };

  return (
    <>
      <div className="prompt-main-container">
        <div className="responses-container">
          {responses.map((message, index) => (
            <div key={index} className={`response ${message.role}`}>
              {message.content}
            </div>
          ))}
        </div>
        <div className="messageBox">
          <input
            required
            placeholder="Message..."
            type="text"
            id="messageInput"
            value={userInput}
            onChange={handleChange}
          />
          <button id="sendButton" onClick={handleSubmit}>
            <img src={images.sendButton} alt="Send" id="prompts_send_button" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Prompt;
