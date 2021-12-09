import './static/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import StyleProvider from './context/styleProvider';
import { Layout } from 'antd';
import { useContext, useState } from 'react';
import NavBar from './routes/navbar';
import Navheader from './routes/navheader';
import { DataController } from './context/dataProvider';
import { contentRouter } from './functions/routeFn';
import Error404 from './pages/404';
import Login from './pages/login';
import Loading from './components/login/loading';

const { Content } = Layout;

function App() {
  const { content, user, logined } = useContext(DataController)
  const [collapsed, setCollapsed] = useState(false)

  return (
    !logined ?
      user !== null ? <Router>
        <StyleProvider>

          <Layout style={{ minHeight: '100vh' }}>
            <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />

            <Layout className="site-layout">
              <Navheader collapsed={collapsed} setCollapsed={setCollapsed} />

              <Content style={{ margin: '16px' }}>
                <div className="site-layout-content">
                  <Switch>
                    {
                      content?.getContentById?.content?.map((load, index) => (
                        index === 0 ?
                          <Route exact path={load.path} key={load.path} >
                            {contentRouter(load.path)}
                          </Route>
                          : <Route path={load.path} key={load.path}>
                            {contentRouter(load.path)}
                          </Route>
                      ))
                    }
                    <Route>
                      <Error404 />
                    </Route>


                    {/* <Route path="/addsaleorder">
                    <AddSaleOrder />
                  </Route> */}

                    {/* <Route exact path="/">
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
                  <Route path="/viewsaleorder/:slug">
                    <ViewSaleOrder />
                  </Route>
                  <Route path="/purchaseorder">
                    <PurchaseOrder />
                  </Route>
                  <Route path="/addpurchaseorder">
                    <AddPurchaseOrder />
                  </Route>
                  <Route path="/viewpurchaseorder/:slug">
                    <ViewPurchaseOrder />
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
                  <Route path="/user">
                    <User />
                  </Route> */}
                  </Switch>

                </div>
              </Content>
              {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
          </Layout>




        </StyleProvider>
      </Router> : <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="*">
            <Login />
          </Route>
        </Switch>
      </Router>
      : <Loading />
  );
}

export default App;
