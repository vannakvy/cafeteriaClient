import React, { useContext, useEffect, useState } from 'react'
import { BellOutlined, PoweroffOutlined, SettingOutlined } from '@ant-design/icons';
import { Badge, Button, Col, Layout, Popconfirm, Popover, Row, List } from 'antd';
import { useSubscription } from '@apollo/client';
import { GET_NOTIFICATION } from '../graphql/notification';
import moment from 'moment';
import { auth } from '../api/config';
import { DataController } from '../context/dataProvider';
import { ACTION } from '../context/reducer';
import { useHistory } from 'react-router-dom';

const { Header } = Layout;
const content = ({ data, newNum, setNewNum }) => {
    return <div
        style={{
            maxHeight: 500,
            overflowX: "hidden",
            overflowY: "scroll"
        }}
    >
        <List
            style={{
                width: 300
            }}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item
                    style={{
                        backgroundColor: index++ < newNum && "#F4FCFF"
                    }}
                    onClick={() => setNewNum(0)}
                >
                    <List.Item.Meta
                        title={<span
                            style={{
                                color: item.action === "create" ? "green" : item.action === "update" ? "orange" : "red"
                            }}
                        >
                            {item.title}
                        </span>}
                        description={moment(new Date(parseInt(item?.createAt)), "YYYYMMDD").fromNow()}
                    />
                    {item.content}
                </List.Item>

            )}
        />
    </div>
}

export default function Navheader() {
    let history = useHistory()
    const { loginedDispatch, user } = useContext(DataController)

    const { data: NoticeDB } = useSubscription(GET_NOTIFICATION);

    const [newNum, setNewNum] = useState(0)
    const [data, setData] = useState([])

    useEffect(() => {
        if (NoticeDB) {
            setNewNum(e => e + 1)
            setData(e => [NoticeDB?.newNotice, ...e])
        }
    }, [NoticeDB])

    const onSignOutFn = () => {
        loginedDispatch({type: ACTION.ADD_PAYLOAD, payload: true})
        auth.signOut().then(() => history.push("/"))
    }

    return (
        <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row>
                <Col
                    xs={2}
                    style={{
                        paddingLeft: 20
                    }}
                >
                    <Popover
                        content={content({ data, newNum, setNewNum })}
                        trigger="click"
                        placement="rightTop"
                    >
                        <Badge
                            count={newNum}
                            size="small"
                        >
                            <BellOutlined
                                style={{
                                    cursor: "pointer"
                                }}
                            />
                        </Badge>
                    </Popover>
                </Col>
                <Col
                    xs={22}
                    style={{
                        textAlign: "right",
                        paddingRight: 40
                    }}
                >
                    <Button
                        type="link"
                    >
                        <SettingOutlined
                                style={{
                                    cursor: "pointer"
                                }}
                            />
                    </Button>
                    <Popconfirm
                        placement="leftTop"
                        title="តើអ្នកចង់ចាក់ចេញមែនទេ?"
                        okType="danger"
                        okText="ចង់"
                        cancelText="មិនចង់"
                        onConfirm={() => {
                            onSignOutFn()
                        }}
                    >
                        <Button
                            danger
                            shape="round"
                        >
                            {user.displayName} <PoweroffOutlined />
                        </Button>
                    </Popconfirm>
                </Col>
            </Row>

        </Header>
    )
}
