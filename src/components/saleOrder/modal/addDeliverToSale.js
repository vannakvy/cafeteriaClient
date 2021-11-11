import React, { useEffect, useState } from 'react'
import { Button, Col, Select, Form, Modal, Row, Input } from 'antd'
import { convertEditData, noticeAction } from '../../../functions/fn'
import { useLazyQuery } from '@apollo/client'
import { GET_ALL_DELIVER } from '../../../graphql/deliver'

export default function AddDeliverToSale({ open, setOpen, data, setData}) {
    let [form] = Form.useForm()
    const [getDelivers, { data: DeliverDb }] = useLazyQuery(GET_ALL_DELIVER, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        getDelivers({
            variables: {
                input: {
                    limit: 10,
                    keyword: keyword
                }
            }
        })
    }, [keyword, getDelivers])

    const onFinish = (values) => {
        let array = DeliverDb?.getDelivers?.data.find(ele => ele.id === values.deliver)
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
        let array = DeliverDb?.getDelivers?.data.find(ele => ele.id === val)

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
                            label="អ្នកដឹកជញ្ជូន"
                            name="deliver"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Deliver"
                                optionFilterProp="children"
                                onSearch={onSearch}
                                onSelect={onSelect}
                            >
                                {
                                    DeliverDb?.getDelivers?.data.map(load =>
                                        <Select.Option key={load.id} value={load.id}>{load.lname} {load.fname}</Select.Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={24}
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
