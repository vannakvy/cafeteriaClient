import './static/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Dashboard from './pages/dashboard';
import StyleProvider from './context/styleProvider';
import { Layout } from 'antd';
import { useState } from 'react';
import NavBar from './routes/navbar';
import Navheader from './routes/navheader';
import Customer from './pages/customer';
import Product from './pages/product';
import SaleOrder from './pages/saleOrder';
import AddSaleOrder from './components/saleOrder/addSaleOrder';
import ViewSaleOrder from './components/saleOrder/viewSaleOrder';
import Reconciliation from './pages/reconciliation';
import Supplier from './pages/supplier';
import Deliver from './pages/deliver';
import AddPurchaseOrder from './components/purchaseOrder/addPurchaseOrder';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Router>
      <StyleProvider>

        <Layout style={{ minHeight: '100vh' }}>
          <NavBar collapsed={collapsed} />

          <Layout className="site-layout">
            <Navheader collapsed={collapsed} setCollapsed={setCollapsed} />

            <Content style={{ margin: '16px' }}>
              <div className="site-layout-content">
                <Switch>

                  <Route exact path="/">
                    <Dashboard />
                  </Route>
                  <Route path="/product">
                    <Product />
                  </Route>
                  <Route path="/saleorder">
                    <SaleOrder />
                  </Route>
                  <Route path="/addsaleorder">
                    <AddSaleOrder />
                  </Route>
                  <Route path="/addpurchaseorder">
                    <AddPurchaseOrder />
                  </Route>
                  <Route path="/viewsaleorder/:slug">
                    <ViewSaleOrder />
                  </Route>
                  <Route path="/reconciliation">
                    <Reconciliation />
                  </Route>
                  <Route path="/customer">
                    <Customer />
                  </Route>
                  <Route path="/supplier">
                    <Supplier />
                  </Route>
                  <Route path="/deliver">
                    <Deliver />
                  </Route>
                </Switch>

              </div>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
          </Layout>
        </Layout>




      </StyleProvider>
    </Router>
  );
}

export default App;
