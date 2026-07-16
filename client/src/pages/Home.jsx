import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(false);
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

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>SynCode</h1>
      <p>Real-time collaborative code editor</p>
      <button onClick={handleCreateRoom} disabled={loading}>
        {loading ? "Creating..." : "Create Room"}
      </button>
    </div>
  );
}

export default Home;
