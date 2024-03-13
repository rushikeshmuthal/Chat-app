import { useEffect, useState } from "react";
import client,{
  createDocument,
  getMessages,
  deleteDocument,
} from "../appwrite/appwriteConfig";
import { Trash } from "react-feather";
import config from "../config";
import Header from "../components/Header";
import { useAuth } from "../utils/AuthContext";
import { Permission, Role } from "appwrite";


const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessagebody] = useState("");
  const {user} =useAuth()

  useEffect(() => {
    getMessages().then((response) => {
      setMessages(response.documents);
    });
  const unsubscribe =  client.subscribe(`databases.${config.appwriteDatabaseId}.collections.${config.appwriteCollectionId}.documents`, function (response) {
      //callback will be executed on changes for documents 
      if(response.events.includes( "databases.*.collections.*.documents.*.create")){
        console.log('A message is created');
      setMessages((prevMessages) => [response.payload, ...prevMessages]);

      }
      if(response.events.includes( "databases.*.collections.*.documents.*.delete")){
        console.log('A message was deleted');
    setMessages(() => messages.filter((message) => message.$id !== response.payload.$id));

      }
      }
  )

  return (()=> {
    unsubscribe()
  })
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const permissions = [
      Permission.write(Role.user(user.$id)),
    ]

    const payload = {
      user_id: user.$id,
      username:user.name,
      body: messageBody,
    };
    createDocument(payload, permissions)
    .then(response=> console.log(response))
    setMessagebody("");
  };

  const deleteMessage = (id) => {
    deleteDocument(id)
    
    .catch((console.error()))
  };

  return (
    <main className="container">
      <Header/>
      <div className="room--container">
        <form action="" onSubmit={handleSubmit}>
          <div>
            <textarea
              required
              maxLength="1000"
              placeholder="Say something..."
              onChange={(e) => setMessagebody(e.target.value)}
              value={messageBody}
            ></textarea>
          </div>
          <div className="send-btn--wrapper">
            <input type="submit" value="Send" className="btn btn--secondary" />
          </div>
        </form>

        <div>
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
              <p>
                {message?.username ? (
                  <span>{message.username}</span>
                ): (
                  <span>Anonymous</span>
                )}
                <small className="message-timestamp">
                  {new Date(message.$createdAt).toLocaleString()}
                </small>
              </p>
                  
              {message.$permissions.includes(`delete("user:${user.$id}")`) && (
                            <Trash className="delete--btn" onClick={() => {deleteMessage(message.$id)}}/>
                            
                        )}
              </div>
              <div className={"message--body" + (message.user_id === user.$id ? ' message--body--owner' : '')}>
                        <span>{message.body}</span>                        
                    </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
