import { useMutation } from '@apollo/client';
import { Col, Image, Modal, Row, Form, InputNumber, Button, Input } from 'antd'
import React, { useState } from 'react'
import { msgTitle } from '../../../asset/data/msgTitle';
import pin from '../../../asset/img/pinRed.png'
import { convertEditData, mutationCallBackFn, noticeAction } from '../../../functions/fn';
import { UPDATE_SALEORDER, VIEW_SALEORDER_BY_ID } from '../../../graphql/saleOrder';
import MapAddOrder from '../comp/mapAddOrder';

export default function UpdateLocation({ open, setOpen, data }) {
    let [form] = Form.useForm()

    const [updateSaleOrders] = useMutation(UPDATE_SALEORDER, mutationCallBackFn(VIEW_SALEORDER_BY_ID, 'getSaleOrderById'))

    const [centerLocation, setCenterLocation] = useState({
        lat: data ? 13.363175493211273 : data?.lat,
        long: data ? 103.85653437154804 : data?.long
    })

    const onFinish = (values) => {
        updateSaleOrders({
            variables:{
                input: {
                    id: data?.orderId,
                    customer: {
                        id: data?.id,
                        tel: data?.tel,
                        remark: data?.remark,
                        geolocation: values
                    }
                }
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

    const onChangeFn = (e) => {
        form.setFieldsValue({
            lat: e.lat,
            long: e.long
        })
    }

    return (
        <Modal
            title="ទីតាំង"
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <div style={{ height: '400px', width: '100%', marginBottom: 40 }}
                className="go-map">
                <MapAddOrder data={centerLocation} setData={onChangeFn} />
                <div
                    key="pin"
                    style={{
                        position: 'absolute',
                        top: "39.2%",
                        left: "49.2%",
                    }}
                >
                    <Image
                        src={pin}
                        className="go-pin"
                        preview={false}
                    />
                    <div
                        className="go-shadowPin"
                    />
                </div>
            </div>
            <Form
                name="addLocation"
                form={form}
                layout="vertical"
                fields={convertEditData(data?.geolocation)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row
                    gutter={16}
                >
                    <Col
                        xs={12}
                    >
                        <Form.Item
                            label="Latitude"
                            name="lat"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <InputNumber
                                style={{
                                    width: "100%"
                                }}
                                onChange={e => setCenterLocation(ele => ({
                                    ...ele,
                                    lat: e
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={12}
                    >
                        <Form.Item
                            label="Longitude"
                            name="long"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <InputNumber
                                style={{
                                    width: "100%"
                                }}
                                onChange={e => setCenterLocation(ele => ({
                                    ...ele,
                                    long: e
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                    >
                        <Form.Item
                            label="ឈ្មោះទីតាំង"
                            name="placename"
                            // rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Input placeholder="Placename" />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                    >
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
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
