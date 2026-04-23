import { useRef } from "react";
import style from "./Join.module.css";
import { Input, Button } from "@mui/material";
import io from "socket.io-client";

const Join = () => {
  const usernameRef = useRef();

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return;

    const socket = io("http://localhost:3001");
    socket.emit("set_username", username);
  };
 const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  return (
    <div>
      <h2>bem-vindo ao DevChat</h2>
      <Input inputRef={usernameRef} placeholder="Nome de usuário" />
      <Button
        sx={{ mt: 2, mb: 2 }}
        variant="container"
        onClick={() => handleSubmit()}
      >
        Enter
      </Button>
    </div>
  );
};

export default Join;
