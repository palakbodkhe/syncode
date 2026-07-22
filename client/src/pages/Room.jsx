import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

function Room() {
  const { roomId } = useParams();
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to backend socket server
    socketRef.current = io("http://localhost:5000");

    // Join this specific room
    socketRef.current.emit("joinRoom", roomId);

    // Cleanup: disconnect when leaving the page
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Room: {roomId}</h2>
      <p>Editor yahan aayega (Phase 4 mein)</p>
    </div>
  );
}

export default Room;
