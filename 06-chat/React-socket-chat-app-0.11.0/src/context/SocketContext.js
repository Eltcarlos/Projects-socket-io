import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { scrollToBottomAnimated } from "../helpers/scrollToBottom";
import { useSocket } from "../hooks/useSocket";
import { types } from "../types/types";
import { ChatContext } from "./chat/ChatContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket("http://localhost:8080");
  const { dispatch } = useContext(ChatContext);

  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (auth.logged) {
      conectarSocket();
    }
  }, [auth, conectarSocket]);

  useEffect(() => {
    if (!auth.logged) {
      desconectarSocket();
    }
  }, [auth, desconectarSocket]);

  useEffect(() => {
    if (auth.logged) {
      socket?.on("list-users", (users) => {
        dispatch({
          type: types.usuariosCargados,
          payload: users,
        });
      });
    }
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket?.on("mensaje-personal", (mensaje) => {
      dispatch({
        type: types.nuevoMensaje,
        payload: mensaje,
      });
      scrollToBottomAnimated("mensajes");
    });
  }, [socket, dispatch]);

  return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};
