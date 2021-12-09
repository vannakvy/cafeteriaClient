import { useQuery } from '@apollo/client';
import { Col, Row, List, Typography, Divider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';
import ExpIncValue from '../components/dashboard/chart/expIncValue'
import ExpIncValueDay from '../components/dashboard/chart/expIncValueDay';
import OrderCompare from '../components/dashboard/chart/orderCompare';
import OrderDetailCompare from '../components/dashboard/chart/orderDetailCompare';
import { TopTitle } from '../components/dashboard/textBox/topTitle';
import { noticeAction } from '../functions/fn';
import { GET_ALL_DASHBOARD } from '../graphql/dashboard';
import { theme } from '../static/theme';

export default function Dashboard() {
  const { data: DashboardDb } = useQuery(GET_ALL_DASHBOARD, {
    onError: (err) => {
      noticeAction("error", err?.graphQLErrors[0]?.message + '')
    },
  })

  let dataDb = DashboardDb?.getDashboard

  // console.log(dataDb)

  return (
    <Row gutter={[50, 50]}>
      <Col
        xs={24}
        md={17}
      >
        <Col
          xs={24}
        >
          <Divider
            orientation="left"
          >
            <Typography.Title
              className="go-DashboardBox"
            >
              ទិន្នន័យជារួម
            </Typography.Title>
          </Divider>
        </Col>
        <Row
          gutter={[30, 30]}
        >

          <Col
            xs={24}
            md={8}
          >
            <TopTitle
              href="/customer"
              header="អតិថិជនសរុប"
              newBody={`${dataDb?.top?.newCustomer} នាក់`}
              body={`${dataDb?.top?.customer} នាក់`}
              type="customer"
            />
          </Col>
          <Col
            xs={24}
            md={8}
          >
            <TopTitle
              href="/deliver"
              header="អ្នកដឹកជញ្ជូនសរុប"
              newBody={`${dataDb?.top?.newDeliver} នាក់`}
              body={`${dataDb?.top?.deliver} នាក់`}
              type="delivery"
            />
          </Col>
          <Col
            xs={24}
            md={8}
          >
            <TopTitle
              href="/supplier"
              header="អ្នកផ្គត់ផ្គង់សរុប"
              newBody={`${dataDb?.top?.newSupplier} នាក់`}
              body={`${dataDb?.top?.supplier} នាក់`}
              type="supplier"
            />
          </Col>
          <Col
            xs={24}
            md={24}
          >
            <ExpIncValue dataDb={dataDb?.dataYearRecord} />
          </Col>
          <Col
            xs={24}
            md={24}
          >
            <ExpIncValueDay dataDb1={dataDb?.topInc} dataDb2={dataDb?.topExp} />
          </Col>
        </Row>
      </Col>
      <Col
        md={7}
      >
        <Row gutter={[10, 10]}>
          <Col
            xs={24}
            md={12}
          >
            <div
              style={{
                backgroundColor: theme.greenColor,
              }}
              className="go-dashboardBtn"
            >
              <Typography.Title
                className="go-DashboardBox"
                style={{
                  color: "#ffff",
                }}
              >
                បង្កើតការលក់
              </Typography.Title>
            </div>
          </Col>
          <Col
            xs={24}
            md={12}
          >
            <Link
              to="addpurchaseorder"
            >
              <div
                style={{
                  backgroundColor: theme.pinkColor,
                }}
                className="go-dashboardBtn"
              >
                <Typography.Title
                  className="go-DashboardBox"
                  style={{
                    color: "#ffff",
                  }}
                >
                  បង្កើតការទិញ
                </Typography.Title>
              </div>
            </Link>
          </Col>
          <Col
            xs={24}
          >
            <div
              style={{
                borderRadius: 20,
                boxShadow: "1px 1px 5px #e5e5e5",
                height: "100%",
                padding: 20
              }}
            >
              <OrderCompare dataDb1={dataDb?.total?.income} dataDb2={dataDb?.total?.expense} />
              <div
                style={{
                  padding: 10
                }}
              >
                <Typography.Title
                  className="go-PieTitle"
                  style={{
                    color: theme.blackColor
                  }}
                  underline
                >
                  ទិន្នន័យចំណូលចំណាយ
                </Typography.Title>
                <List>
                  <List.Item>
                    <List.Item.Meta
                      title={<span><Typography.Title
                        // level={5}
                        style={{
                          color: theme.blackColor,
                          lineHeight: 1
                        }}
                      >
                        ទិន្នន័យចំណូល៖
                      </Typography.Title></span>}
                    />
                    <Typography.Title
                      level={5}
                      style={{
                        color: theme.greenColor,
                        lineHeight: 1
                      }}
                    >
                      {parseFloat(dataDb?.total?.income).toFixed(2)}$
                    </Typography.Title>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={<span><Typography.Title
                        level={5}
                        style={{
                          color: theme.blackColor,
                          lineHeight: 1
                        }}
                      >
                        ទិន្នន័យចំណាយ៖
                      </Typography.Title></span>}
                    />
                    <Typography.Title
                      level={5}
                      style={{
                        color: theme.pinkColor,
                        lineHeight: 1
                      }}
                    >
                      {parseFloat(dataDb?.total?.expense).toFixed(2)}$
                    </Typography.Title>
                  </List.Item>
                </List>
              </div>
            </div>
          </Col>

          <Col
            xs={24}
            md={12}
          >
            <div
              style={{
                borderRadius: 20,
                boxShadow: "1px 1px 5px #e5e5e5",
                height: "100%",
                padding: 20
              }}
            >
              <OrderDetailCompare dataDb1={dataDb?.expData?.paid} dataDb2={dataDb?.expData?.nonPaid} />
              <div
                style={{
                  padding: 10
                }}
              >
                <Typography.Title
                  className="go-DashboardBox2"
                  style={{
                    color: theme.blackColor
                  }}
                  underline
                >
                  ទិន្នន័យចំណូល
                </Typography.Title>
                <List>
                  <List.Item>
                    <List.Item.Meta
                      title={<span><Typography.Title
                        className="go-DashboardBox2"
                        style={{
                          color: theme.blackColor,
                          lineHeight: 1
                        }}
                      >
                        ប្រាក់ទូទាត់រួច៖
                      </Typography.Title></span>}
                    />
                    <Typography.Title
                      className="go-DashboardBox2"
                      style={{
                        color: theme.greenColor,
                        lineHeight: 1
                      }}
                    >
                      {parseFloat(dataDb?.expData?.paid).toFixed(2)}$
                    </Typography.Title>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={<span><Typography.Title
                        className="go-DashboardBox2"
                        style={{
                          color: theme.blackColor,
                          lineHeight: 1
                        }}
                      >
                        ប្រាក់មិនទាន់ទូទាត់៖
                      </Typography.Title></span>}
                    />
                    <Typography.Title
                      className="go-DashboardBox2"
                      style={{
                        color: theme.pinkColor,
                        lineHeight: 1
                      }}
                    >
                      {parseFloat(dataDb?.expData?.nonPaid).toFixed(2)}$
                    </Typography.Title>
                  </List.Item>
                </List>
              </div>
            </div>
          </Col>

          <Col
            xs={24}
            md={12}
          >
            <div
              style={{
                borderRadius: 20,
                boxShadow: "1px 1px 5px #e5e5e5",
                height: "100%",
                padding: 20
              }}
            >
              <OrderDetailCompare dataDb1={dataDb?.incData?.paid} dataDb2={dataDb?.incData?.nonPaid} />
              <div
                style={{
                  padding: 10
                }}
              >
                <Typography.Title
                  className="go-DashboardBox2"
                  style={{
                    color: theme.blackColor
                  }}
                  underline
                >
                  ទិន្នន័យចំណាយ
                </Typography.Title>
                <List>
                  <List.Item>
                    <List.Item.Meta
                      title={<span><Typography.Title
                        className="go-DashboardBox2"
                        style={{
                          color: theme.blackColor,
                          lineHeight: 1
                        }}
                      >
                        ប្រាក់ទូទាត់រួច៖
                      </Typography.Title></span>}
                    />
                    <Typography.Title
                      className="go-DashboardBox2"
                      style={{
                        color: theme.greenColor,
                        lineHeight: 1
                      }}
                    >
                      {parseFloat(dataDb?.incData?.paid).toFixed(2)}$
                    </Typography.Title>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={<span><Typography.Title
                        className="go-DashboardBox2"
                        style={{
                          color: theme.blackColor,
                          lineHeight: 1
                        }}
                      >
                        ប្រាក់មិនទាន់ទូទាត់៖
                      </Typography.Title></span>}
                    />
                    <Typography.Title
                      className="go-DashboardBox2"
                      style={{
                        color: theme.pinkColor,
                        lineHeight: 1
                      }}
                    >
                      {parseFloat(dataDb?.incData?.nonPaid).toFixed(2)}$
                    </Typography.Title>
                  </List.Item>
                </List>
              </div>
            </div>
          </Col>
        </Row>

      </Col>
    </Row>
  )
}
