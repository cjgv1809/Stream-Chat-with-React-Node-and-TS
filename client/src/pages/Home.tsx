import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LoadingIndicator,
  Chat,
  Channel,
  Window,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  ChannelListMessengerProps,
  useChatContext,
} from "stream-chat-react";
import Button from "../components/Button";
import { useLoggedInAuth } from "../context/AuthContext";

function Home() {
  const { user, streamChat } = useLoggedInAuth();

  if (!streamChat) return <LoadingIndicator />;

  return (
    <Chat client={streamChat}>
      <ChannelList List={Channels} filters={{ members: { $in: [user?.id] } }} />
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

export default Home;

function Channels({ loadedChannels }: ChannelListMessengerProps) {
  const navigate = useNavigate();
  const { logout } = useLoggedInAuth();
  const { setActiveChannel, channel: activeChannel } = useChatContext();

  return (
    <div className="w-60 flex flex-col gap-4 m-3 h-full">
      <Button onClick={() => navigate("/channel/new")}>New Conversation</Button>
      <hr className="border-gray-500" />
      {loadedChannels != null && loadedChannels.length > 0
        ? loadedChannels.map((channel) => {
            const isActive = activeChannel === channel;
            const extraClasses = isActive
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100 bg-gray-100";

            return (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel)}
                disabled={isActive}
                className={`p-4 rounded-lg flex gap-3 items-center ${extraClasses}`}
              >
                {channel.data?.image && (
                  <img
                    src={channel.data?.image}
                    alt={channel.data?.name}
                    className="w-10 h-10 rounded-full object-center object-cover"
                  />
                )}
                <span className="truncate">
                  {channel.data?.name || channel.id}
                </span>
              </button>
            );
          })
        : "No Conversations"}
      <hr className="border-gray-500 mt-auto" />
      <Button onClick={() => logout.mutate()} disabled={logout.isLoading}>
        Logout
      </Button>
    </div>
  );
}
