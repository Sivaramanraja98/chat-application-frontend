import React from "react";
import { io } from "socket.io-client";
const SOCKET_URL = `https://chat-app-backend-6l4d.onrender.com`;

export const socket = io(SOCKET_URL);
//app context
export const AppContext = React.createContext();
