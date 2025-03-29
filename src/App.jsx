import {
  ProductOutlined,
  UserAddOutlined,

} from '@ant-design/icons';
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { getProfileAPI } from './services/auth.service';
import { AuthContext } from './components/context/auth.context';
const { Header, Content, Footer, Sider } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { user, setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext)
  useEffect(() => {
    fetchUserInfo()
  }, [])
  const fetchUserInfo = async () => {
    const res = await getProfileAPI()
    if (res?.data) {
      setUser(res.data)
    }
    setIsAppLoading(false)
  }
  const items = [
    {
      key: '1',
      icon: <UserAddOutlined />,
      label: 'User',
      onClick: () => {
        navigate('/')
      }
    },
    {
      key: '2',
      icon: <ProductOutlined />,
      label: 'Product',
      onClick: () => {
        navigate('/product')
      }
    },
  ]
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Avatar
          size={{
            xs: 24,
            sm: 32,
            md: 40,
            lg: 64,
            xl: 80,
            xxl: 100,
          }}
          icon={user.image ? <img src={import.meta.env.VITE_BACK_URL + "/images/default/" + user?.image} /> : <AntDesignOutlined />}
        />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >

          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {
              isAppLoading === true ? 'Loading...' : <Outlet />
            }
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default App
