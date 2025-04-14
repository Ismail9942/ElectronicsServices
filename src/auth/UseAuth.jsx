import React, { useContext } from "react";
import { AuthContext } from "./AtuhProvider";

const UseAuth = () => {
  const Auth = useContext(AuthContext);
  return Auth;
};

export default UseAuth;
