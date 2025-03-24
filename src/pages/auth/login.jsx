import { Button, Form, Input, message, notification } from 'antd';
import { loginAPI } from '../../services/auth.service';
import { useContext } from 'react';
import { AuthContext } from '../../components/context/auth.context';
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
  const [form] = Form.useForm()
  const { setUser } = useContext(AuthContext)

  const navigate = useNavigate()
  const onFinish = async (values) => {
    const res = await loginAPI(values.email, values.password)
    if (res.data) {
      message.success(res.message)
      localStorage.setItem("access_token", res.data.access_token)
      setUser(res.data.user)
      navigate('/')
    } else {
      notification.error({
        message: "Đăng nhập thất bại",
        description: res.message
      })
    }
  };
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập email của bạn!',
            validator: (_, value) => {
              if (!value || value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                return Promise.resolve();
              }
              return Promise.reject('Email không hợp lệ!');
            },
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu của bạn!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  )
}
export default LoginPage