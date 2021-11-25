import { useMutation } from '@apollo/client'
import { Modal, Form, Row, Col, Input, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { convertUpdateData, mutationCallBackFn, noticeAction } from '../../../functions/fn'
import { ADD_USER, GET_ALL_USER, UPDATE_USER } from '../../../graphql/user'

export default function AddUpdateUser({ open, setOpen, data, type }) {
    let [form] = Form.useForm()

    const [addUser] = useMutation(ADD_USER, mutationCallBackFn(GET_ALL_USER, 'getUsers'))
    
    const [updateUser] = useMutation(UPDATE_USER, mutationCallBackFn(GET_ALL_USER, 'getUsers'))
    // console.log(ContentDb)const [updateCustomers] = useMutation(UPDATE_SUPPLIER, mutationCallBackFn(GET_ALL_SUPPLIER, 'getSuppliers'))

    const [updateData, setUpdateData] = useState({})

    useEffect(() => {
        setUpdateData(data)
        console.log(data)
    }, [data])

    const onFinish = async (values) => {
        if (type === "add") {
            addUser({
                variables: {
                    input: {
                        ...values,
                        contentRole: []
                    }
                },
                update(_, result) {
                    noticeAction("success", "ការបញ្ចូលបានជោគជ័យ")
                }
            })
        } else {
            updateUser({
                variables: {
                    input: {
                        ...values,
                        id: data?.id,
                        uid: data?.uid
                    }
                },
                update(_, result) {
                    noticeAction("success", "ការបញ្ចូលបានជោគជ័យ")
                }
            })
        }
        
        setOpen(false)
        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="បញ្ចូលអ្នកប្រើប្រាស់ថ្មី"
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                name="addUser"
                form={form}
                fields={convertUpdateData(type, updateData)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
            >
                <Row
                    gutter={16}
                >
                    <Col
                        xs={24}
                        md={24}
                    >
                        <Form.Item
                            label="ឈ្មោះ"
                            name="displayName"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Input placeholder="DisplayName" />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={12}
                    >
                        <Form.Item
                            label="អ៊ីមែល"
                            name="email"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!', type: "email" }]}
                        >
                            <Input placeholder="Email" type="email" />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={12}
                    >
                        <Form.Item
                            label="លេខសម្ងាត់"
                            name="password"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!', min: 6 }]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={24}
                    >
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    width: "100%"
                                }}
                            >
                                បង្កើត
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
