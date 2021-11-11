import { useLazyQuery, useMutation } from '@apollo/client'
import { Row, Form, Modal, Col, Select, Input, DatePicker, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { msgTitle } from '../../../asset/data/msgTitle'
import { convertEditData, mutationCallBackFn, noticeAction } from '../../../functions/fn'
import { GET_ALL_CUSTOMER } from '../../../graphql/customer'
import { UPDATE_SALEORDER, VIEW_SALEORDER_BY_ID } from '../../../graphql/saleOrder'

export default function UpdateCustomer({ open, setOpen, data }) {
    let [form] = Form.useForm()

    const [getCustomers, { data: CustomerDb }] = useLazyQuery(GET_ALL_CUSTOMER, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const [updateSaleOrders] = useMutation(UPDATE_SALEORDER, mutationCallBackFn(VIEW_SALEORDER_BY_ID, 'getSaleOrderById'))

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
        // console.log(data)
        let date = values.date
        delete values.date
        let newArray = {
            id: data?.orderId,
            customer: {
                ...values,
                geolocation: {
                    lat: data?.geolocation?.lat,
                    long: data?.geolocation?.long
                }
            },
            date: date
        }

        updateSaleOrders({
            variables:{
                input: newArray
            },
            update(_, result){
                noticeAction("success", msgTitle.UPDATE)
            }
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
                            name="id"
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
