import React, { useEffect, useState } from "react";
import "./ChatPage.css";
import { chatPage } from "../../services/ChatServices";
import { useAuth } from "../../context/AuthContext";

function ChatPage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const data = await chatPage({ user_id: user.id });
          setUserData(data);
        } catch (error) {
          console.error("Error fetching chat data:", error);
        }
      };

      fetchData();
    }
  }, [user]);
  return <section>{JSON.stringify(userData)}</section>;
}

export default ChatPage;
