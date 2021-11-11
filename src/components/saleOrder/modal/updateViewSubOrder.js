import { useMutation } from '@apollo/client'
import { Descriptions, Divider, Modal, Form, Row, Col, InputNumber, Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { msgTitle } from '../../../asset/data/msgTitle'
import { convertEditData, mutationCallBackFn, noticeAction } from '../../../functions/fn'
import { UPDATE_SUB_SALEORDER, VIEW_SALEORDER_BY_ID } from '../../../graphql/saleOrder'

export default function UpdateViewSubOrder({ open, setOpen, selectData }) {
    const [updateSubSaleOrders] = useMutation(UPDATE_SUB_SALEORDER, mutationCallBackFn(VIEW_SALEORDER_BY_ID, 'getSaleOrderById'))

    const [data, setData] = useState({})

    useEffect(() => {
        setData(selectData)
    }, [selectData])

    const onFinish = (values) => {
        let newArray = {
            orderId: selectData.orderId,
            id: selectData.id,
            ...values,
            total: values.qty * values.price
        }

        updateSubSaleOrders({
            variables: {
                input: newArray
            },
            update(_,result){
                console.log(result)
                noticeAction("success", msgTitle.UPDATE)
            }
        })
        setOpen(false)
    }

    const onFinishFailed = (err) => {
        console.log(err)
    }

    return (
        <Modal
            title={"ព័ត៌មានលម្អិត"}
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Descriptions bordered>
                <Descriptions.Item label="បរិយាយ" span={3}>{data?.description}</Descriptions.Item>
                <Descriptions.Item label="អត្ថលេខ" span={3}>{data?.id}</Descriptions.Item>
                <Descriptions.Item label="តម្លៃ" span={3}>{data?.price}$ /{data?.um}</Descriptions.Item>
            </Descriptions>
            <Divider>ការកំណត់</Divider>
            <Form
                name="addCart"
                fields={convertEditData(data)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row gutter={16}>
                    <Col
                        xs={10}
                    >
                        <Form.Item
                            name="qty"
                            rules={[
                                {
                                    required: true,
                                    message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!',
                                    type: "number"
                                }
                            ]}
                        >
                            <InputNumber
                                style={{
                                    width: "100%"
                                }}
                                placeholder="ចំនួន"
                            />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={4}
                    >
                        <center>
                            X
                        </center>
                    </Col>
                    <Col
                        xs={10}
                    >
                        <Form.Item
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!',
                                    type: "number"
                                }
                            ]}
                        >
                            <InputNumber
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                style={{
                                    width: "100%"
                                }}
                                placeholder="តម្លៃឯកតា"
                            />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                    >
                        <Form.Item
                            name="remark"
                        >
                            <Input
                                placeholder="ចំណាំ"
                            />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                    >
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{
                                width: "100%"
                            }}
                        >
                            បញ្ចូល
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
