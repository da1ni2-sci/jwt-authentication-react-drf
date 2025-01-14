import { useState } from "react";
import tw from "tailwind-styled-components";

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

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { register_user } = useAuth();

  function handleRegister() {
    register_user(username, email, password, password2);
  }

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
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <StyledInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </StyledBlock>

      <StyledBlock>
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <StyledInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </StyledBlock>

      <StyledBlock>
        <StyledLabel htmlFor="password2">Comfirm Password</StyledLabel>
        <StyledInput
          id="password2"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </StyledBlock>

      <StyledButton onClick={handleRegister}>Register</StyledButton>
    </div>
  );
}

export default Register;
