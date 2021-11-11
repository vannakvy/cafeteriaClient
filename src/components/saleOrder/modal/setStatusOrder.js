import { useMutation } from '@apollo/client'
import { Modal, Form, Row, Col, Input, Checkbox, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { msgTitle } from '../../../asset/data/msgTitle'
import { convertUpdateData, mutationCallBackFn, noticeAction } from '../../../functions/fn'
import { GET_ALL_SALEORDER, UPDATE_ORDER_STATUS } from '../../../graphql/saleOrder'

export default function SetStatusOrder({ open, setOpen, updateData }) {
    const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS, mutationCallBackFn(GET_ALL_SALEORDER, 'getSaleOrders'))

    const [data, setData] = useState({})

    useEffect(() => {
        if(updateData){
            setData(updateData.status)
            // console.log(updateData.status)
        }
    }, [updateData])

    const onFinish = (values) => {
        console.log(values)
        updateOrderStatus({
            variables:{
                input:{
                    ...values,
                    id: updateData?.id
                }
            },
            update(_, result){
                // console.log(result)
                noticeAction("success", msgTitle.UPDATE)
                setOpen(false)
            }
        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <Modal
            title="ស្ថានភាព"
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                name="setStatus"
                fields={convertUpdateData("update", data !== undefined && data)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row
                    gutter={16}
                >
                    <Col
                        xs={24}
                        md={24}
                    >
                        <Form.Item
                            name="deliveryTime"
                        >
                            <Input placeholder="Delivery Time" />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={8}
                    >
                        <Form.Item
                            name="isPrepared"
                            valuePropName={"checked"}
                        >
                            <Checkbox>isPrepared</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={8}
                    >
                        <Form.Item
                            name="isCooked"
                            valuePropName={"checked"}
                        >
                            <Checkbox>isCooked</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={8}
                    >
                        <Form.Item
                            name="isDelivered"
                            valuePropName={"checked"}
                        >
                            <Checkbox>isDelivered</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={8}
                    >
                        <Form.Item
                            name="isPaid"
                            valuePropName={"checked"}
                        >
                            <Checkbox>isPaid</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={8}
                    >
                        <Form.Item
                            name="isCanceled"
                            valuePropName={"checked"}
                        >
                            <Checkbox>isCanceled</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={24}
                    >
                        <Form.Item>
                            <Button
                                type="primary"
                                style={{
                                    width: "100%"
                                }}
                                htmlType="submit"
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
