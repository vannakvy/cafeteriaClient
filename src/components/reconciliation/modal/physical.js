import { useLazyQuery, useMutation } from '@apollo/client'
import { Col, Modal, Row, Form, Input, Button, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { noticeAction } from '../../../functions/fn'
import { CREATE_GENERATE_INVENTORY, GET_LIST_RECON } from '../../../graphql/reconciliation'

export default function Physical({ open, setOpen }) {
    let [form] = Form.useForm()

    const [phsicalInventory, { data: dataDb, loading }] = useLazyQuery(GET_LIST_RECON, {
        onError: (err) => {
            noticeAction("error", err?.graphQLErrors[0]?.message + '')
        },
    })

    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        phsicalInventory({
            variables: {
                input: {
                    limit: 10,
                    keyword: keyword
                }
            }
        })
    }, [keyword, phsicalInventory])

    const onFinish = (values) => {
        // generateInventory({
        //     variables: {
        //         input: values
        //     },
        //     update(_, result){
        //         // console.log(result)
        //         noticeAction("success", result.data.generateInventory)
        //     }
        // })
    }

    const onFinishError = (err) => {
        console.log(err)
    }

    function onSearch(val) {
        setKeyword(val)
    }

    return (
        <Modal
            title="PHYSICAL INVENTORY"
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                name="physical"
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
                            label="បញ្ជី"
                            name="_id"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="GENERATE INVENTORY"
                                optionFilterProp="children"
                                onSearch={onSearch}
                            >
                                {
                                    dataDb?.phsicalInventory?.map(load =>
                                        <Select.Option key={load.id} value={load.id}>{load.code}</Select.Option>
                                    )
                                }
                            </Select>
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
