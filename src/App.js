import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import { useSelector } from "react-redux";
import { AppContext, socket } from "./context/appContext";

function App() {
  const user = useSelector((state) => state.user);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  return (
    <AppContext.Provider
      value={{
        rooms,
        setRooms,
        socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        newMessages,
        setNewMessages,
      }}
    >
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          {!user && (
            <>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </>
          )}
          <Route exact path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
