import React from 'react'
import { Image, Layout, Menu } from 'antd';
import { BarChartOutlined, CreditCardOutlined, FileSearchOutlined, PieChartOutlined, ShoppingCartOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Logo from '../asset/img/logo.png'
import { keyMenu } from '../functions/fn';
import { useLocation } from 'react-router-dom'

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function NavBar({ collapsed }) {
  const urlPath = useLocation().pathname

  return (
    <Sider theme="light" collapsed={collapsed}>
      <Link to="/">
        <div className="logo">
          <Image width={"100%"} src={Logo} preview={false} />
        </div>
      </Link>
      <Menu theme="light" selectedKeys={[keyMenu(urlPath)]} mode="inline">
        <Menu.Item key="/" icon={<BarChartOutlined />}>
          ទំព័រដើម
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="/product" icon={<ShoppingCartOutlined />}>
          ទំនិញ
          <Link to="/product" />
        </Menu.Item>
        <Menu.Item key="/saleorder" icon={<PieChartOutlined />}>
          ការលក់ចេញ
          <Link to="/saleorder" />
        </Menu.Item>
        <Menu.Item key="/purchaseorder" icon={<CreditCardOutlined />}>
          ការទិញចូល
          <Link to="/purchaseorder" />
        </Menu.Item>
        <Menu.Item key="/reconciliation" icon={<SyncOutlined />}>
          បង្កើតសារពើភ័ណ្ឌ
          <Link to="/reconciliation" />
        </Menu.Item>
        <Menu.Item key="/report" icon={<FileSearchOutlined />}>
          របាយការណ៍
          <Link to="/report" />
        </Menu.Item>
        <SubMenu key="sub2" icon={<UserOutlined />} title="រដ្ឋបាល">
          <Menu.Item key="/customer">
            អតិថិជន
            <Link to="/customer" />
          </Menu.Item>
          <Menu.Item key="/supplier">
            អ្នកផ្គត់ផ្គង់
            <Link to="/supplier" />
          </Menu.Item>
          <Menu.Item key="/deliver">
            អ្នកដឹកជញ្ជូន
            <Link to="/deliver" />
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}
