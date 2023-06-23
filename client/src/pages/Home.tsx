import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import { useLoggedInAuth } from "../context/AuthContext";

export function Home() {
  const { user, streamChat } = useLoggedInAuth();

  if (streamChat == null) return <LoadingIndicator />;

  return (
    <Chat client={streamChat}>
      <ChannelList filters={{ members: { $in: [user.id] } }} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
}
