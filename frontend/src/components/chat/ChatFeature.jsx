import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
    cursor: pointer;
`;

const Messages = styled.div`
    flex:1
    flex-direction: column;
    align-items: center;
    padding: 15px;
    position: relative;
`;
const rooms = [
    'General',
    'Random',
    'Jokes',
    'Javascript'
]

const ChatFeature = (props) => {
    const renderRooms = (room) => {
        const currentChat = {
            chatName: room,
            isChannel: true,
            recieverId: '',
        }
        return (
          
            <button className="btn btn-block" onClick={() => props.toggleChat(currentChat)} key={room}>
                {room}    
            </button>
           
        )
    }

    const renderUser = (user) => {
        if(user.id === props.yourId) {
            return (
                <p key={user.id}>
                     You : {user.username}    
                </p>
            )
        }

        const currentChat = {
            chatName: user.username, 
            isChannel: false, 
            recieverId: user.id,
        }
        return (
            <Row onClick={() => {
                props.toggleChat(currentChat)
            }} key={user.id}>
                {user.username}    
            </Row>
        )
    }

    const renderMessages = (message, index) => {
        return (
            <div key={index}>
                <h3>{message.sender}</h3>
                <p>{message.content}</p>    
            </div>
        )
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            props.sendMessage()
        }
    }

    let body;
    if(!props.currentChat.isChannel || props.connectedRooms.includes(props.currentChat.chatName)){
        body = (
            <Messages>
                <h3>Connected to {props.currentChat.chatName}</h3>
                <div className="card">
                {props.messages.map(renderMessages)}
                </div>
                
                    
                <input
                    className='input-group'
                    style={{width: '100%', height: '100%', padding: '6px'}}
                    type='text'
                    value={props.message}
                    onChange={props.handleMessageChange}
                    onKeyPress={handleKeyPress}
                    placeholder='You are in a live chat..'
                />
               
             
            </Messages>
            )
    } else {
        body = (
            <button className="btn btn-block" onClick={() => props.joinRoom(props.currentChat.chatName)}>
                Join {props.currentChat.chatName}
                </button>
        )
    }

  return (
    <Container>
      <Wrapper>
          <h3>Channels</h3>
          {rooms.map(renderRooms)}
          <h3>Connected Users</h3>
            <div >
            {props.allUsers.map(renderUser)}
            </div>
      </Wrapper>
      <Wrapper>
            {body}   
      </Wrapper>
    </Container>
  )
}

export default ChatFeature