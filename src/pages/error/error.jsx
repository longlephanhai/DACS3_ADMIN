import { Button, Result } from 'antd';
import { Link } from 'react-router';
const ErrorPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
      extra={<Button type="primary">
        <Link to={'/'}>Trở lại trang chủ</Link>
      </Button>}
    />
  )
}
export default ErrorPage