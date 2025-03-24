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
    role: "",
    image: "",
    phone: "",
    _id: ""
  })
  const [isAppLoading, setIsAppLoading] = useState(true)
  return (
    <AuthContext.Provider value={{
      user, setUser,
      isAppLoading, setIsAppLoading
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}