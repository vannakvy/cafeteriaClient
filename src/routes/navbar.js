import React, { useContext } from 'react'
import { Image, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../asset/img/logo.png'
import { combineMenu, iconMenu, keyMenu } from '../functions/routeFn'
import { DataController } from '../context/dataProvider';
import { theme } from '../static/theme';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function NavBar({ collapsed, setCollapsed }) {
  const { content, urlPath } = useContext(DataController)

  // const urlPath = useLocation().pathname

  return (
    <Sider theme="light" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}  width={260}>
      <Link to="/">
        <div className="logo">
          <Image width={"100%"} src={Logo} preview={false} />
        </div>
      </Link>
      <Menu theme="light" selectedKeys={[keyMenu(urlPath)]} mode="inline">
        {
          combineMenu(content?.getContentById?.content).map(load =>
            load.subContent.length === 0 ? (
              <Menu.Item
                key={load.path}
                icon={iconMenu(load.path)}
                style={{
                  fontSize: theme.MenuFontSize
                }}
              >
                {load.title}
                <Link to={load.path} />
              </Menu.Item>
            ) : (
              <SubMenu
                key={load.path}
                icon={iconMenu(load.path)}
                title={load.title}
                style={{
                  fontSize: theme.MenuFontSize
                }}
              >
                {
                  load.subContent.map(load => (
                    <Menu.Item
                      key={load.path}

                      style={{
                        fontSize: theme.MenuFontSize
                      }}
                    >
                      {load.title}
                      <Link to={load.path} />
                    </Menu.Item>
                  )
                  )
                }
              </SubMenu>
            )
          )
        }
        {/* <Menu.Item key="/" icon={<BarChartOutlined />}>
          ????????????????????????
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="/product" icon={<ShoppingCartOutlined />}>
          ???????????????
          <Link to="/product" />
        </Menu.Item>
        <Menu.Item key="/saleorder" icon={<PieChartOutlined />}>
          ???????????????????????????
          <Link to="/saleorder" />
        </Menu.Item>
        <Menu.Item key="/purchaseorder" icon={<CreditCardOutlined />}>
          ???????????????????????????
          <Link to="/purchaseorder" />
        </Menu.Item>
        <Menu.Item key="/reconciliation" icon={<SyncOutlined />}>
          ????????????????????????????????????????????????
          <Link to="/reconciliation" />
        </Menu.Item>
        <Menu.Item key="/report" icon={<FileSearchOutlined />}>
          ???????????????????????????
          <Link to="/report" />
        </Menu.Item>
        <SubMenu key="sub2" icon={<UserOutlined />} title="?????????????????????">
          <Menu.Item key="/customer">
            ?????????????????????
            <Link to="/customer" />
          </Menu.Item>
          <Menu.Item key="/supplier">
            ??????????????????????????????????????????
            <Link to="/supplier" />
          </Menu.Item>
          <Menu.Item key="/deliver">
            ???????????????????????????????????????
            <Link to="/deliver" />
          </Menu.Item>
          <Menu.Item key="/user">
            ??????????????????????????????????????????
            <Link to="/user" />
          </Menu.Item>
        </SubMenu> */}
      </Menu>
    </Sider>
  )
}
