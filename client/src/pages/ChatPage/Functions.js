import {
  findFriends,
  getChatList,
  getChatRoom,
  getFriends,
} from "../../services/ChatServices";
export const handleSearch = async (
  searchTerm,
  setChatList,
  setLoading,
  setError
) => {
  setLoading(true);
  setError("");
  try {
    const data = await findFriends(searchTerm);

    if (data.users.length) {
      setChatList(data.users);
    } else {
      setChatList([]);
      setError("No Users Found");
    }
  } catch (err) {
    console.log("Failed to fetch results. Please try again.");
  } finally {
    setLoading(false);
  }
};

export const ChatList = async (userId, setLoading, setError, setChatList) => {
  setLoading(true);
  setError("");
  try {
    const data = await getChatList(userId);
    if (data.users.length) {
      setChatList(data.users);
    } else {
      setChatList([]);
      setError("No Chats");
    }
  } catch (err) {
    console.log("Failed to fetch results. Please try again.");
  } finally {
    setLoading(false);
  }
};
export const getFriendsList = async (
  userId,
  setUsers,
  setLoading,
  setError
) => {
  setLoading(true);
  setError("");
  try {
    const data = await getFriends(userId);
    if (data.friends.length) {
      setUsers(data.friends);
    } else {
      setUsers([]);
      setError("No Friends");
    }
  } catch (err) {
    console.log("Failed to fetch results. Please try again.");
  } finally {
    setLoading(false);
  }
};

export const handleChatRoom = async (userId, friendId, setError) => {
  setError("");
  try {
    const chatRoom = await getChatRoom(userId, friendId);

    if (chatRoom) {
      console.log("ChatRoom Found");
      return chatRoom;
    } else {
      setError("No ChatRoom Found");
      return null;
    }
  } catch (err) {
    console.log("Failed to fetch results. Please try again.");
  }
};
