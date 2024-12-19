import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  if (isMessagesLoading) return <div>loading....</div>;

  return (
    <div className="flex-1 flex flex-col ovefrflow-auto">
      <ChatHeader />
      <p>messasges...</p>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
