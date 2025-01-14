import { useState } from "react";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const StyledLabel = tw.label`
  text-3xl
`;
const StyledInput = tw.input`
  text-3xl
  text-center
  border-4
  border-blue-500
`;

const StyledButton = tw.button`
  text-3xl
  bg-stone-400
  text-white
  px-5
  py-3
  rounded-full
`;

const StyledBlock = tw.div`
  flex 
  flex-col 
  items-center
  gap-3
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login_user } = useAuth();

  const nav = useNavigate();

  const handleLogin = async () => {
    const success = await login_user(username, password);
    if (success) {
      nav("/menu");
    }
  };

  const handleNav = () => {
    nav("/register");
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <StyledBlock>
        <StyledLabel htmlFor="username">Username</StyledLabel>
        <StyledInput
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </StyledBlock>

      <StyledBlock>
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <StyledInput
          id="username"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </StyledBlock>

      <StyledButton onClick={handleLogin}>Login</StyledButton>

      <p
        onClick={handleNav}
        className="cursor-pointer text-red-500 hover:text-red-800"
      >
        Can&apos;t log in? You can register account here
      </p>
    </div>
  );
}

export default Login;
