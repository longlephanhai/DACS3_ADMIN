import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Link } from "react-router"
import { Button, Result } from "antd"

const PrivateRoute = (props) => {
  const { user } = useContext(AuthContext)
  if (user && user._id) {
    return (
      <>
        {props.children}
      </>
    )
  }
  return (
    <Result
      status="403"
      title="Unauthorize"
      subTitle="Bạn không có quyền để truy cập nguồn tài nguyên"
      extra={<Button type="primary">
        <Link to={'/auth/login'}>
          <span>Trở lại trang đăng nhập</span>
        </Link>
      </Button>}
    />
  )
}
export default PrivateRoute