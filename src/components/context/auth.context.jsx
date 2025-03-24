import { createContext, useState } from "react";

export const AuthContext = createContext({
  email: "",
  name: "",
  role: "",
  image: "",
  phone: "",
  _id: ""
})

export const AuthWrapper = (props) => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    // role: "",
    // image: "",
    // phone: "",
    _id: ""
  })
  return (
    <AuthContext.Provider value={{
      user, setUser
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}