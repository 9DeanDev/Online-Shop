import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const navH = [
  {
    key: '/',
    label: 'Home'
  },
  {
    key: '/about',
    label: 'About'
  },
]

const navV = [
  {
    key: '/products',
    label: 'Products'
  },
  {
    key: '/categories',
    label: 'Categories'
  },
  {
    key: '/suppliers',
    label: 'Suppliers'
  },
  {
    key: '/employees',
    label: 'Employees'
  },
  {
    key: '/customers',
    label: 'Customers'
  },
  {
    key: '/orders',
    label: 'Orders'
  },
]

type Props = {}

export default function Root({ }: Props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation()

  const navigate = useNavigate()
  
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]} items={navH}
          onSelect={(item) => {
            navigate(item.key)
          }} />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[location.pathname.replace('/online-shop', '')]}
              defaultOpenKeys={['/']}
              style={{ height: '100%' }}
              items={navV}
              onSelect={(item) => {
                navigate('/online-shop' + item.key)
              }}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  )
}