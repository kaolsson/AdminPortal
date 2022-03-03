import { useNavigate } from 'react-router-dom';
import { List } from '@material-ui/core';
import { useSelector } from '../../../store';
import ChatThreadItem from './ChatThreadItem';
import useAuth from '../../../hooks/useAuth';

const ChatThreadList = (props) => {
  const { threads, activeThreadId } = useSelector((state) => state.chat);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSelect = (threadId) => {
    const thread = threads.byId[threadId];
    let threadKey;

    if (thread.type === 'GROUP') {
      threadKey = thread.id;
    } else {
      const otherParticipant = thread.participants.find((participant) => (participant.id
        !== user.customerID));
      threadKey = otherParticipant.username;
      console.log(threadKey);
    }
    navigate(`/chat/${threadKey}`);
  };

  return (
    <List {...props}>
      {threads.allIds.map((threadId) => (
        <ChatThreadItem
          active={activeThreadId === threadId}
          key={threadId}
          onSelect={() => handleSelect(threadId)}
          thread={threads.byId[threadId]}
        />
      ))}
    </List>
  );
};

export default ChatThreadList;
