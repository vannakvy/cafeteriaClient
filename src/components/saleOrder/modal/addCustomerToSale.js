import { useLazyQuery } from '@apollo/client'
import { Row, Form, Modal, Col, Select, Input, DatePicker, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { convertEditData, noticeAction } from '../../../functions/fn'
import { GET_ALL_CUSTOMER } from '../../../graphql/customer'

export default function AddCustomerToSale({ open, setOpen, data, setData }) {
    let [form] = Form.useForm()
    const [getCustomers, { data: CustomerDb }] = useLazyQuery(GET_ALL_CUSTOMER, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        getCustomers({
            variables: {
                input: {
                    keyword: keyword
                }
            }
        })
    }, [keyword, getCustomers])

    const onFinish = (values) => {
        let array = CustomerDb?.getCustomers?.data.find(ele => ele.id === values.customer)
        setData({
            ...values,
            lname: array.lname,
            fname: array.fname,
        })
        setOpen(false)
    }

    const onFinishFailed = (err) => {
        console.log(err)
    }

    function onSearch(val) {
        setKeyword(val)
    }

    function onSelect(val) {
        let array = CustomerDb?.getCustomers?.data.find(ele => ele.id === val)

        form.setFieldsValue({
            tel: array.tel
        })
    }

    return (
        <Modal
            title="បញ្ចូលព័ត៌មាន"
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                name="addCustomerToSale"
                layout="vertical"
                // hideRequiredMark
                fields={convertEditData(data ? data : [])}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row gutter={16}>
                    <Col
                        xs={24}
                        md={24}
                    >
                        <Form.Item
                            label="អតិថិជន"
                            name="customer"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Customer"
                                optionFilterProp="children"
                                onSearch={onSearch}
                                onSelect={onSelect}
                            >
                                {
                                    CustomerDb?.getCustomers?.data.map(load =>
                                        <Select.Option key={load.id} value={load.id}>{load.lname} {load.fname}</Select.Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={12}
                    >
                        <Form.Item
                            label="ទូរស័ព្ទ"
                            name="tel"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Input placeholder="Telephone" />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={12}
                    >
                        <Form.Item
                            label="កាលបរិច្ឆេទ"
                            name="date"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <DatePicker
                                style={{
                                    width: "100%"
                                }}
                                placeholder="Date"
                            />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={24}
                    >
                        <Form.Item
                            label="ចំណាំ"
                            name="remark"
                        >
                            <Input placeholder="Remark" />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={24}
                    >
                        <Form.Item>
                            <Button 
                                htmlType="submit"
                                type="primary"
                                style={{
                                    width: "100%"
                                }}
                            >
                                បញ្ចូល
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
