import { signInWithEmailAndPassword } from '@firebase/auth';
import { Image, Form, Row, Col, Input, Button, Typography } from 'antd'
import React, { useContext } from 'react'
import { auth } from '../api/config';
import { msgTitle } from '../asset/data/msgTitle';
import Logo from '../asset/img/logo.png'
import { DataController } from '../context/dataProvider';
import { ACTION } from '../context/reducer';
import { noticeAction } from '../functions/fn';

export default function Login() {
    const { loginedDispatch } = useContext(DataController)
    let [form] = Form.useForm()

    const onFinish = async (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;

                noticeAction("success", msgTitle.CREATE)
                loginedDispatch({type: ACTION.ADD_PAYLOAD, payload: true})

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode, errorMessage)
                
                noticeAction("success", errorMessage)
                
                // noticeAction("success", msgTitle.CREATE)
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                position: "relative"
            }}
        >
            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    backgroundImage: "linear-gradient(to top right, #0b82c3, #3f4195)",
                    opacity: .8
                }}
            />
            <div
                style={{
                    position: "absolute",
                    width: "400px",
                    backgroundColor: "white",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: 10,
                    boxShadow: "1px 1px 10px #050505"
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        padding: "10px 10px 5px 10px",
                        backgroundColor: "white",
                        top: "0px",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: 100,
                        boxShadow: "1px 1px 5px #b2b2b2"
                    }}
                >
                    <Image
                        src={Logo}
                        width="100px"
                        preview={false}
                    />
                </div>
                <div
                    style={{
                        padding: "80px 30px 30px 30px"
                    }}
                >
                    <Form
                        form={form}
                        name="loginForm"
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Row gutter="16">
                            <Col
                                xs={24}
                            >
                                <Form.Item
                                    label="អ៊ីមែល"
                                    name="email"
                                    rules={[{
                                        required: true,
                                        message: 'សូមបញ្ចូលទិន្នន័យអោយបានត្រឹមត្រូវ!',
                                        type: "email"
                                    }]}
                                >
                                    <Input placeholder="Email Address" type="email" size="large" />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={24}
                            >
                                <Form.Item
                                    label="ពាក្យសម្ងាត់"
                                    name="password"
                                    rules={[{
                                        required: true,
                                        message: 'សូមបញ្ចូលទិន្នន័យអោយបានត្រឹមត្រូវ!'
                                    }]}
                                >
                                    <Input.Password placeholder="Password" size="large" />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={24}
                            >
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        style={{
                                            width: "100%"
                                        }}
                                        size="large"
                                        type="primary"
                                    >
                                        ចូលគណនី
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>

                    <div
                        style={{
                            textAlign: "center",
                            paddingTop: 20
                        }}
                    >
                        <Button
                            type="link"
                            size="small"
                        >
                            <Typography.Text>
                                Term Condition
                            </Typography.Text>
                        </Button>
                        |
                        <Button
                            type="link"
                            size="small"
                        >
                            <Typography.Text>
                                Privacy Policy
                            </Typography.Text>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
