import { useLazyQuery, useMutation } from '@apollo/client'
import { Modal, Input, Button, Form, Row, Col, Select, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'
import { msgTitle } from '../../../asset/data/msgTitle'
import { convertUpdateData, mutationCallBackFn, noticeAction } from '../../../functions/fn'
import { ADD_PRODUCT, GET_ALL_CATEGORY, GET_ALL_PRODUCT, UPDATE_PRODUCT } from '../../../graphql/product'
import { theme } from '../../../static/theme'
import UploadProfile from '../comp/uploadProfile'

const { Option } = Select;

export default function AddEditProduct({ open, setOpen, type, updateData }) {
    const [form] = Form.useForm()

    const [getCategories, { data: CategoryDb }] = useLazyQuery(GET_ALL_CATEGORY, {
        onError: (err) => {
            console.log(err)
        },
    })

    const [setProducts] = useMutation(ADD_PRODUCT, mutationCallBackFn(GET_ALL_PRODUCT, 'getProducts'))
    const [updateProducts] = useMutation(UPDATE_PRODUCT, mutationCallBackFn(GET_ALL_PRODUCT, 'getProducts'))

    const [data, setData] = useState({})
    const [imageUrl, setImageUrl] = useState("")
    const [pid, setPid] = useState("")

    const [keyword, setKeyword] = useState("")


    useEffect(() => {
        if (updateData !== {}) {
            setData({
                ...updateData,
                category: updateData?.category?.id
            })
            setPid(updateData?.id)
            setImageUrl(updateData?.image)
        }
    }, [updateData])

    useEffect(() => {
        getCategories({
            variables: {
                input: {
                    keyword: keyword
                }
            }
        })
    }, [getCategories, keyword])

    const onFinish = (values) => {
        if (type === "add") {
            setProducts({
                variables: {
                    input: {
                        ...values,
                        code: null
                    }
                },
                update(_, result) {
                    console.log(result)
                    noticeAction("success", msgTitle.CREATE)
                    // setOpen(false)
                    setPid(result?.data?.setProducts?.id)
                }
            })
        } else {
            updateProducts({
                variables: {
                    input: {
                        ...values,
                        id: data?.id,
                        image: imageUrl,
                        code: null
                    }
                },
                update(_, result) {
                    console.log(result)
                    noticeAction("success", msgTitle.UPDATE)
                    setOpen(false)
                }
            })
        }
    }

    const onFinishFailed = (err) => {
        console.log(err)
    }

    function onSearch(val) {
        setKeyword(val)
    }

    const onCloseFn = () => {
        form.resetFields()
        setPid("")
        setOpen(false)
    }

    return (
        <Modal
            title="ទំនិញ"
            visible={open}
            onCancel={() => onCloseFn()}
            footer={null}
        >
            <Form
                form={form}
                name="addUpdateProduct"
                layout="vertical"
                hideRequiredMark
                fields={convertUpdateData(type, data)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {type === "add" ? (
                    <Row gutter={16}>
                        {pid !== undefined && pid !== "" ? (
                            <Col
                                xs={24}
                                md={24}
                            >
                                <center>
                                    <UploadProfile type={type} imageUrl={imageUrl} setImageUrl={setImageUrl} pid={pid} setPid={setPid} onCloseFn={onCloseFn} />
                                </center>
                            </Col>
                        ) : (
                            <Col
                                xs={24}
                                md={24}
                            >
                                <Row gutter={6}>
                                    <Col
                                        xs={24}
                                        md={24}
                                    >
                                        <Form.Item
                                            label="បរិយាយ"
                                            name="description"
                                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        xs={24}
                                        md={12}
                                    >
                                        <Form.Item
                                            label="តម្លៃដើម"
                                            name="cost"
                                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!', type: "number" }]}
                                        >
                                            <InputNumber
                                                style={{
                                                    width: "100%"
                                                }}
                                                size={theme.inputSize}
                                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        xs={24}
                                        md={12}
                                    >
                                        <Form.Item
                                            label="តម្លៃលក់"
                                            name="price"
                                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!', type: "number" }]}
                                        >
                                            <InputNumber
                                                style={{
                                                    width: "100%"
                                                }}
                                                size={theme.inputSize}
                                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        xs={24}
                                        md={12}
                                    >
                                        <Form.Item
                                            label="ខ្នាត"
                                            name="um"
                                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        xs={24}
                                        md={12}
                                    >
                                        <Form.Item
                                            label="ប្រភេទ"
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
                                                {
                                                    CategoryDb?.getCategories?.data.map(load =>
                                                        <Option 
                                                            key={load.id} 
                                                            value={load.id}
                                                        >
                                                            {load.description}
                                                        </Option>
                                                    )
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    {/* <Col
                                        xs={24}
                                        md={24}
                                    >
                                        <Form.Item
                                            label="ក្នុងស្តុក"
                                            name="inStock"
                                            rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!', type: "number" }]}
                                        >
                                            <InputNumber
                                                style={{
                                                    width: "100%"
                                                }}
                                                size={theme.inputSize}
                                            />
                                        </Form.Item>
                                    </Col> */}
                                    <Col
                                        xs={24}
                                        md={24}
                                    >
                                        <Form.Item>
                                            <Button
                                                style={{
                                                    width: "100%"
                                                }}
                                                type="primary"
                                                htmlType="submit"
                                                size={theme.btnSize}
                                            >
                                                បញ្ចូលថ្មី
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        )}
                    </Row>
                ) : (
                    <Row gutter={16}>
                        <Col
                                xs={24}
                                md={24}
                            >
                                <center>
                                    <UploadProfile type={type} imageUrl={imageUrl} setImageUrl={setImageUrl} pid={pid} setPid={setPid} onCloseFn={onCloseFn} />
                                </center>
                            </Col>
                        <Col
                            xs={24}
                            md={24}
                        >
                            <Row gutter={6}>
                                <Col
                                    xs={24}
                                    md={24}
                                >
                                    <Form.Item
                                        label="បរិយាយ"
                                        name="description"
                                        rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col
                                    xs={24}
                                    md={12}
                                >
                                    <Form.Item
                                        label="តម្លៃដើម"
                                        name="cost"
                                        rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!', type: "number" }]}
                                    >
                                        <InputNumber
                                            style={{
                                                width: "100%"
                                            }}
                                            size={theme.inputSize}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col
                                    xs={24}
                                    md={12}
                                >
                                    <Form.Item
                                        label="តម្លៃលក់"
                                        name="price"
                                        rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!', type: "number" }]}
                                    >
                                        <InputNumber
                                            style={{
                                                width: "100%"
                                            }}
                                            size={theme.inputSize}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col
                                    xs={24}
                                    md={12}
                                >
                                    <Form.Item
                                        label="ខ្នាត"
                                        name="um"
                                        rules={[{ required: true, message: 'សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col
                                    xs={24}
                                    md={12}
                                >
                                    <Form.Item
                                        label="ប្រភេទ"
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
                                    md={24}
                                >
                                    <Form.Item>
                                        <Button
                                            style={{
                                                width: "100%"
                                            }}
                                            type="primary"
                                            htmlType="submit"
                                            size={theme.btnSize}
                                        >
                                            បញ្ចូលថ្មី
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}

            </Form>
        </Modal>
    )
}
