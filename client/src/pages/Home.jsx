import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/room/create");
      const { roomId } = res.data;
      navigate(`/room/${roomId}`);
    } catch (err) {
      console.error("Error creating room:", err);
      alert("Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!joinRoomId.trim()) {
      alert("Please enter a room ID");
      return;
    }
    try {
      await axios.get(`http://localhost:5000/api/room/${joinRoomId}`);
      navigate(`/room/${joinRoomId}`);
    } catch (err) {
      console.error("Error joining room:", err);
      alert("Room not found");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>SynCode</h1>
      <p>Real-time collaborative code editor</p>

      <button onClick={handleCreateRoom} disabled={loading}>
        {loading ? "Creating..." : "Create Room"}
      </button>

      <div style={{ marginTop: "30px" }}>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={joinRoomId}
          onChange={(e) => setJoinRoomId(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
    </div>
  );
}

export default Home;
