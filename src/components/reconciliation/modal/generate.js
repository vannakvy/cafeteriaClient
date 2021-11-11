import { useMutation } from '@apollo/client'
import { Col, Modal, Row, Form, Input, Button, DatePicker } from 'antd'
import React from 'react'
import { noticeAction } from '../../../functions/fn'
import { CREATE_GENERATE_INVENTORY } from '../../../graphql/reconciliation'

export default function Generate({ open, setOpen }) {
    let [form] = Form.useForm()

    const [generateInventory] = useMutation(CREATE_GENERATE_INVENTORY, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const onFinish = (values) => {
        generateInventory({
            variables: {
                input: values
            },
            update(_, result){
                // console.log(result)
                noticeAction("success", result.data.generateInventory)
            }
        })
    }

    const onFinishError = (err) => {
        console.log(err)
    }

    return (
        <Modal
            title="GENERATE INVENTORY"
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                name="generate"
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishError}
            >
                <Row gutter={16}>
                    <Col
                        xs={24}
                        md={24}
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
