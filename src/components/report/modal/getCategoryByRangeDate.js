import { useMutation } from '@apollo/client'
import { Button, DatePicker, Form, Modal } from 'antd'
import React, { useState } from 'react'
import { GET_REPORT_CATEGORY_BY_DATE } from '../../../graphql/report'
import { theme } from '../../../static/theme'
import PrintCategoryByRangeDate from './printCategoryByRangeDate'

export default function GetCategoryByRangeDate({ open, setOpen, productDB }) {
    let [form] = Form.useForm()

    const [getReportCategoryByDate] = useMutation(GET_REPORT_CATEGORY_BY_DATE)


    const [data, setData] = useState([])
    const [date, setDate] = useState("")

    const [openPrint, setOpenPrint] = useState(false)

    const onFinish = async (values) => {
        getReportCategoryByDate({
            variables: {
                input: {
                    startDate: values.date[0],
                    endDate: values.date[1]
                }
            },
            update(_,result){
                const getResults = result?.data?.getReportCategoryByDate
                // const getProducts = productDB?.getAllProducts

                // console.log(getResults)

                setData(getResults)
                setOpenPrint(!openPrint) 
                setDate(values.date)
            }
        })
    }

    const onFinishFailed = (e) => {
        console.log(e)
    }

    const dateHolder = ["ចាប់ពី", "រហូតដល់"]

    return (
        <Modal
            title="ប្រភេទទំនិញចេញចូលដោយកាលបរិច្ឆេទ"
            visible={open}
            onCancel={() => setOpen(!open)}
            footer={null}
        >
            <PrintCategoryByRangeDate open={openPrint} setOpen={setOpenPrint} data={data} date={date} />
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
                    <DatePicker.RangePicker
                        placeholder={dateHolder}
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
