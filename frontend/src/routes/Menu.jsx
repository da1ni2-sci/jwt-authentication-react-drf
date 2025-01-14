import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";

import { get_notes, logout } from "../endpoint/api";

const StyledButton = tw.button`
  text-2xl
  bg-red-400
  text-white
  px-5
  py-3
  rounded-full
`;

function Menu() {
  const [notes, setNotes] = useState([]);
  const nav = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      nav("/login");
    }
  };

  useEffect(() => {
    const fetchNote = async () => {
      const res = await get_notes();
      setNotes(res);
    };
    fetchNote();
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-semibold">Welcome back user</h1>
      <div>
        {notes.map((note) => {
          return <div key={note.id}>{note.description}</div>;
        })}
      </div>
      <StyledButton onClick={handleLogout}>Logout</StyledButton>
    </div>
  );
}

export default Menu;
