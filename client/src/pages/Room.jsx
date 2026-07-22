import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";

function Room() {
  const { roomId } = useParams();
  const socketRef = useRef(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    socketRef.current.emit("joinRoom", roomId);

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Room: {roomId}</h2>
      <Editor
        height="80vh"
        defaultLanguage="javascript"
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
      />
    </div>
  );
}

export default Room;
