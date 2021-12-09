import { useLazyQuery } from '@apollo/client'
import { Modal, Form, Col, Row, Select, Divider, Checkbox, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { ProductsField } from '../../../asset/data/productsField'
import { GET_ALL_CATEGORY } from '../../../graphql/product'
import { theme } from '../../../static/theme'

const { Option } = Select

export default function SortFilterProduct({ open, setOpen, setSortData, setFilterData }) {
    let [form] = Form.useForm()

    const [getCategories, { data: CategoryDb }] = useLazyQuery(GET_ALL_CATEGORY, {
        onError: (err) => {
            console.log(err)
        },
    })

    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        getCategories({
            variables: {
                input: {
                    keyword: keyword
                }
            }
        })
    }, [getCategories, keyword])

    function onSearch(val) {
        setKeyword(val)
    }

    const onFinish = async (values) => {
        // console.log(values)

        setSortData({
            name: values.fieldname,
            value: values.sort === undefined || !values.sort ? "asc" : "desc"
        })

        setFilterData({
            name: "category",
            value: values.category
        })

        setOpen(!open)
    }

    const onFinishFailed = (e) => {
        console.log("Error Field: ", e)
    }

    return (
        <Modal
            title="Sort & Filter"
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row gutter={16}>
                    <Col
                        xs={24}
                    >
                        <Divider
                            orientation="left"
                            style={{
                                marginTop: 0   
                            }}
                        >
                            Filter
                        </Divider>
                    </Col>
                    <Col
                        xs={24}
                        md={24}
                    >
                        <Form.Item
                            // label="Filter By"
                            name="category"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Category"
                                optionFilterProp="children"
                                onSearch={onSearch}
                                size={theme.selectSize}
                            >
                                <Option key={"emply"} value={"emply"}>{"មិនកំណត់"}</Option>
                                {
                                    CategoryDb?.getCategories?.data.map(load =>
                                        <Option key={load.id} value={load.id}>{load.description}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col
                        xs={24}
                    >
                        <Divider orientation="left">Sort</Divider>
                    </Col>
                    <Col
                        xs={24}
                        md={12}
                    >
                        <Form.Item
                            name="fieldname"
                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                        >
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Field name"
                                optionFilterProp="children"
                                size={theme.selectSize}
                            >
                                {
                                    ProductsField.map(load =>
                                        <Option key={load.id} value={load.value}>{load.name}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col
                        xs={12}
                        style={{
                            textAlign: "center"
                        }}
                    >
                        <Form.Item
                            name="sort"
                            valuePropName="checked"
                        >
                            <Checkbox>
                                ពីធំទៅតូច
                            </Checkbox>
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
                                កំណត់
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
