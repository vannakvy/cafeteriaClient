import { useLazyQuery } from '@apollo/client'
import { Row, Form, Modal, Col, Select, Input, DatePicker, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { convertEditData, noticeAction } from '../../../functions/fn'
import { GET_ALL_SUPPLIER } from '../../../graphql/supplier'

export default function AddSupplierToPO({ open, setOpen, data, setData }) {
    let [form] = Form.useForm()
    const [getSuppliers, { data: SupplierDb }] = useLazyQuery(GET_ALL_SUPPLIER, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        getSuppliers({
            variables: {
                input: {
                    keyword: keyword
                }
            }
        })
    }, [keyword, getSuppliers])

    const onFinish = (values) => {
        let array = SupplierDb?.getSuppliers?.data.find(ele => ele.id === values.supplier)
        setData({
            ...values,
            companyName: array.companyName
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
        let array = SupplierDb?.getSuppliers?.data.find(ele => ele.id === val)

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
                name="addSupplierToSale"
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
                            label="ឈ្មោះក្រុមហ៊ុន"
                            name="supplier"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Supplier"
                                optionFilterProp="children"
                                onSearch={onSearch}
                                onSelect={onSelect}
                            >
                                {
                                    SupplierDb?.getSuppliers?.data.map(load =>
                                        <Select.Option key={load.id} value={load.id}>{load.companyName}</Select.Option>
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
