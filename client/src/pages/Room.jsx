import { useParams } from "react-router-dom";

function Room() {
  const { roomId } = useParams();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Room: {roomId}</h2>
      <p>Editor yahan aayega (Phase 4 mein)</p>
    </div>
  );
}

export default Room;
