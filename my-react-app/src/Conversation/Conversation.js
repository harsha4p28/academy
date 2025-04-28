// import React from 'react';
// import "./Conversation.css";

// const Conversation = ({}) => {
//   const handleMessageSend = async (e) => {
//     e.preventDefault();
//   }

//   return (
//     <div className='ConversationContainer'>
//         <div className='ConversationMainContainer'>
//           <div className='ConversationHeader'>
//             <h2>harry potter</h2>
//           </div>
//             <div className='conversationContainer'>
//               <div className='messageSender'>
//                 <p>Hi, how are you?</p>
//               </div>
//               <div className='messageReceiver'>
//                 <p>I'm good, thanks! How about you?</p>
//               </div>
//             </div>
//             <div className='messageInputContainer'>
//               <input type="text" placeholder='Type your message...' />
//               <button onClick={handleMessageSend}>Send</button>   
//             </div>

//         </div>
//     </div>
//   )
// }

// export default Conversation


import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import "./Conversation.css";

const Conversation = ({ conversationId }) => {
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axios.get(`/conversations/${conversationId}`, { withCredentials: true });
        setConversation(response.data);
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };

    if (conversationId) {
      fetchConversation();
    }
  }, [conversationId]);

  if (!conversation) {
    return <div>Loading conversation...</div>;
  }

  return (
    <div className='ConversationContainer'>
      <div className='ConversationMainContainer'>
        <div className='ConversationHeader'>
          <h2>{conversation.name || "Conversation"}</h2>
        </div>
        <div className='conversationContainer'>
          {conversation.messages && conversation.messages.map((msg, index) => (
            <div key={index} className={msg.sender === 'user' ? 'messageSender' : 'messageReceiver'}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className='messageInputContainer'>
          <input type="text" placeholder='Type your message...' />
          <button>Send</button>   
        </div>
      </div>
    </div>
  );
};

export default Conversation;
