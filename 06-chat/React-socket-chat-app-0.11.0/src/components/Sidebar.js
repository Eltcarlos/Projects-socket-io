import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SidebarChatItem } from "./SidebarChatItem";

export const Sidebar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  const { usuarios } = chatState;

  return (
    <div className="inbox_chat">
      {usuarios
        .filter((user) => user.uid !== auth.uid)
        .map((chat) => (
          <SidebarChatItem key={chat.uid} usuario={chat} />
        ))}

      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>
    </div>
  );
};
