import logo from './logo.svg'
import './normal.css'
import './App.css'
import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [chatLog, setChatLog] = useState([
    { user: 'gpt', message: 'How can I help you today?' },
    {
      user: 'me',
      message: 'I want to use ChatGPT today.',
    },
  ])

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3080', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: chatLog.map((message) => message.message).join(''),
        }),
      })

      const data = await response.json()
      setChatLog([...chatLog, { user: 'gpt', message: data.message }])
      console.log(data.message)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button">
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        {chatLog.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        <div className="chat-message chatgpt">
          <div className="chat-message-center">
            <div className="avatar chatgpt"></div>
            <div className="message">I am AI</div>
          </div>
        </div>
      </section>
      <div className="chat-input-holder">
        <form onSubmit={handleSubmit}>
          <input
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-input-textarea"
          />
        </form>
      </div>
    </div>
  )
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === 'gpt' ? 'chatgpt' : ''}`}>
      <div className="chat-message-center">
        <div className={message.user}></div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  )
}

export default App
