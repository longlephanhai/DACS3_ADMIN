import { useContext } from "react"
import { AuthContext } from "../../components/context/auth.context"

const Home = () => {
  const { user } = useContext(AuthContext)
  return (
    <>

    </>
  )
}
export default Home