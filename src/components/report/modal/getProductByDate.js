import { useMutation } from '@apollo/client'
import { Button, DatePicker, Form, Modal } from 'antd'
import React, { useState } from 'react'
import { reportCombineResAndProduct } from '../../../functions/fn'
import { GET_REPORT_PRODUCT_BY_DATE } from '../../../graphql/report'
import { theme } from '../../../static/theme'
import PrintProductByDate from './printProductByDate'

export default function GetProductByDate({open, setOpen, productDB}) {
    let [form] = Form.useForm()

    const [getReportProductByDate] = useMutation(GET_REPORT_PRODUCT_BY_DATE)

    const [data, setData] = useState([])

    const [openPrint, setOpenPrint] = useState(false)

    const onFinish = async (values) => {
        getReportProductByDate({
            variables: {
                input: {
                    date: values.date
                }
            },
            update(_,result){
                const getResults = result?.data?.getReportProductByDate
                const getProducts = productDB?.getAllProducts

                setData(reportCombineResAndProduct(getResults, getProducts))
                setOpenPrint(!openPrint)
            }
        })
    }

    const onFinishFailed = (e) => {
        console.log(e)
    }

    // let dateHolder = ["ចាប់ពី", "រហូតដល់"]
    return (
        <Modal
            title="ទំនិញចេញចូលដោយកាលបរិច្ឆេទ"
            visible={open}
            onCancel={() => setOpen(!open)}
            footer={null}
        >
            <PrintProductByDate open={openPrint} setOpen={setOpenPrint} data={data} />
            <Form
                form={form}
                name="getProductByDate"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: "សូមបញ្ជូលទិន្នន័យអោយបានត្រឹមត្រូវ"
                        }
                    ]}
                >
                    <DatePicker 
                        placeholder="កាលបរិច្ឆេទ"
                        style={{
                            width: "100%"
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        htmlType='submit'
                        type='primary'
                        style={{
                            width: "100%"
                        }}
                        size={theme.btnSize}
                    >
                        បញ្ជូល
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
