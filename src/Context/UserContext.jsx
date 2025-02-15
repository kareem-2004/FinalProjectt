import { useState } from "react";
import { createContext } from "react";

export let UserContext = createContext();
export default function UserContextProvider(props) {
  const [userLogin, setuserLogin] = useState(
    localStorage.getItem("userLogin") ? localStorage.getItem("userLogin") : null
  );

  return (
    <UserContext.Provider value={{ userLogin, setuserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
