import { useMutation } from '@apollo/client'
import { Col, Drawer, Input, Row, Form, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { convertTel, convertUpdateData, mutationCallBackFn, noticeAction } from '../../../functions/fn'
import { ADD_SUPPLIER, GET_ALL_SUPPLIER, UPDATE_SUPPLIER } from '../../../graphql/supplier'

export default function AddUpdateSupplier({ open, setOpen, data, type }) {
    let [form] = Form.useForm()

    const [setCustomers] = useMutation(ADD_SUPPLIER, mutationCallBackFn(GET_ALL_SUPPLIER, 'getSuppliers'))

    const [updateCustomers] = useMutation(UPDATE_SUPPLIER, mutationCallBackFn(GET_ALL_SUPPLIER, 'getSuppliers'))

    const [updateData, setUpdateData] = useState({})

    useEffect(() => {
        setUpdateData(data)
    }, [data])

    const onFinish = (values) => {
        let array = {
            ...values,
            tel: convertTel(values.tel)
        }

        if (type === "add") {
            setCustomers({
                variables: {
                    input: array
                },
                update(_, result) {
                    // console.log(result)
                    noticeAction("success", "ការបញ្ចូលបានជោគជ័យ")

                    setOpen(false)
                    form.resetFields()
                },
            })
        } else {
            updateCustomers({
                variables: {
                    input: {
                        ...array,
                        id: data.id
                    }
                },
                update(_, result) {
                    // console.log(result)  
                    noticeAction("success", "ការកែប្រែបានជោគជ័យ")

                    setOpen(false)
                    form.resetFields()
                },
            })
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Drawer
            title="បញ្ចូលអ្នកផ្គត់ផ្គង់ថ្មី"
            width={500}
            onClose={() => setOpen(false)}
            visible={open}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <Form
                form={form}
                layout="vertical"
                hideRequiredMark
                fields={convertUpdateData(type, updateData)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row gutter={16}>
                    <Col xs={24} md={24}>
                        <Form.Item
                            name="companyName"
                            label="ឈ្មោះក្រុមហ៊ុន"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Input
                                placeholder="Company"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="lname"
                            label="គោត្តនាម"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Input
                                placeholder="Lastname"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="fname"
                            label="នាម"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Input
                                placeholder="Firstname"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="tel"
                            label="ទូរស័ព្ទ"
                        // rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Input
                                prefix="+855(0)"
                                placeholder="Telephone"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="email"
                            label="អ៊ីមែល"
                            rules={[{ message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!', type: "email" }]}
                        >
                            <Input
                                placeholder="Email"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24}>
                        <Form.Item
                            name="address"
                            label="អាស័យដ្ឋាន"
                        // rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Input
                                placeholder="Address"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24}>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                type="primary"
                                style={{
                                    width: "100%"
                                }}
                            >
                                បញ្ជូល
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}
