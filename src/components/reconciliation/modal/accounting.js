import { useLazyQuery, useMutation } from '@apollo/client'
import { Col, Modal, Row, Form, Input, Button, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { mutationCallBackFn, noticeAction } from '../../../functions/fn'
import { CREATE_GENERATE_ACCOUNTING, GET_ALL_RECON } from '../../../graphql/reconciliation'
import { theme } from '../../../static/theme'

export default function Accounting({ open, setOpen }) {
    let [form] = Form.useForm()

    const [getInventory, { data: InventoryDB }] = useLazyQuery(GET_ALL_RECON, {
        onError: (err) => {
            console.log(err)
        },
    })

    const [generateAccounting] = useMutation(CREATE_GENERATE_ACCOUNTING,  mutationCallBackFn(GET_ALL_RECON, 'getInventory'))
    
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        getInventory({
            variables: {
                input: {
                    keyword: keyword
                }
            }
        })
    }, [getInventory, keyword])

    const onFinish = (values) => {
        generateAccounting({
            variables: {
                input: {
                    id: values.code
                }
            },
            update(_,result){
                noticeAction("success", result.data.generateAccounting)
            }
        })
    }

    const onFinishError = (err) => {
        console.log(err)
    }

    function onSearchFn(val) {
        setKeyword(val)
    }

    function onSelectFn(val) {
        var array = [...InventoryDB?.getInventory].find(ele => ele.id === val)

        form.setFieldsValue({
            remark: array.remark
        })
    }

    return (
        <Modal
            title="GENERATE ACCOUNTING"
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
                            label="កូដ"
                            name="code"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Inventory"
                                optionFilterProp="children"
                                onSearch={onSearchFn}
                                size={theme.selectSize}
                                onSelect={onSelectFn}
                            >
                                {
                                    InventoryDB?.getInventory?.map(load =>
                                        <Select.Option key={load.id} value={load.id}>{load.code}</Select.Option>
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
                                size={theme.btnSize}
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
