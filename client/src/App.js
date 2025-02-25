import "./App.css";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ChatPage from "./pages/ChatPage/ChatPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import { ChatProvider } from "./context/ChatContext";
import ChatRoom from "./components/ChatRoom/ChatRoom";

function App() {
  return (
    <ChatProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<ChatPage />}>
              <Route path="/:chatRoomId" element={<ChatRoom />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ChatProvider>
  );
}

export default App;
